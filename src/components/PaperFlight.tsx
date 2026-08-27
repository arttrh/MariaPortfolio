"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Papéis arremessados.
 *
 * A diferença para uma chuva é a origem do movimento: aqui nada cai por
 * conta própria. O scroll é o braço que joga — cada rolagem vira um impulso,
 * e as folhas saem voando para fora e para cima antes de a gravidade
 * trazê-las de volta.
 *
 * Nenhum parâmetro é compartilhado entre folhas. Tamanho, direção, força,
 * rotação e arrasto são sorteados um a um, para que não se enxergue padrão
 * nem cadência — o conjunto tem de parecer bagunça de papelada jogada.
 *
 * Performance: InstancedMesh com geometria e material únicos, DPR limitado a
 * 2, laço pausado fora da viewport, quadro único sob prefers-reduced-motion e
 * dispose completo no unmount.
 */

const SHEET_COUNT = 190;

type Sheet = {
  // posição
  px: number;
  py: number;
  pz: number;
  // velocidade linear
  vx: number;
  vy: number;
  vz: number;
  // rotação e velocidade angular
  rx: number;
  ry: number;
  rz: number;
  wx: number;
  wy: number;
  wz: number;
  // características próprias
  scale: number;
  drag: number;
  mass: number;
};

const BOUND_X = 15;
const BOUND_Y = 11;
const BOUND_Z = 9;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function spawn(sheet: Sheet, fresh: boolean) {
  /*
    Nasce espalhada por todo o volume visível, e não agrupada no centro.
    Renascer sempre no meio deixava a seção vazia nas bordas: o campo tem de
    estar cheio para o próximo arremesso ter o que jogar.
  */
  sheet.px = rand(-9, 9);
  sheet.py = fresh ? rand(-5.5, 5.5) : rand(-5.5, 5.5);
  sheet.pz = rand(-3.5, 3.5);

  sheet.vx = rand(-0.25, 0.25);
  sheet.vy = rand(-0.15, 0.15);
  sheet.vz = rand(-0.2, 0.2);

  sheet.rx = rand(0, Math.PI * 2);
  sheet.ry = rand(0, Math.PI * 2);
  sheet.rz = rand(0, Math.PI * 2);

  sheet.wx = rand(-0.7, 0.7);
  sheet.wy = rand(-0.7, 0.7);
  sheet.wz = rand(-0.7, 0.7);

  sheet.scale = rand(0.62, 1.5);
  sheet.drag = rand(0.55, 1.5);
  sheet.mass = rand(0.7, 1.45);
}

export default function PaperFlight({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(-4, 5, 6);
    scene.add(key);

    const back = new THREE.DirectionalLight(0xffffff, 1.2);
    back.position.set(3, -2, -5);
    scene.add(back);

    // Ambiente alto para que nenhuma face fique preta e a folha nunca suma.
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));

    const geometry = new THREE.PlaneGeometry(0.46, 0.64);
    const material = new THREE.MeshStandardMaterial({
      color: 0xf2f2f0,
      roughness: 0.9,
      metalness: 0,
      side: THREE.DoubleSide,
      transparent: true,
      // Piso alto: folha semitransparente sobre preto lê como cinza.
      opacity: 0.88,
      emissive: 0x8a8a88,
      emissiveIntensity: 0.5,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, SHEET_COUNT);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const sheets: Sheet[] = Array.from({ length: SHEET_COUNT }, () => {
      const s = {} as Sheet;
      spawn(s, true);
      return s;
    });

    const dummy = new THREE.Object3D();

    const writeMatrices = () => {
      for (let i = 0; i < SHEET_COUNT; i += 1) {
        const s = sheets[i];
        dummy.position.set(s.px, s.py, s.pz);
        dummy.rotation.set(s.rx, s.ry, s.rz);
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    };

    const resize = () => {
      const { clientWidth, clientHeight } = host;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let visible = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibility.observe(host);

    if (reduced) {
      writeMatrices();
      material.opacity = 0.6;
      renderer.render(scene, camera);

      return () => {
        resizeObserver.disconnect();
        visibility.disconnect();
        geometry.dispose();
        material.dispose();
        mesh.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    }

    /* ---- o arremesso ---- */

    let lastScrollY = window.scrollY;
    let pendingImpulse = 0;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      // Rolar para baixo joga com mais força — é o gesto principal.
      const strength = delta > 0 ? delta * 0.06 : Math.abs(delta) * 0.035;
      pendingImpulse = Math.min(pendingImpulse + strength, 9);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const throwSheets = (impulse: number) => {
      for (let i = 0; i < SHEET_COUNT; i += 1) {
        const s = sheets[i];

        // Direção sorteada por folha, sem eixo preferencial no plano.
        const angle = Math.random() * Math.PI * 2;
        const spread = rand(0.35, 1.0);
        const force = (impulse * rand(0.35, 1.35)) / s.mass;

        s.vx += Math.cos(angle) * spread * force;
        s.vz += Math.sin(angle) * spread * force * 0.6;
        // Viés para cima: papel jogado sobe antes de cair.
        s.vy += rand(0.25, 1.15) * force;

        s.wx += rand(-1, 1) * force * 0.9;
        s.wy += rand(-1, 1) * force * 0.9;
        s.wz += rand(-1, 1) * force * 0.9;
      }
    };

    let raf = 0;
    const clock = new THREE.Clock();
    const GRAVITY = 3.4;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const dt = Math.min(clock.getDelta(), 0.05);

      if (pendingImpulse > 0.001) {
        throwSheets(pendingImpulse * dt * 12);
        pendingImpulse *= 0.82;
      }

      for (let i = 0; i < SHEET_COUNT; i += 1) {
        const s = sheets[i];

        // Gravidade e arrasto — papel é leve, então freia rápido.
        s.vy -= GRAVITY * dt * (1 / s.mass) * 0.35;

        const damp = Math.max(0, 1 - s.drag * dt);
        s.vx *= damp;
        s.vy *= damp;
        s.vz *= damp;

        s.px += s.vx * dt;
        s.py += s.vy * dt;
        s.pz += s.vz * dt;

        s.rx += s.wx * dt;
        s.ry += s.wy * dt;
        s.rz += s.wz * dt;

        const angularDamp = Math.max(0, 1 - s.drag * 0.55 * dt);
        s.wx *= angularDamp;
        s.wy *= angularDamp;
        s.wz *= angularDamp;

        if (
          Math.abs(s.px) > BOUND_X ||
          s.py < -BOUND_Y ||
          s.py > BOUND_Y ||
          Math.abs(s.pz) > BOUND_Z
        ) {
          spawn(s, false);
        }
      }

      writeMatrices();
      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      visibility.disconnect();

      geometry.dispose();
      material.dispose();
      mesh.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={hostRef} aria-hidden className={className} />;
}

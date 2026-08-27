"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Chuva de folhas.
 *
 * As folhas que estavam empilhadas no palco de abertura se soltam conforme a
 * página desce. Cada uma cai com velocidade própria e tomba em dois eixos —
 * é o tombamento que dá leitura de papel, e não de confete.
 *
 * A densidade responde ao scroll: parada no topo, cheia quando a seção está
 * centralizada. Fica atrás do conteúdo e com opacidade contida, para nunca
 * disputar leitura com o texto.
 */

const SHEET_COUNT = 80;

type Drop = {
  x: number;
  y: number;
  z: number;
  speed: number;
  tumbleX: number;
  tumbleZ: number;
  phase: number;
  drift: number;
};

const SPAN_Y = 13;

export default function PaperRain({ className = "" }: { className?: string }) {
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

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(-4, 5, 6);
    scene.add(key);

    const back = new THREE.DirectionalLight(0xffffff, 1.2);
    back.position.set(3, -2, -5);
    scene.add(back);

    /*
      Ambiente forte de propósito. Com luz só direcional, a face virada para
      longe fica preta e a folha some no fundo — vira detrito, não papel.
      O emissivo do material garante um piso de luminosidade.
    */
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));

    // Plano fino, visível dos dois lados: a folha precisa aparecer quando
    // vira de costas no meio do tombo.
    const geometry = new THREE.PlaneGeometry(0.5, 0.7);
    const material = new THREE.MeshStandardMaterial({
      color: 0xf2f2f0,
      roughness: 0.9,
      metalness: 0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.62,
      emissive: 0x8a8a88,
      emissiveIntensity: 0.55,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, SHEET_COUNT);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const drops: Drop[] = Array.from({ length: SHEET_COUNT }, () => ({
      x: (Math.random() - 0.5) * 17,
      y: (Math.random() - 0.5) * SPAN_Y,
      z: (Math.random() - 0.5) * 3.4,
      speed: 0.55 + Math.random() * 0.9,
      tumbleX: (Math.random() - 0.5) * 1.5,
      tumbleZ: (Math.random() - 0.5) * 1.1,
      phase: Math.random() * Math.PI * 2,
      drift: 0.25 + Math.random() * 0.5,
    }));

    const dummy = new THREE.Object3D();

    const writeMatrices = (time: number) => {
      for (let i = 0; i < SHEET_COUNT; i += 1) {
        const d = drops[i];
        // Balanço lateral: a folha não cai reto, planeia.
        const sway = Math.sin(time * d.drift + d.phase) * 0.7;

        dummy.position.set(d.x + sway, d.y, d.z);
        dummy.rotation.set(
          time * d.tumbleX + d.phase,
          sway * 0.5,
          time * d.tumbleZ + d.phase
        );
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
      // Sem movimento: folhas paradas, espalhadas, como um quadro só.
      writeMatrices(0);
      material.opacity = 0.7;
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

    let raf = 0;
    let intensity = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      // A chuva ganha corpo conforme a seção cruza a viewport.
      const rect = host.getBoundingClientRect();
      const centre = rect.top + rect.height / 2;
      const progress = 1 - Math.min(Math.abs(centre - window.innerHeight / 2) / window.innerHeight, 1);
      intensity += (progress - intensity) * 0.05;

      for (let i = 0; i < SHEET_COUNT; i += 1) {
        const d = drops[i];
        d.y -= d.speed * dt * (0.35 + intensity);
        if (d.y < -SPAN_Y / 2) {
          d.y = SPAN_Y / 2;
          d.x = (Math.random() - 0.5) * 17;
        }
      }

      writeMatrices(time);
      // Piso alto de propósito: folha semitransparente sobre preto vira
      // cinza e perde a leitura de papel.
      material.opacity = 0.62 + intensity * 0.33;

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
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

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Resma de papel do palco de abertura.
 *
 * Uma pilha de folhas finas, cada uma com desalinho mínimo de posição e
 * rotação. O que faz a leitura de "papel" não é a face da folha, e sim a
 * borda estriada da pilha — por isso a luz principal entra rasante, quase de
 * lado, para marcar cada lâmina.
 *
 * Simboliza o volume de documentos que passa pela mão de uma contadora.
 *
 * Performance (o briefing exige LCP < 2s e Lighthouse ≥ 90):
 *   - uma geometria e um material compartilhados por todas as folhas;
 *   - three puro, sem react-three-fiber/drei;
 *   - carregado sob demanda pelo Hero, fora do caminho crítico;
 *   - DPR limitado a 2 e laço pausado quando sai da viewport;
 *   - ambiente procedural, sem baixar HDR;
 *   - quadro único quando o usuário pede movimento reduzido.
 */

const SHEET_COUNT = 46;
const SHEET_W = 3.0;
const SHEET_D = 2.2;
const SHEET_H = 0.013;

export default function PaperStack({ className = "" }: { className?: string }) {
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
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 1.05, 6.5);
    camera.lookAt(0, -0.02, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.35;

    // Luz rasante: é ela que revela as bordas das folhas.
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(-6, 1.4, 3.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 1.1);
    fill.position.set(5, 4, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.6);
    rim.position.set(2, 3, -6);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.18));

    const group = new THREE.Group();
    scene.add(group);

    // Papel é difuso: nada de metalness, rugosidade alta.
    const geometry = new THREE.BoxGeometry(SHEET_W, SHEET_H, SHEET_D);
    const material = new THREE.MeshStandardMaterial({
      color: 0xf6f6f4,
      roughness: 0.86,
      metalness: 0.0,
    });

    const sheets = new THREE.InstancedMesh(geometry, material, SHEET_COUNT);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < SHEET_COUNT; i += 1) {
      // Desalinho pequeno e aleatório — é o que impede a pilha de parecer
      // um bloco sólido.
      dummy.position.set(
        (Math.random() - 0.5) * 0.075,
        i * SHEET_H * 1.06 - (SHEET_COUNT * SHEET_H * 1.06) / 2,
        (Math.random() - 0.5) * 0.075
      );
      dummy.rotation.set(0, (Math.random() - 0.5) * 0.055, 0);
      dummy.updateMatrix();
      sheets.setMatrixAt(i, dummy.matrix);
    }
    sheets.instanceMatrix.needsUpdate = true;
    group.add(sheets);

    group.rotation.y = -0.34;

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

    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      // Giro muito lento: o suficiente para a luz correr pelas bordas.
      group.rotation.y = -0.34 + Math.sin(clock.getElapsedTime() * 0.16) * 0.3;
      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();

      geometry.dispose();
      material.dispose();
      sheets.dispose();
      envRT.texture.dispose();
      pmrem.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={hostRef} aria-hidden className={className} />;
}

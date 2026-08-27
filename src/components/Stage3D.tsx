"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Objeto escultural do palco de abertura.
 *
 * Lâminas finas empilhadas em hélice: leem-se como camadas, ordem e precisão
 * — sem recorrer aos clichês de contabilidade que o briefing proíbe
 * (calculadora, pilha de moedas, ícones de agência).
 *
 * Decisões de performance, porque o briefing exige LCP < 2s e Lighthouse ≥ 90:
 *   - three puro, sem react-three-fiber/drei (bundle bem menor);
 *   - carregado sob demanda pelo Hero, nunca no caminho crítico;
 *   - DPR limitado a 2;
 *   - laço de render pausado quando o canvas sai da viewport;
 *   - ambiente procedural (RoomEnvironment), sem baixar HDR.
 */

const PLATE_COUNT = 7;

function roundedPlate(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;

  shape.moveTo(-w + radius, -h);
  shape.lineTo(w - radius, -h);
  shape.quadraticCurveTo(w, -h, w, -h + radius);
  shape.lineTo(w, h - radius);
  shape.quadraticCurveTo(w, h, w - radius, h);
  shape.lineTo(-w + radius, h);
  shape.quadraticCurveTo(-w, h, -w, h - radius);
  shape.lineTo(-w, -h + radius);
  shape.quadraticCurveTo(-w, -h, -w + radius, -h);

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
    curveSegments: 12,
  });
}

export default function Stage3D({ className = "" }: { className?: string }) {
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

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.15, 7.6);
    camera.lookAt(0, 0, 0);

    // Ambiente procedural: reflexos de metal sem carregar nenhum arquivo.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    // O objeto tem faixa própria, sem texto por cima, então pode receber
    // reflexo cheio — é o que dá a leitura de metal escovado.
    scene.environmentIntensity = 0.85;

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 6, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 3.4);
    rim.position.set(-7, 3, -5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.12));

    const group = new THREE.Group();
    scene.add(group);

    const geometry = roundedPlate(3.1, 2.0, 0.28);
    const material = new THREE.MeshStandardMaterial({
      color: 0x9c9ca2,
      metalness: 0.92,
      roughness: 0.19,
    });

    for (let i = 0; i < PLATE_COUNT; i += 1) {
      const plate = new THREE.Mesh(geometry, material);
      const t = i / (PLATE_COUNT - 1) - 0.5; // -0.5 .. 0.5

      plate.position.y = t * 2.5;
      plate.rotation.z = t * 0.9;
      plate.scale.setScalar(1 - Math.abs(t) * 0.22);
      group.add(plate);
    }

    group.rotation.x = -0.22;
    group.rotation.y = -0.5;
    group.scale.setScalar(1.02);

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

    // Só desenha enquanto o palco está visível.
    let visible = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibility.observe(host);

    let raf = 0;
    let scrollTarget = 0;
    let scrollEased = 0;

    const onScroll = () => {
      scrollTarget = window.scrollY / Math.max(window.innerHeight, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      scrollEased += (scrollTarget - scrollEased) * 0.06;
      const elapsed = clock.getElapsedTime();

      group.rotation.y = -0.5 + elapsed * 0.12 + scrollEased * 1.1;
      group.position.y = -scrollEased * 0.85;

      renderer.render(scene, camera);
    };

    if (reduced) {
      // Sem movimento: um único quadro, já composto.
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      visibility.disconnect();

      geometry.dispose();
      material.dispose();
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

"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const v = (x: number, y: number) => new THREE.Vector2(x, y);

// Classic Indian doorstep milk bottle, as a lathe profile (radius, height).
const GLASS_PROFILE = [
  v(0, 0), v(0.78, 0), v(0.86, 0.04), v(0.885, 0.16), v(0.885, 1.62),
  v(0.86, 1.86), v(0.74, 2.12), v(0.56, 2.38), v(0.45, 2.56), v(0.43, 2.78),
  v(0.47, 2.82), v(0.48, 2.94), v(0.44, 2.98), v(0.4, 2.98),
];

const MILK_PROFILE = [
  v(0, 0.07), v(0.76, 0.07), v(0.835, 0.17), v(0.835, 1.62),
  v(0.81, 1.84), v(0.74, 1.98), v(0, 1.98),
];

function useLabelTexture(ink: string, accent: string, font: string) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    // Matches the band's circumference-to-height ratio so type is not stretched.
    c.width = 3600;
    c.height = 500;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#f4f2ea";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, c.width, 26);
    ctx.fillRect(0, c.height - 26, c.width, 26);
    ctx.fillStyle = ink;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Label wraps the bottle; the front sits at the canvas centre.
    ctx.font = `600 170px ${font}`;
    ctx.fillText("Cattle Co.", c.width / 2, 215);
    ctx.font = `500 60px ${font}`;
    ctx.letterSpacing = "14px";
    ctx.fillText("DESI COW A2 MILK", c.width / 2, 370);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [ink, accent, font]);
}

function Bottle({ reduced, accent, ink, font }: { reduced: boolean; accent: string; ink: string; font: string }) {
  const group = useRef<THREE.Group>(null);
  const label = useLabelTexture(ink, accent, font);
  const { pointer } = useThree();

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    if (!reduced) {
      const t = state.clock.elapsedTime;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.35 + pointer.x * 0.45 + Math.sin(t * 0.35) * 0.18, 3, dt);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.08, 3, dt);
      g.position.y = -1.45 + Math.sin(t * 0.9) * 0.04;
    }
  });

  return (
    <group ref={group} position={[0, -1.45, 0]} rotation={[0, -0.35, 0]}>
      <mesh castShadow renderOrder={2}>
        <latheGeometry args={[GLASS_PROFILE, 96]} />
        {/* Reflective clear glass. Cheaper than transmission and reads better on mobile GPUs. */}
        <meshPhysicalMaterial
          transparent
          opacity={0.22}
          depthWrite={false}
          roughness={0.03}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.04}
          color="#e8f1ec"
          envMapIntensity={1.4}
        />
      </mesh>
      <mesh>
        <latheGeometry args={[MILK_PROFILE, 96]} />
        <meshPhysicalMaterial color="#fbfaf4" emissive="#fffdf6" emissiveIntensity={0.12} roughness={0.45} sheen={0.6} sheenColor="#ffffff" clearcoat={0.15} />
      </mesh>
      {/* Paper label band. Rotated so its centre faces the camera. */}
      <mesh position={[0, 0.92, 0]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[0.892, 0.892, 0.78, 128, 1, true]} />
        <meshStandardMaterial map={label} roughness={0.8} />
      </mesh>
      {/* Foil cap */}
      <mesh position={[0, 2.9, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.16, 64]} />
        <meshStandardMaterial color={accent} metalness={0.55} roughness={0.32} />
      </mesh>
      <mesh position={[0, 2.985, 0]}>
        <cylinderGeometry args={[0.47, 0.5, 0.02, 64]} />
        <meshStandardMaterial color={accent} metalness={0.55} roughness={0.28} />
      </mesh>
    </group>
  );
}

function readToken(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return val || fallback;
}

export default function MilkBottle({ onReady }: { onReady?: () => void }) {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const accent = readToken("--accent", "#e39b2d");
  const ink = readToken("--label-ink", "#0f1e16");
  const font = typeof window !== "undefined" ? getComputedStyle(document.body).fontFamily : "sans-serif";
  const ready = useRef(false);

  useEffect(() => () => { ready.current = false; }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 7.7], fov: 30 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, preserveDrawingBuffer: false }}
      frameloop={reduced ? "demand" : "always"}
      onCreated={() => {
        if (!ready.current) {
          ready.current = true;
          onReady?.();
        }
      }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <Bottle reduced={reduced} accent={accent} ink={ink} font={font} />
      <ContactShadows position={[0, -1.46, 0]} opacity={0.35} scale={6} blur={2.6} far={2} color="#0f1e16" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[-4, 2, 3]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={2} position={[4, 1, 2]} scale={[2, 5, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#f6d9a8" position={[0, 4, -4]} scale={3} />
        <Lightformer form="rect" intensity={1} position={[0, -3, 2]} rotation-x={Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>
    </Canvas>
  );
}

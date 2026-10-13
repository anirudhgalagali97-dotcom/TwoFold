"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { ClayMesh } from "@/components/three/ClayMaterial";
import { cylinder, merged, roundedBox, sphere } from "@/components/three/geometry";
import { clay } from "@/lib/tokens";
import type { GroupProps } from "./types";

/** "OPEN" sign face, drawn once in Anton on a canvas. */
function useOpenTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 112;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = clay.inkBlue;
    ctx.fillRect(0, 0, c.width, c.height);
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-anton").trim() || "Impact";
    ctx.font = `76px ${family}, Impact, sans-serif`;
    ctx.fillStyle = clay.lemon;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("OPEN", c.width / 2, c.height / 2 + 4);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

/** Awning scallops alternating orange and cream, merged per colour (2 draw calls). */
function scallops(color: 0 | 1) {
  return merged(`scallops-${color}`, () => {
    const parts: THREE.BufferGeometry[] = [];
    const n = 7;
    const w = 2.5 / n;
    for (let i = color; i < n; i += 2) {
      const g = new THREE.CylinderGeometry(w / 2, w / 2, 0.5, 24, 1, false, 0, Math.PI);
      g.rotateZ(Math.PI / 2);
      g.rotateX(-Math.PI / 2);
      g.translate(-1.25 + w / 2 + i * w, 0, 0);
      parts.push(g);
    }
    return parts;
  });
}

const leaves = () =>
  merged("leaves", () => [
    new THREE.SphereGeometry(0.2, 20, 14).translate(-0.06, 0.06, 0),
    new THREE.SphereGeometry(0.17, 20, 14).translate(0.13, 0.17, 0.02),
    new THREE.SphereGeometry(0.14, 20, 14).translate(-0.02, 0.3, -0.03),
  ]);

const mullions = () =>
  merged("mullions", () => [
    new THREE.BoxGeometry(0.05, 0.56, 0.04).translate(-0.82, 0, 0),
    new THREE.BoxGeometry(0.56, 0.05, 0.04).translate(-0.82, 0, 0),
    new THREE.BoxGeometry(0.05, 0.56, 0.04).translate(0.82, 0, 0),
    new THREE.BoxGeometry(0.56, 0.05, 0.04).translate(0.82, 0, 0),
  ]);

/** The client's business: cream walls, striped awning, OPEN sign, door, windows, plant. */
export default function Storefront(props: GroupProps) {
  const openTex = useOpenTexture();
  return (
    <group {...props}>
      {/* walls */}
      <ClayMesh geometry={roundedBox(2.4, 1.6, 1.3, 0.16)} color="cream" position={[0, 0.8, 0]} />
      {/* roof slab */}
      <ClayMesh geometry={roundedBox(2.6, 0.18, 1.45, 0.08)} color="orange" position={[0, 1.65, 0]} />
      {/* awning: sloped band + scallops */}
      <group position={[0, 1.38, 0.78]} rotation={[0.5, 0, 0]}>
        <ClayMesh geometry={roundedBox(2.5, 0.08, 0.5, 0.035)} color="orange" />
        <group position={[0, -0.02, 0.25]}>
          <ClayMesh geometry={scallops(0)} color="orange" />
          <ClayMesh geometry={scallops(1)} color="cream" />
        </group>
      </group>
      {/* OPEN sign on two posts */}
      <ClayMesh geometry={roundedBox(0.06, 0.3, 0.06, 0.02)} color="inkBlue" position={[-0.3, 1.86, 0.2]} />
      <ClayMesh geometry={roundedBox(0.06, 0.3, 0.06, 0.02)} color="inkBlue" position={[0.3, 1.86, 0.2]} />
      <group position={[0, 2.12, 0.2]}>
        <ClayMesh geometry={roundedBox(1.0, 0.42, 0.14, 0.06)} color="inkBlue" />
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[0.86, 0.36]} />
          <meshStandardMaterial map={openTex} roughness={0.9} metalness={0} />
        </mesh>
      </group>
      {/* door + knob */}
      <ClayMesh geometry={roundedBox(0.52, 0.92, 0.12, 0.06)} color="inkBlue" position={[0, 0.48, 0.66]} />
      <ClayMesh geometry={sphere(0.045)} color="lemon" position={[0.16, 0.48, 0.74]} />
      {/* windows + cream mullions */}
      <ClayMesh geometry={roundedBox(0.56, 0.56, 0.08, 0.06)} color="inkBlue" position={[-0.82, 0.86, 0.65]} />
      <ClayMesh geometry={roundedBox(0.56, 0.56, 0.08, 0.06)} color="inkBlue" position={[0.82, 0.86, 0.65]} />
      <ClayMesh geometry={mullions()} color="cream" position={[0, 0.86, 0.7]} />
      {/* plant */}
      <group position={[-0.95, 0, 0.92]}>
        <ClayMesh geometry={cylinder(0.16, 0.12, 0.26)} color="pink" position={[0, 0.13, 0]} />
        <ClayMesh geometry={leaves()} color="leaf" position={[0, 0.42, 0]} />
      </group>
    </group>
  );
}

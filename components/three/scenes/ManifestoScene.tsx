"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import Float from "@/components/three/Float";
import Lights from "@/components/three/Lights";
import BarChart from "@/components/three/objects/BarChart";
import Calendar from "@/components/three/objects/Calendar";
import ChatBubble from "@/components/three/objects/ChatBubble";
import MapPin from "@/components/three/objects/MapPin";
import Megaphone from "@/components/three/objects/Megaphone";
import Star from "@/components/three/objects/Star";
import SceneCamera, { useViewSize } from "@/components/three/SceneCamera";

// Apparent positions as fractions of the visible width/height (corrected for
// depth), in the corners and side edges, clear of the centred statement.
const ITEMS = [
  { x: -0.43, y: 0.36, z: -1.5, s: 0.7, el: <Megaphone rotation={[0, 0.6, 0.2]} /> },
  { x: 0.42, y: 0.37, z: -0.5, s: 0.6, el: <Star rotation={[0.2, -0.5, 0.1]} /> },
  { x: -0.45, y: -0.06, z: 0.6, s: 0.55, el: <MapPin rotation={[0, 0.5, 0]} /> },
  { x: 0.45, y: -0.08, z: 0.4, s: 0.6, el: <ChatBubble rotation={[0, -0.5, 0]} /> },
  { x: -0.3, y: -0.38, z: -2, s: 0.6, el: <Calendar rotation={[0.2, 0.5, -0.1]} /> },
  { x: 0.3, y: -0.38, z: -2.2, s: 0.6, el: <BarChart rotation={[0, -0.6, 0]} /> },
];

const CAMERA_Z = 10;
/** Scale so an object at depth z appears at the same screen fraction as at z = 0. */
const depth = (z: number) => (CAMERA_Z - z) / CAMERA_Z;

/** Tools drifting around the statement at different depths. */
export default function ManifestoScene() {
  const viewport = useViewSize(36, CAMERA_Z);
  const drift = useRef<THREE.Group>(null);
  const section = useRef<HTMLElement | null>(null);

  useEffect(() => {
    section.current = document.getElementById("manifesto");
  }, []);

  useFrame(() => {
    const rect = section.current?.getBoundingClientRect();
    if (!rect || !drift.current) return;
    // Slow parallax: -1 when entering from below, +1 when leaving at the top.
    const p = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
    drift.current.position.y += ((p - 0.5) * 1.2 - drift.current.position.y) * 0.08;
  });

  return (
    <>
      <SceneCamera position={[0, 0, CAMERA_Z]} fov={36} />
      <Lights intensity={0.95} />
      <group ref={drift}>
        {ITEMS.map((it, i) => (
          <Float key={i} position={[it.x * viewport.width * depth(it.z), it.y * viewport.height * depth(it.z), it.z]} scale={it.s} amp={0.15} speed={0.5 + i * 0.07} phase={i * 1.3} sway={0.25}>
            {it.el}
          </Float>
        ))}
      </group>
    </>
  );
}

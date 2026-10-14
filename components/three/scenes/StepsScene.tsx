"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import Float from "@/components/three/Float";
import Lights from "@/components/three/Lights";
import BarChart from "@/components/three/objects/BarChart";
import Bolt from "@/components/three/objects/Bolt";
import Key from "@/components/three/objects/Key";
import Phone from "@/components/three/objects/Phone";
import SceneCamera from "@/components/three/SceneCamera";

export type StepKind = "discovery" | "onboarding" | "setup" | "grow";

const OBJECTS: Record<StepKind, React.ReactNode> = {
  discovery: <Phone rotation={[0, 0.4, 0.12]} />,
  onboarding: <Key rotation={[0.3, 0.4, 0.5]} />,
  setup: <Bolt rotation={[0, -0.35, 0]} />,
  grow: <BarChart rotation={[0, 0.5, 0]} />,
};

/**
 * One object per step. It grows in once its step has scrolled into view and,
 * while section 05 is pinned (desktop), moves closer as the steps slide by.
 */
export default function StepsScene({ kind, el }: { kind: StepKind; el: HTMLElement | null }) {
  const appear = useRef<THREE.Group>(null);
  const section = useRef<HTMLElement | null>(null);

  useFrame(({ camera }) => {
    const g = appear.current;
    if (!g || !el) return;
    const r = el.getBoundingClientRect();
    const inView = r.left < window.innerWidth * 0.92 && r.right > 0 && r.top < window.innerHeight * 0.88;
    const target = inView ? 1 : 0.001;
    const s = g.scale.x + (target - g.scale.x) * 0.08;
    g.scale.setScalar(s);
    g.rotation.y = (1 - s) * -1.2;

    section.current ??= document.getElementById("how-we-work");
    const progress = Number(section.current?.style.getPropertyValue("--steps-progress") || 0);
    const z = 4.2 - progress * 0.9;
    camera.position.z += (z - camera.position.z) * 0.1;
  });

  return (
    <>
      <SceneCamera position={[0, 0, 4.2]} fov={28} />
      <Lights />
      <group ref={appear} scale={0.001}>
        <Float amp={0.07} speed={0.9} sway={0.2}>
          {OBJECTS[kind]}
        </Float>
      </group>
    </>
  );
}

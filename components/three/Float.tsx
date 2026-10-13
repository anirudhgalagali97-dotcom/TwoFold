"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import type { GroupProps } from "@/components/three/objects/types";
import { stillMode } from "@/components/three/pointer";

type FloatProps = GroupProps & {
  children: ReactNode;
  /** Bob height in world units. */
  amp?: number;
  speed?: number;
  phase?: number;
  /** Gentle sway in radians. */
  sway?: number;
  /** Continuous spin around Y in radians per second. */
  spin?: number;
};

/** Calm idle float: slow bob and sway, eased sine (never bouncy). */
export default function Float({ children, amp = 0.08, speed = 1, phase = 0, sway = 0.12, spin = 0, ...props }: FloatProps) {
  const inner = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    const g = inner.current;
    if (!g || stillMode) return;
    const t = clock.elapsedTime * speed + phase;
    g.position.y = Math.sin(t) * amp;
    g.rotation.z = Math.sin(t * 0.8) * sway * 0.5;
    if (spin) g.rotation.y += spin * delta;
    else g.rotation.y = Math.sin(t * 0.6) * sway;
  });
  return (
    <group {...props}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

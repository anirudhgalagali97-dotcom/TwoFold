"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";
import { BOOKED_EVENT } from "@/components/chat/chatScript";
import Float from "@/components/three/Float";
import Lights from "@/components/three/Lights";
import Calendar from "@/components/three/objects/Calendar";
import Star from "@/components/three/objects/Star";
import SceneCamera, { useViewSize } from "@/components/three/SceneCamera";

/** A calendar and a star beside the phone; both pop when the booking chip appears. */
export default function EdgeScene() {
  const viewport = useViewSize(34, 10);
  const pop = useRef<(THREE.Group | null)[]>([]);
  const popAt = useRef(-10);
  const clock = useThree((s) => s.clock);

  useEffect(() => {
    const onBooked = () => (popAt.current = clock.elapsedTime);
    window.addEventListener(BOOKED_EVENT, onBooked);
    return () => window.removeEventListener(BOOKED_EVENT, onBooked);
  }, [clock]);

  useFrame(({ clock: c }) => {
    const t = (c.elapsedTime - popAt.current) / 0.7;
    const s = t >= 0 && t < 1 ? 1 + 0.28 * Math.sin(Math.PI * t) * (1 - t * 0.3) : 1;
    pop.current.forEach((g, i) => {
      if (!g) return;
      const target = i === 0 ? s : 1 + (s - 1) * 0.8;
      g.scale.setScalar(g.scale.x + (target - g.scale.x) * 0.35);
    });
  });

  return (
    <>
      <SceneCamera position={[0, 0, 10]} fov={34} />
      <Lights />
      <Float position={[-0.41 * viewport.width, 0.3 * viewport.height, 0]} scale={0.7} amp={0.12} speed={0.8} sway={0.22}>
        <group ref={(el) => void (pop.current[0] = el)}>
          <Calendar rotation={[0.1, 0.45, -0.08]} />
        </group>
      </Float>
      <Float position={[0.41 * viewport.width, -0.3 * viewport.height, 0]} scale={0.65} amp={0.12} speed={0.8} phase={2} sway={0.22}>
        <group ref={(el) => void (pop.current[1] = el)}>
          <Star rotation={[0.1, -0.4, 0.12]} />
        </group>
      </Float>
    </>
  );
}

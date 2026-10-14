"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import Lights from "@/components/three/Lights";
import BrowserWindow from "@/components/three/objects/BrowserWindow";
import Calendar from "@/components/three/objects/Calendar";
import ChatBubble from "@/components/three/objects/ChatBubble";
import MapPin from "@/components/three/objects/MapPin";
import Megaphone from "@/components/three/objects/Megaphone";
import Star from "@/components/three/objects/Star";
import { stillMode } from "@/components/three/pointer";
import SceneCamera from "@/components/three/SceneCamera";

export type ServiceKind = "online" | "customers" | "assistant";

const PAIRS: Record<ServiceKind, [React.ReactNode, React.ReactNode]> = {
  online: [<BrowserWindow key="a" rotation={[0, 0.35, 0]} />, <MapPin key="b" color="orange" rotation={[0, -0.4, 0]} />],
  customers: [<Megaphone key="a" rotation={[0, 0.55, 0.2]} />, <Star key="b" rotation={[0, -0.35, 0]} />],
  assistant: [<ChatBubble key="a" rotation={[0, 0.35, 0]} />, <Calendar key="b" rotation={[0, -0.4, 0]} />],
};

/** Two objects per service card, rotating slowly; faster while the card is hovered or open. */
export default function ServiceObject({ kind, active }: { kind: ServiceKind; active?: boolean }) {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const speed = useRef(0.45);

  useFrame(({ clock }, delta) => {
    if (stillMode) return;
    speed.current += ((active ? 1.8 : 0.45) - speed.current) * 0.06;
    if (a.current) {
      a.current.rotation.y += speed.current * delta;
      a.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.06;
    }
    if (b.current) {
      b.current.rotation.y -= speed.current * 1.2 * delta;
      b.current.position.y = 0.15 + Math.sin(clock.elapsedTime * 0.9 + 1.5) * 0.08;
    }
  });

  const [first, second] = PAIRS[kind];
  return (
    <>
      <SceneCamera position={[0, 0.2, 4.3]} target={[0, 0.05, 0]} fov={30} />
      <Lights />
      <group position={[-0.55, 0, 0]}>
        <group ref={a}>{first}</group>
      </group>
      <group position={[0.95, 0, 0.6]} scale={0.7}>
        <group ref={b}>{second}</group>
      </group>
    </>
  );
}

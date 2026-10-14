"use client";

import Float from "@/components/three/Float";
import Lights from "@/components/three/Lights";
import ChatBubble from "@/components/three/objects/ChatBubble";
import Star from "@/components/three/objects/Star";
import SceneCamera from "@/components/three/SceneCamera";

/** The demo-bot card: a chat bubble and a star. */
export default function WorkScene() {
  return (
    <>
      <SceneCamera position={[0, 0, 6]} fov={30} />
      <Lights />
      <Float position={[-0.45, 0.05, 0]} amp={0.1} speed={0.8} sway={0.2}>
        <ChatBubble rotation={[0, 0.3, 0]} />
      </Float>
      <Float position={[0.95, -0.35, 0.6]} scale={0.6} amp={0.12} speed={0.8} phase={1.8} sway={0.25}>
        <Star rotation={[0, -0.3, 0.1]} />
      </Float>
    </>
  );
}

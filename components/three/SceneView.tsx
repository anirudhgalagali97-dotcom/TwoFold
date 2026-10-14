"use client";

import { View } from "@react-three/drei";
import type { SceneName } from "@/components/three/SceneSlot";
import ContactScene from "@/components/three/scenes/ContactScene";
import EdgeScene from "@/components/three/scenes/EdgeScene";
import HeroScene from "@/components/three/scenes/HeroScene";
import ManifestoScene from "@/components/three/scenes/ManifestoScene";
import ServiceObject from "@/components/three/scenes/ServiceObject";
import StepsScene from "@/components/three/scenes/StepsScene";
import WorkScene from "@/components/three/scenes/WorkScene";

type Props = { scene: SceneName; active?: boolean; el: HTMLElement | null };

function SceneContent({ scene, active, el }: Props) {
  switch (scene) {
    case "hero":
      return <HeroScene />;
    case "manifesto":
      return <ManifestoScene />;
    case "service-online":
      return <ServiceObject kind="online" active={active} />;
    case "service-customers":
      return <ServiceObject kind="customers" active={active} />;
    case "service-assistant":
      return <ServiceObject kind="assistant" active={active} />;
    case "edge":
      return <EdgeScene />;
    case "step-discovery":
      return <StepsScene kind="discovery" el={el} />;
    case "step-onboarding":
      return <StepsScene kind="onboarding" el={el} />;
    case "step-setup":
      return <StepsScene kind="setup" el={el} />;
    case "step-grow":
      return <StepsScene kind="grow" el={el} />;
    case "work-demo":
      return <WorkScene />;
    case "contact":
      return <ContactScene />;
  }
}

/** A drei View: a tracked DOM box whose 3D content renders in the shared canvas. */
export default function SceneView(props: Props) {
  return (
    <View className="absolute inset-0">
      <SceneContent {...props} />
    </View>
  );
}

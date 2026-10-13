export type SceneName =
  | "hero"
  | "manifesto"
  | "service-online"
  | "service-customers"
  | "service-assistant"
  | "edge"
  | "step-discovery"
  | "step-onboarding"
  | "step-setup"
  | "step-grow"
  | "work-demo"
  | "contact";

type SceneSlotProps = {
  scene: SceneName;
  className?: string;
  /** Hover / emphasis state passed to the scene (e.g. faster spin). */
  active?: boolean;
};

/** Where a 3D scene renders. Decorative: every meaning is also in text. */
export default function SceneSlot({ scene, className = "" }: SceneSlotProps) {
  return (
    <div
      aria-hidden="true"
      data-scene={scene}
      className={`rounded-3xl bg-current/10 ${className}`}
    />
  );
}

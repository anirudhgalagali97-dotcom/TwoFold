import { ClayMesh } from "@/components/three/ClayMaterial";
import { roundedBox } from "@/components/three/geometry";
import type { GroupProps } from "./types";

/** Discovery call: ink-blue phone with an orange screen and message lines. */
export default function Phone(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={roundedBox(0.8, 1.5, 0.16, 0.12)} color="inkBlue" />
      <ClayMesh geometry={roundedBox(0.64, 1.18, 0.06, 0.08)} color="orange" position={[0, 0.02, 0.07]} />
      <ClayMesh geometry={roundedBox(0.4, 0.12, 0.05, 0.05)} color="cream" position={[-0.06, 0.32, 0.11]} />
      <ClayMesh geometry={roundedBox(0.34, 0.12, 0.05, 0.05)} color="cream" position={[0.08, 0.1, 0.11]} />
      <ClayMesh geometry={roundedBox(0.44, 0.12, 0.05, 0.05)} color="cream" position={[-0.04, -0.12, 0.11]} />
    </group>
  );
}

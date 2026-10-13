import { ClayMesh } from "@/components/three/ClayMaterial";
import { cylinder, roundedBox } from "@/components/three/geometry";
import type { GroupProps } from "./types";

/** Website: cream page with an ink-blue top bar. */
export default function BrowserWindow(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={roundedBox(1.6, 1.1, 0.16, 0.08)} color="cream" />
      <ClayMesh geometry={roundedBox(1.6, 0.24, 0.2, 0.08)} color="inkBlue" position={[0, 0.43, 0.01]} />
      {(["orange", "lemon", "cream"] as const).map((c, i) => (
        <ClayMesh key={c} geometry={cylinder(0.04, 0.04, 0.05)} color={c} position={[-0.66 + i * 0.13, 0.43, 0.12]} rotation={[Math.PI / 2, 0, 0]} />
      ))}
      <ClayMesh geometry={roundedBox(0.6, 0.42, 0.06, 0.04)} color="orange" position={[-0.38, -0.06, 0.09]} />
      <ClayMesh geometry={roundedBox(0.56, 0.08, 0.06, 0.03)} color="inkBlue" position={[0.4, 0.06, 0.09]} />
      <ClayMesh geometry={roundedBox(0.56, 0.08, 0.06, 0.03)} color="inkBlue" position={[0.4, -0.1, 0.09]} />
      <ClayMesh geometry={roundedBox(0.4, 0.08, 0.06, 0.03)} color="inkBlue" position={[0.32, -0.26, 0.09]} />
    </group>
  );
}

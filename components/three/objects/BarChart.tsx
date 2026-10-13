import { ClayMesh } from "@/components/three/ClayMaterial";
import { extrudeSvg, roundedBox } from "@/components/three/geometry";
import type { GroupProps } from "./types";

const ARROW = "M4 80 L36 48 L54 64 L76 42 L64 30 H98 V64 L86 52 L54 84 L36 68 L16 92 Z";

/** Growth and reports: rising cream/orange bars with a lemon arrow. */
export default function BarChart(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={roundedBox(0.3, 0.5, 0.3, 0.08)} color="cream" position={[-0.42, -0.3, 0]} />
      <ClayMesh geometry={roundedBox(0.3, 0.8, 0.3, 0.08)} color="orange" position={[0, -0.15, 0]} />
      <ClayMesh geometry={roundedBox(0.3, 1.1, 0.3, 0.08)} color="cream" position={[0.42, 0, 0]} />
      <ClayMesh geometry={extrudeSvg("arrow", ARROW, { size: 1.15, depth: 14, bevel: 5 })} color="lemon" position={[0, 0.5, 0.25]} />
    </group>
  );
}

import { ClayMesh } from "@/components/three/ClayMaterial";
import { cylinder, extrudeSvg, roundedBox } from "@/components/three/geometry";
import type { GroupProps } from "./types";

const TICK = "M8 52 L24 36 L40 52 L76 16 L92 32 L40 84 Z";

/** Bookings: cream page, orange header, ink-blue rings and tick. */
export default function Calendar(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={roundedBox(1.2, 1.12, 0.2, 0.08)} color="cream" />
      <ClayMesh geometry={roundedBox(1.2, 0.3, 0.24, 0.08)} color="orange" position={[0, 0.42, 0.01]} />
      {[-0.32, 0.32].map((x) => (
        <ClayMesh key={x} geometry={cylinder(0.06, 0.06, 0.3)} color="inkBlue" position={[x, 0.6, 0.02]} />
      ))}
      <ClayMesh geometry={extrudeSvg("tick", TICK, { size: 0.6, depth: 14, bevel: 5 })} color="inkBlue" position={[0, -0.12, 0.14]} />
    </group>
  );
}

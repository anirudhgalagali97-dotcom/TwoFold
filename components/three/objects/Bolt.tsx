import { ClayMesh } from "@/components/three/ClayMaterial";
import { extrudeSvg } from "@/components/three/geometry";
import type { GroupProps } from "./types";

const BOLT = "M60 0 L14 58 H44 L34 100 L86 38 H56 L68 0 Z";

/** Fast setup: orange lightning bolt. */
export default function Bolt(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={extrudeSvg("bolt", BOLT, { size: 1.3, depth: 20 })} color="orange" />
    </group>
  );
}

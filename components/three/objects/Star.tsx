import { ClayMesh } from "@/components/three/ClayMaterial";
import { extrudeSvg, roundedStarPath } from "@/components/three/geometry";
import type { GroupProps } from "./types";

/** Reviews: lemon star with rounded points. */
export default function Star(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={extrudeSvg("star", roundedStarPath(), { size: 1.1, depth: 20 })} color="lemon" />
    </group>
  );
}

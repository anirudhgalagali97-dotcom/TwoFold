import { ClayMesh } from "@/components/three/ClayMaterial";
import { extrudeSvg } from "@/components/three/geometry";
import type { GroupProps } from "./types";

// One wing in the SVG box: nose at the right, hinge along y = 50. Not centred,
// so each copy can be folded around the hinge line.
const WING = "M0 0 L100 50 L12 50 Z";

/** Contact / send: cream paper plane, nose pointing +X, made of folded extruded faces. */
export default function PaperPlane(props: GroupProps) {
  const wing = extrudeSvg("plane-wing", WING, { size: 1.2, depth: 3, bevel: 2, center: false });
  const fold = Math.PI / 2 - 0.28;
  return (
    <group {...props}>
      <group position={[-0.6, 0, 0]}>
        {/* the wing geometry spans y -0.6..0 after the flip; +0.6 puts the hinge on the X axis */}
        <group rotation={[-fold, 0, 0]}>
          <ClayMesh geometry={wing} color="cream" position={[0, 0.6, 0]} />
        </group>
        <group rotation={[fold, 0, 0]}>
          <ClayMesh geometry={wing} color="cream" position={[0, 0.6, 0]} />
        </group>
        <group rotation={[Math.PI, 0, 0]} scale={[1, 0.45, 1]}>
          <ClayMesh geometry={wing} color="cream" position={[0, 0.6, 0]} />
        </group>
      </group>
    </group>
  );
}

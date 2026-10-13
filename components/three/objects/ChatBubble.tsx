import { ClayMesh } from "@/components/three/ClayMaterial";
import { extrudeSvg, sphere } from "@/components/three/geometry";
import type { GroupProps } from "./types";

const BUBBLE =
  "M22 4 H78 A22 22 0 0 1 100 26 V52 A22 22 0 0 1 78 74 H40 L16 96 L21 73 A22 22 0 0 1 0 52 V26 A22 22 0 0 1 22 4 Z";
const SPARKLE = "M50 0 Q56 44 100 50 Q56 56 50 100 Q44 56 0 50 Q44 44 50 0 Z";

/** AI replies: cream bubble, three orange dots, lemon sparkle. */
export default function ChatBubble(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={extrudeSvg("bubble", BUBBLE, { size: 1.3 })} color="cream" />
      {[-0.32, 0, 0.32].map((x) => (
        <ClayMesh key={x} geometry={sphere(0.1)} color="orange" position={[x, 0.12, 0.2]} scale={[1, 1, 0.6]} />
      ))}
      <ClayMesh geometry={extrudeSvg("sparkle", SPARKLE, { size: 0.5, depth: 14, bevel: 4 })} color="lemon" position={[0.68, 0.62, 0.05]} />
    </group>
  );
}

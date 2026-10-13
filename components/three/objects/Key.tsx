import { ClayMesh } from "@/components/three/ClayMaterial";
import { extrudeSvg } from "@/components/three/geometry";
import type { GroupProps } from "./types";

const HEAD = "M2 50 A24 24 0 0 1 50 50 A24 24 0 0 1 2 50 Z M16 50 A10 10 0 0 0 36 50 A10 10 0 0 0 16 50 Z";
const SHAFT = "M46 43 H98 V57 H93 V71 H84 V57 H79 V71 H70 V57 H46 Z";

/** Onboarding (logins, access): lemon key. */
export default function Key(props: GroupProps) {
  return (
    <group {...props}>
      <ClayMesh geometry={extrudeSvg("key", [HEAD, SHAFT], { size: 1.3, depth: 16, bevel: 5 })} color="lemon" />
    </group>
  );
}

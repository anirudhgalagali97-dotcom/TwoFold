"use client";

import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import type * as THREE from "three";

type Props = { position: [number, number, number]; target?: [number, number, number]; fov?: number };

/** Default camera for one View, aimed at a target point. */
export default function SceneCamera({ position, target = [0, 0, 0], fov = 32 }: Props) {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  useLayoutEffect(() => {
    cam.current?.lookAt(...target);
  }, [target]);
  return <PerspectiveCamera ref={cam} makeDefault position={position} fov={fov} near={0.1} far={60} />;
}

/**
 * Visible width/height (world units) at `distance` from a camera with this
 * vertical `fov`, for the current View's box. drei's `viewport` can be
 * computed against the default camera, so scenes use this instead.
 */
export function useViewSize(fov: number, distance: number) {
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const height = 2 * Math.tan((fov * Math.PI) / 360) * distance;
  return { width: height * aspect, height };
}

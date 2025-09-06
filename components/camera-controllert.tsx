"use client";
import { useTheme } from "@/context/theme-context";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface CameraControllerProps {
  targets: Record<string, React.RefObject<THREE.Group>>;
  smooth?: number;
}

const CameraController = ({ targets, smooth = 0.05 }: CameraControllerProps) => {
  const { theme } = useTheme();
  const cameraTarget = useRef(new THREE.Vector3());
  const cameraPos = useRef(new THREE.Vector3());

  const cameraOffsets: Record<string, { distance: number; height: number }> = {
    sun: { distance: 20, height: 10 },
    mercury: { distance: 2, height: 0.7 },
    venus: { distance: 8, height: 3 },
    earth: { distance: 10, height: 3 },
    mars: { distance: 6, height: 2 },
    jupiter: { distance: 30, height: 6 },
    saturn: { distance: 30, height: 7 },
    uranus: { distance: 17, height: 6 },
    neptune: { distance: 10, height: 4 },
  };

  useFrame(({ camera }) => {
    if (theme === "nebula") {
      // Get positions of all planets
      const planetPositions = Object.values(targets)
        .map((ref) => ref.current)
        .filter(Boolean)
        .map((p) => {
          const pos = new THREE.Vector3();
          p!.getWorldPosition(pos);
          return pos;
        });

      if (planetPositions.length === 0) return;

      // Compute center of all planets
      const center = new THREE.Vector3();
      planetPositions.forEach((pos) => center.add(pos));
      center.divideScalar(planetPositions.length);

      // Compute max distance from center to set camera distance
      let maxDist = 10;
      planetPositions.forEach((pos) => {
        const dist = pos.distanceTo(center);
        if (dist > maxDist) maxDist = dist;
      });

      const nebulaDistance = maxDist * 2; // some padding
      const desiredPos = center.clone().add(new THREE.Vector3(0, nebulaDistance / 2, nebulaDistance));

      cameraTarget.current.lerp(center, smooth);
      cameraPos.current.lerp(desiredPos, smooth);

      camera.position.copy(cameraPos.current);
      camera.lookAt(cameraTarget.current);
      return;
    }

    // Default: follow a single planet
    const planetRef = targets[theme];
    if (!planetRef?.current) return;

    const planetPos = new THREE.Vector3();
    planetRef.current.getWorldPosition(planetPos);

    const { distance, height } = cameraOffsets[theme] || { distance: 10, height: 5 };
    const offset = new THREE.Vector3(0, height, distance);

    cameraTarget.current.lerp(planetPos, smooth);
    const desiredPos = planetPos.clone().add(offset);
    cameraPos.current.lerp(desiredPos, smooth);

    camera.position.copy(cameraPos.current);
    camera.lookAt(cameraTarget.current);
  });

  return null;
};

export default CameraController;

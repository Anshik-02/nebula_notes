// "use client";
// import { useFrame, useThree } from "@react-three/fiber";
// import { useEffect, useRef } from "react";
// import { useTheme } from "@/context/ThemeProvider"; 
// import * as THREE from "three";

// const CameraController = ({
//   targets,
// }: {
//   targets: Record<string, React.RefObject<THREE.Group>>;
// }) => {
//   const { theme } = useTheme();
//   const { camera } = useThree();

//   // target position for camera
//   const targetPos = useRef(new THREE.Vector3(0, 0, 20));

//   useEffect(() => {
//     // When theme changes, find the planet position
//     const ref = targets[theme];
//     if (ref?.current) {
//       const planetPos = new THREE.Vector3();
//       ref.current.getWorldPosition(planetPos);

//       // Move camera back a bit so planet is visible
//       targetPos.current.copy(planetPos).add(new THREE.Vector3(0, 5, 15));
//     }
//   }, [theme, targets]);

//   useFrame(() => {
//     // Smooth transition with lerp
//     camera.position.lerp(targetPos.current, 0.05);
//     camera.lookAt(0, 0, 0); // focus toward center (sun) or change to planet
//   });

//   return null;
// };

// export default CameraController;

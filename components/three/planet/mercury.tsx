"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/theme-context";
import { Group } from "three";

const PlanetSceneObjects = ({ refs }: { refs: Record<string, React.RefObject<Group>> }) => {
  const { theme } = useTheme();
  const { sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune } = refs;

  const { scene: mercuryScene } = useGLTF("/textures/mercury.glb");
  const { scene: venusScene } = useGLTF("/textures/venus1.glb");
  const { scene: earthScene } = useGLTF("/textures/earth1.glb");
  const { scene: marsScene } = useGLTF("/textures/mars1.glb");
  const { scene: jupiterScene } = useGLTF("/textures/jupiter.glb");
  const { scene: sunScene } = useGLTF("/textures/sun.glb");
  const { scene: saturnScene } = useGLTF("/textures/saturn1.glb");
  const { scene: uranusScene } = useGLTF("/textures/uranus.glb");
  const { scene: neptuneScene } = useGLTF("/textures/neptune1.glb");


  const preparePlanet = (scene: THREE.Object3D) => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const oldMat = mesh.material as any;
          mesh.material = new THREE.MeshStandardMaterial({
            map: oldMat.map || null,
            normalMap: oldMat.normalMap || null,
            roughnessMap: oldMat.roughnessMap || null,
            metalnessMap: oldMat.metalnessMap || null,
          });
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  };

  [mercuryScene, venusScene, earthScene, marsScene, jupiterScene, saturnScene, uranusScene, neptuneScene].forEach(preparePlanet);

  // Create orbit lines
  const Orbit = ({ radius }: { radius: number }) => {
    const points = useMemo(() => {
      const pts = [];
      const segments = 256;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      return pts;
    }, [radius]);

    const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

    return (
      <line geometry={geometry}>
        <lineBasicMaterial color="white" transparent opacity={0.2} depthWrite={false} />
      </line>
    );
  };

 useFrame(() => {
  const time = performance.now() / 1000;

  const movePlanet = (
    planet: React.RefObject<Group>,
    name: string,
    radius: number,
    orbitSpeed: number,
    rotSpeed: number
  ) => {
    if (!planet.current) return;

    // Axial rotation (always rotate on its axis)
    planet.current.rotation.y += rotSpeed;

    // Orbital motion (only if not the focused planet)
    if (theme !== name) {
      planet.current.position.x = radius * Math.cos(time * orbitSpeed);
      planet.current.position.z = radius * Math.sin(time * orbitSpeed);
    }
  };

  movePlanet(mercury, "mercury", 40, 2.0, 0.02);
  movePlanet(venus, "venus", 70, 0.7, 0.008);
  movePlanet(earth, "earth", 90, 1.0, 0.009);
  movePlanet(mars, "mars", 130, 0.8, 0.02);
  movePlanet(jupiter, "jupiter", 180, 0.09, 0.03);
  movePlanet(saturn, "saturn", 210, 0.08, 0.008);
  movePlanet(uranus, "uranus", 260, 0.05, 0.03);
  movePlanet(neptune, "neptune", 290, 0.04, 0.04);

  // Sun axial rotation
  if (sun.current) sun.current.rotation.y -= 0.002;
});

  return (
    <group>
      <ambientLight intensity={0.2} />
      <directionalLight color={0xffffff} intensity={1.5} castShadow />

      {/* Sun */}
      <primitive ref={sun} object={sunScene} scale={2.2} position={[0, 0, 0]} />

      {/* Orbits */}
      <Orbit radius={40} />
      <Orbit radius={70} />
      <Orbit radius={90} />
      <Orbit radius={130} />
      <Orbit radius={180} />
      <Orbit radius={210} />
      <Orbit radius={260} />
      <Orbit radius={290} />

      {/* Planets */}
      <group ref={mercury} scale={0.1}><primitive object={mercuryScene} /></group>
      <group ref={venus} scale={1.9}><primitive object={venusScene} /></group>
      <group ref={earth} scale={3}><primitive object={earthScene} /></group>
      <group ref={mars} scale={0.2}><primitive object={marsScene} /></group>
      <group ref={jupiter} scale={.08}><primitive object={jupiterScene} /></group>
      <group ref={saturn} scale={9.9}><primitive object={saturnScene} /></group>
      <group ref={uranus} scale={0.04}><primitive object={uranusScene} /></group>
      <group ref={neptune} scale={.4}><primitive object={neptuneScene} /></group>
    </group>
  );
};

export default PlanetSceneObjects;

useGLTF.preload("/textures/mercury.glb");
useGLTF.preload("/textures/sun.glb");
useGLTF.preload("/textures/venus1.glb");
useGLTF.preload("/textures/earth1.glb");
useGLTF.preload("/textures/mars1.glb");
useGLTF.preload("/textures/jupiter.glb");
useGLTF.preload("/textures/saturn1.glb");
useGLTF.preload("/textures/uranus.glb");
useGLTF.preload("/textures/neptune1.glb");

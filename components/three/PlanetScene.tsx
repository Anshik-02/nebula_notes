"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import CameraController from "../camera-controllert";
import { Group } from "three";
import PlanetSceneObjects from "./planet/mercury";
import StarField2 from "../starFeild2";

const PlanetScene = () => {
  const sunRef = useRef<Group>(null);
  const mercuryRef = useRef<Group>(null);
  const venusRef = useRef<Group>(null);
  const earthRef = useRef<Group>(null);
  const marsRef = useRef<Group>(null);
  const jupiterRef = useRef<Group>(null);
  const saturnRef = useRef<Group>(null);
  const uranusRef = useRef<Group>(null);
  const neptuneRef = useRef<Group>(null);

  const refs = {
    sun: sunRef,
    mercury: mercuryRef,
    venus: venusRef,
    earth: earthRef,
    mars: marsRef,
    jupiter: jupiterRef,
    saturn: saturnRef,
    uranus: uranusRef,
    neptune: neptuneRef,
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black">
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 20], fov: 45 }}
        shadows
      >
        <Suspense
          fallback={
       null
          }
        >
          <PlanetSceneObjects refs={refs} />
          <CameraController targets={refs} smooth={0.04} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PlanetScene;

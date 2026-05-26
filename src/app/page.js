"use client"

import React, { useState, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { Model } from './Model';


function Meshes({ active, setActive, show, setShow }) {
  // Load textures only on client, inside Canvas
  const colorMap = useLoader(TextureLoader, 'Wood066_1K-JPG_Color.jpg');
  const colorR31 = useLoader(TextureLoader, 'Rock031_1K-JPG_Color.jpg');
  const colorR37 = useLoader(TextureLoader, 'Rock037_1K-JPG_Color.jpg');
  // const displaceMap = useLoader(TextureLoader, 'Rock037_1K_Displacement.jpg');
  // const normalMap = useLoader(TextureLoader, 'Rock037_1K_Normal.jpg');
  // const roughnessMap = useLoader(TextureLoader, 'Rock037_1K_Roughness.jpg');
  // const aoMap = useLoader(TextureLoader, 'Rock037_1K_AmbientOcclusion.jpg');

  const displaceMap = colorR37;
  const normalMap = colorR37;
  const roughnessMap = colorR37;
  const aoMap = colorR37;

  return (
    <>
      <mesh scale={active ? 1.5 : 1} onClick={() => setActive(!active)}>
        <sphereGeometry args={[1, 32]} />
        {/* <meshStandardMaterial {...props} /> */}
        <meshStandardMaterial
          displacementScale={0.2}
          map={colorMap}
          displacementMap={displaceMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <mesh onClick={() => setShow(!show)} position={[3, 0, 0]} >
        <octahedronGeometry />
        <meshStandardMaterial map={colorR31} />
      </mesh>
    </>
  );
}

export default function Home() {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className='geogroup' style={{ width: "100vw", height: "80vh", borderWidth: "4px", borderColor: "black", position: "relative" }} >
        <div className={`flex items-center p-4 w-[250px] bg-gray-200 font-bold opacity-50 absolute translate-y-20 translate-x-20 ${show ? "z-10" : "-z-10"}`}>
          Hermeneutics is the theory and methodology of interpretation, especially the interpretation of biblical texts, wisdom literature, and philosophical texts
        </div>
        <Canvas camera={{ position: [0, 0, 6] }} style={{ backgroundColor: "gray" }}>
          <Meshes active={active} setActive={setActive} show={show} setShow={setShow} />
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight color="white" intensity={2} position={[1, 2, 2]} />
        </Canvas>
      </div>
      <div className="Deer" style={{ width: "100vw", height: "75vh", borderWidth: "4px", borderColor: "black" }}>
        <Canvas>
          <Suspense fallback={null}>
            <Model scale={[0.25, 0.25, 0.25]} position={[-1, 1, 0]} rotation={[0, -0.9, 0]} />
            <OrbitControls />
            <Environment preset="forest" background />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

// https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene#setting-up-the-canvas
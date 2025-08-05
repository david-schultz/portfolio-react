'use client'
import '@/app/styles.css'
import dynamic from 'next/dynamic'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/ui/custom/SiteBar'

import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import * as THREE from "three"
import { Mesh, Euler } from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Text, Text3D, MeshTransmissionMaterial, OrthographicCamera} from '@react-three/drei'
import { Orbit } from 'next/font/google'
import { useControls } from 'leva'
import { ChromaticAberration } from '@react-three/postprocessing'
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"


export default function GlassScene() {
  
  return (
    <Canvas>
      {/* <OrthographicCamera
        makeDefault
        near={1}
        far={2000}
        position={[0, 0, 200]}
      /> */}
      <ambientLight intensity={1} />
      {/* <pointLight position={[4, 4, 4]} /> */}
      <directionalLight intensity={3} position={[0, 3, 2]}/>
      <Suspense fallback={null}>
        <Model />

      </Suspense>
      {/* <OrbitControls /> */}
      <Environment preset="city" />

      {/* <EffectComposer multisampling={0}>
        <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
        <SMAA />
      </EffectComposer> */}
    </Canvas>
  );
}

function Model() {
  const meshRef = useRef<Mesh>(null);
  return (
      <group>
        <mesh ref={meshRef} position={[0, 0, 0.2]} scale={0.5}>
        <planeGeometry  />
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={0.8}
          chromaticAberration={0.03}
          backside={true} />
      </mesh>
      </group>
  );
}
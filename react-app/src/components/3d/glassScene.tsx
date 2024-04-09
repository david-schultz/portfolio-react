import '@/app/styles.css'
import dynamic from 'next/dynamic'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/SiteBar'

import { useRef, useState, useEffect, Suspense } from 'react'
import * as THREE from "three"
import { Mesh } from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Text, Text3D, MeshTransmissionMaterial } from '@react-three/drei'
import { Orbit } from 'next/font/google'
import { useControls } from 'leva'
import { ChromaticAberration } from '@react-three/postprocessing'

export default function GlassScene() {
  
  return (
    <Canvas>
      <ambientLight intensity={1} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* <directionalLight intensity={3} position={[0, 3, 2]}/> */}
      <Suspense fallback={null}>
        <Model />

      </Suspense>
      {/* <OrbitControls /> */}
      <Environment preset="city" />
    </Canvas>
  );
}

function Model() {

  const meshRef = useRef<Mesh>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { nodes } = useGLTF('./models/torus.glb')
  const { viewport } = useThree();

  useFrame((state, delta) => { 
    if (!meshRef.current) {
      return;
    }

    const speed = isHovered ? 1 : 0.5;

    meshRef.current.rotation.x += delta * speed;
    meshRef.current.rotation.z += delta * speed;
    
  });

  // glass
  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1},
    ior: { value: 1.2, min: 0, max: 3, step: 0.01 },
    chromaticAberration: { value: 0.05, min: 0, max: 1 },
    backside: { value: true },
  })

  // film effect
  // const materialProps = useControls({
  //   thickness: { value: 1.5, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0.9, min: 0, max: 1, step: 0.1 },
  //   transmission: { value: 1, min: 0, max: 1, step: 0.1},
  //   ior: { value: 1.2, min: 0, max: 3, step: 0.01 },
  //   chromaticAberration: { value: 0.0, min: 0, max: 1 },
  //   backside: { value: true },
  // })
 
  return (
    <group scale={viewport.width / 4} 
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      >
      <group>
        <Text
          fontSize={0.5}
          font='fonts/GraphikMedium.otf'
          position={[-0.225, 0.225, -0.75]}
          letterSpacing={-0.05}
          color={isHovered ? "#FFC700": "#FFFFFF"}
        >
          Interaction*
        </Text>
        <Text 
          fontSize={0.5}
          font='fonts/GraphikMedium.otf'
          position={[0.475, -0.225, -0.75]}
          letterSpacing={-0.05}
          color={"#ffffff"}
        >
          Designer
        </Text>

      </group>
      <mesh {...nodes.Torus001} ref={meshRef} position={[0, 0, 0.2]} scale={0.5}>
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* <meshStandardMaterial color="orange" /> */}
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
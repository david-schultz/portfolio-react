
//@ts-nocheck
'use client'
import '@/app/styles.css'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/ui/custom/SiteBar'
import { Button } from '@/components/ui/button'

import { useRef, useState, useEffect } from 'react'
import * as THREE from "three"
import { DirectionalLightHelper, } from "three"
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Outlines, Environment, useTexture, useHelper, useGLTF, shaderMaterial } from '@react-three/drei'
import { Physics, useSphere } from "@react-three/cannon"
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"



import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"
import { Orbit } from 'next/font/google'
import PortalScene from '@/components/3d/PortalScene'
import { button } from 'leva'


let gogglesSrc = "/fa/head-side-goggles-solid.svg";
let browserSrc = "/fa/browser-solid.svg";


// Notes:
// - Added three.js
// - Added react-three-fiber
// - Added react-three/drei
// - Added react-spring/web
// Ref: https://www.youtube.com/watch?v=DPl34H2ISsk&t=441s


        
// type GLTFResult = GLTF & {
//   nodes: {
//     r_handMeshNode: THREE.SkinnedMesh
//     wrist: THREE.Bone,['thumb-metacarpal']: THREE.Bone,['thumb-phalanx-proximal']: THREE.Bone,['thumb-phalanx-distal']: THREE.Bone,['thumb-tip']: THREE.Bone,['index-finger-metacarpal']: THREE.Bone,['index-finger-phalanx-proximal']: THREE.Bone,['index-finger-phalanx-intermediate']: THREE.Bone,['index-finger-phalanx-distal']: THREE.Bone,['index-finger-tip']: THREE.Bone,['middle-finger-metacarpal']: THREE.Bone,['middle-finger-phalanx-proximal']: THREE.Bone,['middle-finger-phalanx-intermediate']: THREE.Bone,['middle-finger-phalanx-distal']: THREE.Bone,['middle-finger-tip']: THREE.Bone,['ring-finger-metacarpal']: THREE.Bone,['ring-finger-phalanx-proximal']: THREE.Bone,['ring-finger-phalanx-intermediate']: THREE.Bone,['ring-finger-phalanx-distal']: THREE.Bone,['ring-finger-tip']: THREE.Bone,['pinky-finger-metacarpal']: THREE.Bone,['pinky-finger-phalanx-proximal']: THREE.Bone,['pinky-finger-phalanx-intermediate']: THREE.Bone,['pinky-finger-phalanx-distal']: THREE.Bone,['pinky-finger-tip']: THREE.Bone
//   }
//   materials: {
//     lambert2: THREE.MeshStandardMaterial
//   }
// }


const GlassScene = dynamic(() => import('@/components/3d/glassScene.tsx'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})



export default function Sandbox() {
  const [isRunning, setIsRunning] = useState(false); // Add this line

  const [color, setColor] = useState("white");
  let interact = () => {
    let colors = ["white", "black", "yellow"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }

  // Add this function
  let toggleRunning = () => {
    setIsRunning(!isRunning);
  }

  return (

    <>

      <section className="md:col-span-4 flex flex-col gap-4 md:sticky md:top-16 self-start">
        <div className="w-[100px] h-[100px] bg-red-500"></div>
        <Link href="/"><h1 className="font-serif text-tx">david schultz</h1></Link>
        <p>Hi! I&apos;m a freelance interaction designer & developer. My bread-and-butter is Next.js, but I am currently expanding my skillset to SwiftUI development.</p>
      </section>

      <main className="md:col-span-8 flex flex-col">
        <section className="mx-2 bg-neutral-800 rounded-b-lg mb-64 h-[800px] md:h-[928px]">
          <div className="w-full h-[800px] md:h-[928px] top-0">
            <PortalScene isRunning={isRunning} />
          </div>
          <div className="absolute z-1 p-6 top-[calc(100vh-32rem)] md:top-[calc(100vh-24rem)] right-16">
            <Button onClick={toggleRunning} className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}>{isRunning ? "Pause Sim" : "Start Sim"}</Button>
          </div>
        </section>
      </main>
    </>
  )
}



// ========================================================================================================
// Glass Scene
// ========================================================================================================












// ========================================================================================================
// Basic SpinningCube Scene
// ========================================================================================================


// function MainScene({color}: {color: string}) {
//   const directionalLightRef = useRef(null);

//   // useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'cyan');

//   return (
//     <>
//       {/* <orthographicCamera makeDefault position={[0, 0, 10]} zoom={10} /> */}
//       <ambientLight ref={directionalLightRef} />
//       <pointLight position={[3, 3, 3]} intensity={50} />
//       <OrbitControls />

//       <group position={[0, 0, 0]}>
//         <points>
//           <torusGeometry />
//           <pointsMaterial color="white" size={0.025} />
//         </points>
//       </group>
//     </>
//   );
// }










// function Round({textureSrc}: {textureSrc: string}) {
//   const meshRef = useRef<Mesh>(null);
//   useFrame((state, delta) => { 
//     if (!meshRef.current) {
//       return;
//     }
//     meshRef.current.rotation.y += delta * speed;
//   });

//   // const texture = useLoader(TextureLoader, {textureSrc});
//   const texture = useLoader(TextureLoader, 'https://s33.postimg.cc/zaty10vot/out.png')
  
//   return (
//     <mesh>
//       <sphereGeometry />
//       <meshStandardMaterial map={texture} transparent={true}/>
//     </mesh>
//   );
// }

// function SpinningCube({position}: {position: [number, number, number]}) {
//   const meshRef = useRef<Mesh>(null);

//   const [isHovered, setIsHovered] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   useFrame((state, delta) => { 
//     if (!meshRef.current) {
//       return;
//     }
//     const speed = isHovered ? 1 : 0.1;
//     meshRef.current.rotation.x += delta * speed;
//     meshRef.current.rotation.y += delta * speed;
//     // meshRef.current.position.x += Math.sin(state.clock.elapsedTime) * 0.01;
//     // meshRef.current.position.y += Math.cos(state.clock.elapsedTime) * 0.01;
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       scale={1}
//       position={position}
//       onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
//       onPointerLeave={() => setIsHovered(false)}
//       onClick={() => setIsClicked(!isClicked)}
//       scale={isClicked ? [2, 2, 2] : [1, 1, 1]}
//     >
//       <boxGeometry />
//       <meshStandardMaterial color={isHovered ? "orange" : "white"} wireframe />
//     </mesh>
//   );
// }



// ========================================================================================================
// Hand Scene
// Auto-generated by: https://github.com/pmndrs/gltfjsx
// ========================================================================================================

// function HandScene() {

//   return (
//     <>
//       <ambientLight />
//       <pointLight position={[3, 3, 3]} intensity={50} />

//       <group position={[0, 0, 0]} scale={10}>
//         <HandModel />
//       </group>
//     </>
//   );
// }

// function HandModel(props: JSX.IntrinsicElements['group']) {
//   const group = useRef<THREE.Group>()
//   const { nodes, materials } = useGLTF('./models/right_hand.gltf') as GLTFResult
//   return (
//     <group ref={group} {...props} dispose={null}>
//       <primitive object={nodes.wrist} />
//       <primitive object={nodes['thumb-metacarpal']} />
//       <primitive object={nodes['thumb-phalanx-proximal']} />
//       <primitive object={nodes['thumb-phalanx-distal']} />
//       <primitive object={nodes['thumb-tip']} />
//       <primitive object={nodes['index-finger-metacarpal']} />
//       <primitive object={nodes['index-finger-phalanx-proximal']} />
//       <primitive object={nodes['index-finger-phalanx-intermediate']} />
//       <primitive object={nodes['index-finger-phalanx-distal']} />
//       <primitive object={nodes['index-finger-tip']} />
//       <primitive object={nodes['middle-finger-metacarpal']} />
//       <primitive object={nodes['middle-finger-phalanx-proximal']} />
//       <primitive object={nodes['middle-finger-phalanx-intermediate']} />
//       <primitive object={nodes['middle-finger-phalanx-distal']} />
//       <primitive object={nodes['middle-finger-tip']} />
//       <primitive object={nodes['ring-finger-metacarpal']} />
//       <primitive object={nodes['ring-finger-phalanx-proximal']} />
//       <primitive object={nodes['ring-finger-phalanx-intermediate']} />
//       <primitive object={nodes['ring-finger-phalanx-distal']} />
//       <primitive object={nodes['ring-finger-tip']} />
//       <primitive object={nodes['pinky-finger-metacarpal']} />
//       <primitive object={nodes['pinky-finger-phalanx-proximal']} />
//       <primitive object={nodes['pinky-finger-phalanx-intermediate']} />
//       <primitive object={nodes['pinky-finger-phalanx-distal']} />
//       <primitive object={nodes['pinky-finger-tip']} />
//       <skinnedMesh geometry={nodes.r_handMeshNode.geometry} material={materials.lambert2} skeleton={nodes.r_handMeshNode.skeleton} />
//     </group>
//   )
// }

// // useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/right-hand-white-webxr-tracking-ready/model.gltf')
// useGLTF.preload('./models/right_hand.gltf')
























// ========================================================================================================
// ThreeDemoA
// ========================================================================================================

// function ThreeDemoA() {
//   const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
//   const containerRef = useRef(null);
//   useEffect(() => {
//     function updateSize() {
//       if (!containerRef.current) {
//         return;
//       }
//       setCanvasSize({
//         width: (containerRef.current as HTMLDivElement).offsetWidth,
//         height: (containerRef.current as HTMLDivElement).offsetHeight,
//       });
//     }

//     window.addEventListener('resize', updateSize);
//     updateSize();

//     return () => window.removeEventListener('resize', updateSize);
//   }, []);


//   const subdivisions = 6;
//   const recursion = 1;

//   return (
//     <div ref={containerRef} className="w-full h-[500px] relative">
//       <Canvas>
//         <PerspectiveCamera
//           makeDefault
//           fov={60}
//           aspect={canvasSize.width / canvasSize.height}
//           near={1}
//           far={200}
//         />
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
//         {/* <OrbitControls /> */}

//         <DashedBox width={50} height={50} depth={50} />
//       </Canvas>
//     </div>
//   );
// }

// function DashedBox({width, height, depth}: {width: number, height: number, depth: number}) {
//   const meshRef = useRef<Mesh>(null);
//   useFrame(() => { 
//     if (!meshRef.current) {
//       return;
//     }
//     // meshRef.current.rotation.x += 0.01;
//     // meshRef.current.rotation.y += 0.01;
//   });

//   width = width * 0.5,
//   height = height * 0.5,
//   depth = depth * 0.5;
//   const position = [];
//   position.push(
//     - width, - height, - depth,
//     - width, height, - depth,

//     - width, height, - depth,
//     width, height, - depth,

//     width, height, - depth,
//     width, - height, - depth,

//     width, - height, - depth,
//     - width, - height, - depth,

//     - width, - height, depth,
//     - width, height, depth,

//     - width, height, depth,
//     width, height, depth,

//     width, height, depth,
//     width, - height, depth,

//     width, - height, depth,
//     - width, - height, depth,

//     - width, - height, - depth,
//     - width, - height, depth,

//     - width, height, - depth,
//     - width, height, depth,

//     width, height, - depth,
//     width, height, depth,

//     width, - height, - depth,
//     width, - height, depth
//   );
//   let positions = new Float32Array(position);

//   return (
//     <mesh ref={meshRef} >
//       <bufferGeometry >
//         <bufferAttribute
//           attach="attributes-position"
//           array={positions}
//           // count={positions.length / 3}
//           itemSize={3}
//           />
//         {/* <bufferAttribute attachObject={['attributes', 'position']} count={position.length / 3} array={new Float32Array(position)} itemSize={3} /> */}
//       </bufferGeometry>
//       <meshStandardMaterial />
//     </mesh>
//   );
// }






// function Dots({form}: {form: string}) {

//   let dots = [];
//   let index = 0;
//   for (let i = 0; i < 25; i++) {
//     dots.push(<Dot key={index} position={[i, j, 0]} />);
//     index++;
//   }

//   return <>{dots}</>;
// }

// function Dot({ position }: { position: [number, number, number] }) {
//   const meshRef = useRef<Mesh>(null);
//   useFrame(() => { 
//     if (!meshRef.current) {
//       return;
//     }
//   });

//   return (
//     <mesh ref={meshRef} position={position} >
//       <circleGeometry />
//       <meshStandardMaterial color="white" />
//       {/* <meshNormalMaterial wireframe /> */}
//     </mesh>
//   );
// }






// ========================================================================================================
// Clump Demo
// ========================================================================================================


// function ClumpDemo() {
//   const rfs = THREE.MathUtils.randFloatSpread
//   const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
//   const baubleMaterial = new THREE.MeshStandardMaterial({ color: "white", roughness: 0, envMapIntensity: 1 })


//   function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
//     // const { outlines } = useControls({ outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 } })
//     const texture = useTexture("/cross.jpg")
//     const [ref, api] = useSphere(() => ({ args: [1], mass: 1, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }))
//     useFrame((state) => {
//       for (let i = 0; i < 40; i++) {
//         // Get current whereabouts of the instanced sphere
//         ref.current.getMatrixAt(i, mat)
//         // Normalize the position and multiply by a negative force.
//         // This is enough to drive it towards the center-point.
//         api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-40).toArray(), [0, 0, 0])
//       }
//     })
//     return (
//       <instancedMesh ref={ref} castShadow receiveShadow args={[sphereGeometry, baubleMaterial, 40]} material-map={texture}>
//         {/* <Outlines thickness={outlines} /> */}
//       </instancedMesh>
//     )
//   }

//   function Pointer() {
//     const viewport = useThree((state) => state.viewport)
//     const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }))
//     return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
//   }

//   return (
//     <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}>
//       <ambientLight intensity={0.5} />
//       <color attach="background" args={["#dfdfdf"]} />
//       <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
//       <Physics gravity={[0, 2, 0]} iterations={10}>
//         <Pointer />
//         <Clump />
//       </Physics>
//       <Environment files="/adamsbridge.hdr" />
//       <EffectComposer disableNormalPass multisampling={0}>
//         <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
//         <SMAA />
//       </EffectComposer>
//     </Canvas>
//   );
// }
import '@/app/styles.css'
import dynamic from 'next/dynamic'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/SiteBar'

import { useRef, useState, useEffect, Suspense, useMemo, Dispatch, SetStateAction } from 'react'
import * as THREE from "three"
import { Mesh, Euler, Vector3, Quaternion } from 'three'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useGLTF, OrbitControls, Environment, Text, Text3D, MeshTransmissionMaterial, OrthographicCamera, PerspectiveCamera, Box} from '@react-three/drei'
import { Physics, RigidBody, RapierRigidBody, MeshCollider, CuboidCollider, RigidBodyTypeString } from '@react-three/rapier'

import { Panel, PanelHole, PanelSlope } from '@/components/3d/thinking-with-portals.jsx'
import { update } from '@react-spring/web'


interface IPortalProps {
  id: number;
  type: string;
  position: { x: number, y: number, z: number };
  normal: { x: number, y: number, z: number };
}

interface IPortalObject {
  portal: IPortalProps;
  nextId: number;
  setTarget: Dispatch<SetStateAction<number>>;
  setTeleport: Dispatch<SetStateAction<boolean>>;
  teleport: boolean;
}

interface ITeleporterProps {
  nextId: number;
  setTarget: Dispatch<SetStateAction<number>>;
  setTeleport: Dispatch<SetStateAction<boolean>>;
  teleport: boolean;
}

interface ICubeProps {
  name: string;
  isActive: boolean;
}

export default function PortalScene({ isRunning }: { isRunning: boolean }) {
    useEffect(() => {
    if (isRunning) {
      // Start physics and collider interactions
      // Reset all elements in the scene
      console.log("Playing...");
    } else {
      // Stop physics and collider interactions
      console.log("Pausing...");
    }
  }, [isRunning]);
  
  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        fov={45}
        near={0.1}
        far={1000}
        position={[10, 5, 10]}
      />
      <ambientLight intensity={1} />
      <directionalLight position={[-10, 10, 0]} intensity={3} />
      <Suspense fallback={null}>
        <Physics paused={!isRunning}>
          <RoomLayout />
        </Physics>
      </Suspense>
      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}





function RoomLayout() {
  let portals: IPortalProps[] = [
    { id: 0, type: 'PanelHole', position: { x: -2.5, y: 1, z: 0 }, normal: { x: 0, y: 1, z: 0 } },
    { id: 1, type: 'PanelHole', position: { x: 0, y: 0, z: 0 }, normal: { x: 0, y: 1, z: 0 } },
    { id: 2, type: 'PanelHole', position: { x: 2.5, y: -1, z: 0 }, normal: { x: 0, y: 1, z: 0 } },
  ];

  const [isLoaded, setIsLoaded] = useState(false);

  const [lastTarget, setLastTarget] = useState(-1);
  const [target, setTarget] = useState(0);
  const [teleport, setTeleport] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const [activeCube, setActiveCube] = useState<RapierRigidBody>();
  const [inactiveCube, setInactiveCube] = useState<RapierRigidBody>();
  
  const cubeARef = useRef<RapierRigidBody>(null);
  const cubeBRef = useRef<RapierRigidBody>(null);


  // i.e. Initialize
  useEffect(() => {
    if (isLoaded) return;
    console.log('Initializing...');

    if (cubeARef.current && cubeBRef.current) {
      setActiveCube(cubeARef.current);
      setInactiveCube(cubeBRef.current);
    }
    setIsLoaded(true);

  });

  useEffect(() => {
    if (!isLoaded) return;
    if (isClicked){
      console.log('toggled off');
    } else {
      console.log('toggled on');
    }
  }, [isClicked]);



  // i.e., TELEPORTATION
  useEffect(() => {
    console.table(target);
    if (!isLoaded) return;
    if (isClicked) return;
    if (!cubeARef.current || !cubeBRef.current || !activeCube || !inactiveCube || !portals[target]) return;

    if (teleport) {
      setTeleport(false);
      if (target === lastTarget) return;
      setLastTarget(target);
      // Get position of the portal
      let pos = portals[target].position;

      // Get rotation and velocity of the active cube
      let rotation = activeCube.rotation();
      let curVel = activeCube.linvel();
      let magnitude = Math.sqrt(curVel.x * curVel.x + curVel.y * curVel.y + curVel.z * curVel.z);
      magnitude = 5;

      // Determine the new velocity: same magnitude, new direction
      let normal = new THREE.Vector3(portals[target].normal.x, portals[target].normal.y, portals[target].normal.z).normalize();
      normal.multiplyScalar(magnitude);

      // Teleport the inactive cube to the target portal
      inactiveCube.setTranslation({ x: pos.x, y: pos.y, z: pos.z }, true);  
      inactiveCube.setRotation(rotation, true);
      inactiveCube.setLinvel({ x: normal.x, y: normal.y, z: normal.z }, true);

      setTimeout(() => {
        if (!cubeARef.current || !cubeBRef.current) return;
        // Swap the active and inactive cubes
        if (activeCube === cubeARef.current) {
          setActiveCube(cubeBRef.current);
          setInactiveCube(cubeARef.current);
        } else {
          setActiveCube(cubeARef.current);
          setInactiveCube(cubeBRef.current);
        }

      }, 10);



    }
  }, [teleport]);





  return (
    <group onClick={() => {
      setIsClicked(!isClicked)
    }}>

      <group position={[-2.5, 3, 0]}>
        <RigidBody ref={cubeARef} name="CubeA" type={"dynamic"}>
          <Cube name="coobA" isActive={activeCube === cubeARef.current} />
        </RigidBody>
      </group>

      <group position={[0, -10, 0]}>
        <RigidBody ref={cubeBRef} name="CubeB" type={"dynamic"}>
          <Cube name="coobB" isActive={activeCube === cubeBRef.current} />
        </RigidBody>
      </group>


      {/* TODO: TEST AND SEE IF <PORTAL> CAN REPLACE THE BELOW CODE */}
      {/* 
      // 
      // 
      // 
      // 
      //  */}
      {portals.map((portal: IPortalProps, index: number) => {
        if (portal.type === 'PanelHole') {
          return (
            <Portal
              key={index}
              portal={portal}
              nextId={(index + 1) % portals.length}
              setTarget={setTarget}
              setTeleport={setTeleport}
              teleport={teleport}
            />
          );

        }
      })}

    </group>
  );
}


// { id: 0, type: 'PanelHole', position: { x: -2.5, y: 1, z: 0 }, normal: { x: 0, y: 1, z: 0 } },

function Portal({portal, nextId, setTarget, setTeleport, teleport}: IPortalObject) {

  function rotateVectorWithNormal(toRotate: Vector3, normal: Vector3) {
    const newVector: Vector3 = new Vector3().copy(toRotate);

    // set up direction
    let up = new Vector3(0, 1, 0);
    let axis: Vector3;
    // we want the vector to point in the direction of the face normal
    // determine an axis to rotate around
    // cross will not work if vec == +up or -up, so there is a special case
    if (normal.y == 1 || normal.y == -1) {
      axis = new Vector3(1, 0, 0);
    } else {
      axis = up.clone().cross(normal);
    }

    // determine the amount to rotate
    let radians = Math.acos(normal.dot(up));
    const quat = new Quaternion().setFromAxisAngle(axis, radians);
    newVector.applyQuaternion(quat);

    return newVector;

}


  console.log(portal);
  return (
    <group position={[portal.position.x, portal.position.y, portal.position.z]}>
      <PanelHole />
      <group position={[0, 0.05, 0]}>
        <Teleporter nextId={nextId} setTarget={setTarget} setTeleport={setTeleport} teleport={teleport}/>
      </group>
    </group>
  );
}








function Cube({name, isActive}: ICubeProps) {
  const { nodes, materials } = useGLTF('./models/thinking-with-portals.gltf')
  return (

      <group scale={[0.75, 0.75, 0.75]}>
      <mesh geometry={(nodes.Cube001 as THREE.Mesh).geometry} >
        <meshStandardMaterial
          color={"blue"}
          visible={isActive}
        />
      </mesh>
      <mesh geometry={(nodes.Cube001_1 as THREE.Mesh).geometry} >
        <meshStandardMaterial
          color={"white"}
          visible={isActive}
        />
      </mesh>
      <mesh geometry={(nodes.Cube001_2 as THREE.Mesh).geometry} >
        <meshStandardMaterial
          color={"grey"}
          visible={isActive}
        />
      </mesh>
    </group>

  );
}


function Teleporter({nextId, setTarget, setTeleport, teleport}: ITeleporterProps) {
  return (
    <group position={[0, -0.8, 0]}>
      <CuboidCollider
        args={[1, 0.02, 1]}
        name="Teleporter"
        sensor
        onIntersectionEnter={() => {
          setTarget(nextId);
          setTeleport(true);
        }}
      />
    </group>
  );
}

useGLTF.preload('./models/thinking-with-portals.gltf');
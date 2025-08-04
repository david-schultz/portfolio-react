import '@/app/styles.css'
import dynamic from 'next/dynamic'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/ui/custom/SiteBar'

import { useRef, useState, useEffect, Suspense, useMemo, Dispatch, SetStateAction } from 'react'
import * as THREE from "three"
import { Mesh, Euler, Vector3, Quaternion } from 'three'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useGLTF, OrbitControls, Environment, Text, Text3D, MeshTransmissionMaterial, OrthographicCamera, PerspectiveCamera, Box} from '@react-three/drei'
import { Physics, RigidBody, RapierRigidBody, MeshCollider, CuboidCollider, RigidBodyTypeString, vec3 } from '@react-three/rapier'

import { FullScene, Panel, PanelHole, PanelSlope, PistonSurface } from '@/app/demos/portals/components/thinking-with-portals.jsx'
import { update } from '@react-spring/web'
import { group } from 'console'


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
  activeCubeName: string;
}


interface IPortalBodyProps {
  pos: { x: number, y: number, z: number };
  rot: { x: number, y: number, z: number };
  nextId: number;
  setTarget: Dispatch<SetStateAction<number>>;
  setTeleport: Dispatch<SetStateAction<boolean>>;
  teleport: boolean;
}

interface IPistonProps {
  id: number;
  position: { x: number, y: number, z: number };
  normal: { x: number, y: number, z: number };
  force: number;
}

interface IPistonObject {
  piston: IPistonProps;
  activeCubeName: string;
}

interface ITeleporterProps {
  nextId: number;
  setTarget: Dispatch<SetStateAction<number>>;
  setTeleport: Dispatch<SetStateAction<boolean>>;
  teleport: boolean;
  activeCubeName: string;
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
        position={[8, 5, 8]}
      />
      <ambientLight intensity={1} />
      <directionalLight position={[-10, 10, 0]} intensity={3} />
      <Suspense fallback={null}>
        <Physics paused={!isRunning} debug>
          <RoomLayout />
        </Physics>
      </Suspense>
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={false} 
        // enableRotate={false}
      />
    </Canvas>
  );
}





function RoomLayout() {
  const portals: IPortalProps[] = useMemo(() => [
    { id: 0, type: 'PanelHole', position: { x: -3.5, y: 0, z: 1 }, normal: { x: 0, y: 1, z: 0 } },
    { id: 1, type: 'PanelHole', position: { x: -5.5, y: 0.8, z: 1 }, normal: { x: 1, y: 1, z: 0 } },
    { id: 2, type: 'PanelHole', position: { x: 2.25, y: -4, z: 1 }, normal: { x: -0.25, y: 1, z: 0 } },
    { id: 3, type: 'PanelHole', position: { x: 4, y: 0, z: -3 }, normal: { x: -0.5, y: 1, z: 0 } },
  ], []);

  const pistons = useMemo(() => [
    { id: 0, position: { x: -2.5, y: -1, z: -3 }, normal: { x: 1, y: 1, z: 1 }, force: 1 },
  ], []);

  const [isLoaded, setIsLoaded] = useState(false);

  const [lastTarget, setLastTarget] = useState(-1);
  const [target, setTarget] = useState(0);
  const [teleport, setTeleport] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const [activeCube, setActiveCube] = useState<RapierRigidBody>();
  const [inactiveCube, setInactiveCube] = useState<RapierRigidBody>();

  const [activeCubeName, setActiveCubeName] = useState<string>("CubeA");
  
  const cubeARef = useRef<RapierRigidBody>(null);
  const cubeBRef = useRef<RapierRigidBody>(null);


  // i.e. Initialize
  useEffect(() => {
    if (isLoaded) return;
    console.log('Initializing...');

    if (cubeARef.current && cubeBRef.current) {
      setActiveCube(cubeARef.current);
      setActiveCubeName("CubeA");
      setInactiveCube(cubeBRef.current);
    }
    setIsLoaded(true);

  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isClicked){
      console.log('toggled off');
    } else {
      console.log('toggled on');
    }
  }, [isClicked, isLoaded]);



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
      // magnitude = 5;

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
          setActiveCubeName("CubeB");
          setInactiveCube(cubeARef.current);
        } else {
          setActiveCube(cubeARef.current);
          setActiveCubeName("CubeA");
          setInactiveCube(cubeBRef.current);
        }

      }, 10);



    }
  }, [teleport, target, lastTarget, activeCube, inactiveCube, isLoaded, isClicked, portals]);





  return (
    <group onClick={() => {
      setIsClicked(!isClicked)
    }}>

      <FullScene position={[0, -3, 0]}/>

      <group position={[portals[0].position.x, portals[0].position.y + 2, portals[0].position.z]}>
        <RigidBody ref={cubeARef} name="CubeA" type={"dynamic"}>
          <Cube name="coobA" isActive={activeCube === cubeARef.current} />
        </RigidBody>
      </group>

      <group position={[0, -10, 0]}>
        <RigidBody ref={cubeBRef} name="CubeB" type={"dynamic"}>
          <Cube name="coobB" isActive={activeCube === cubeBRef.current} />
        </RigidBody>
      </group>


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
              activeCubeName={activeCubeName}
            />
          );

        }
      })}

      {pistons.map((piston: IPistonProps, index: number) => {
          return (
            <Piston
              key={index}
              piston={piston}
              activeCubeName={activeCubeName}
            />
          );
      })}




    </group>
  );
}

function Portal({portal, nextId, setTarget, setTeleport, teleport, activeCubeName}: IPortalObject) {
  const origin = new Vector3(0, 1, 0);
  const normal = new Vector3(portal.normal.x, portal.normal.y, portal.normal.z);
  const pos = new Vector3(portal.position.x, portal.position.y, portal.position.z);
  const rot = calculateRotation(origin, normal);

  function calculateRotation(original: Vector3, target: Vector3) {
    const a = original.normalize();
    const b = target.normalize();
  
    const dot = a.dot(b);
    const cross = a.cross(b);
  
    const x = Math.atan2(cross.x, dot);
    const y = Math.atan2(cross.y, dot);
    const z = Math.atan2(cross.z, dot);

    const json = {x, y, z};
    return json;
  }

  return (
    <group position={[pos.x, pos.y, pos.z]} rotation={[rot.x, rot.y, rot.z]}>
      <PanelHole rotation={[0, 0, 0]} />
      <Teleporter nextId={nextId} setTarget={setTarget} setTeleport={setTeleport} teleport={teleport} activeCubeName={activeCubeName}/>
    </group>
  );
}




function Piston({piston, activeCubeName}: IPistonObject) {

  const origin = new Vector3(0, 1, 0);
  const normal = new Vector3(piston.normal.x, piston.normal.y, piston.normal.z);
  const pos = new Vector3(piston.position.x, piston.position.y, piston.position.z);
  const rot = calculateRotation(origin, normal);

  function calculateRotation(original: Vector3, target: Vector3) {
    const a = original.normalize();
    const b = target.normalize();
  
    const dot = a.dot(b);
    const cross = a.cross(b);
  
    const x = Math.atan2(cross.x, dot);
    const y = Math.atan2(cross.y, dot);
    const z = Math.atan2(cross.z, dot);

    const json = {x, y, z};
  
    return json;
  }

  return (
    <group position={[pos.x, pos.y, pos.z]} rotation={[rot.x, rot.y, rot.z]}>
      <PistonInteractable piston={piston} activeCubeName={activeCubeName} />
    </group>
  );
}

function PistonInteractable({piston, activeCubeName}: IPistonObject) {
  const normal = new Vector3(piston.normal.x, piston.normal.y, piston.normal.z);
  const startPos = new Vector3(piston.position.x, piston.position.y, piston.position.z);
  const endPos = new Vector3().addVectors(startPos, normal.clone().multiplyScalar(piston.force));
  const duration = 100 / piston.force;

  const ref = useRef<RapierRigidBody>(null);


  const [triggered, setTriggered] = useState(false);
  const [retracting, setRetracting] = useState(false);
  const [clockStart, setClockStart] = useState(0);

  useEffect(() => {
    setClockStart(Date.now());
  }, [triggered]);

  useFrame(() => {
    if (!ref.current) return;
    const now = Date.now();
    const elapsed = now - clockStart;

    if (triggered) {
      // 1. If not retracting
      // 2. Get nextPos by lerping pos to endpos
      // 3. Set nextPos as the next kinematic translation
      // 4. If at endpos, set retracting to true
      // 5. if retracting, set nextPos by lerping from endpos to initialpos
      
      if (!retracting) {
        if (elapsed < duration) {
          let t = elapsed / duration;
          let nextPos = new Vector3().lerpVectors(startPos, endPos, t);
          ref.current.setNextKinematicTranslation(nextPos);
        } else {
          ref.current.setNextKinematicTranslation(endPos);
          setRetracting(true);
          setClockStart(Date.now());
        }
      } else {
        if (elapsed > 500) {

          if (elapsed < ((duration * 5) + 500)) {
            let t = (elapsed - 500) / (duration * 5);
            let nextPos = new Vector3().lerpVectors(endPos, startPos, t);
            ref.current.setNextKinematicTranslation(nextPos);
          } else {
            ref.current.setNextKinematicTranslation(startPos);
            setRetracting(false);
            setTriggered(false);
            setClockStart(Date.now());
          }

        }
      }
    }
  });

  return (
    <group>
      <RigidBody
        ref={ref}
        type="kinematicPosition"
        args={[1, 0.025, 1]}
        onContactForce={(payload) => {
          if (!payload.colliderObject) return;
          if (!triggered) {
            if (activeCubeName === payload.colliderObject.name) {
              setTriggered(true);
            }
          }
        }}
      >
        <PistonSurface />
      </RigidBody>

    </group>
  );
}



function Cube({name, isActive}: ICubeProps) {
  const { nodes, materials } = useGLTF('/demos/portals/models/thinking-with-portals.gltf')

    // Add safety checks for nodes and materials
  if (!nodes || !materials) {
    return null;
  }

  return (
    <group scale={[0.75, 0.75, 0.75]}>
      {nodes.Cube001 && (
        <mesh geometry={(nodes.Cube001 as THREE.Mesh).geometry} >
          <meshStandardMaterial
            color={"blue"}
            visible={isActive}
          />
        </mesh>
      )}
      {nodes.Cube001_1 && (
        <mesh geometry={(nodes.Cube001_1 as THREE.Mesh).geometry} >
          <meshStandardMaterial
            color={"white"}
            visible={isActive}
          />
        </mesh>
      )}
      {nodes.Cube001_2 && (
        <mesh geometry={(nodes.Cube001_2 as THREE.Mesh).geometry} >
          <meshStandardMaterial
            color={"grey"}
            visible={isActive}
          />
        </mesh>
      )}
    </group>
  );
}


function Teleporter({nextId, setTarget, setTeleport, teleport, activeCubeName}: ITeleporterProps) {
  return (
    <group position={[0, -0.5, 0]}>
      <CuboidCollider
        args={[1, 0.02, 1]}
        name="Teleporter"
        sensor
        onIntersectionEnter={(payload) => {
          if (!payload.colliderObject) return;
          if (activeCubeName === payload.colliderObject.name) {
            setTarget(nextId);
            setTeleport(true);
          }
        }}
      />
    </group>
  );
}

useGLTF.preload('/demos/portals/models/thinking-with-portals.gltf');
useGLTF.preload('/demos/portals/models/portal-models.gltf');
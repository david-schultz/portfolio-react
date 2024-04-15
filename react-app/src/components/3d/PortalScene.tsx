import '@/app/styles.css'
import dynamic from 'next/dynamic'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/SiteBar'

import { useRef, useState, useEffect, Suspense, useMemo, Dispatch, SetStateAction } from 'react'
import * as THREE from "three"
import { Mesh, Euler, Plane, Vector3, Quaternion } from 'three'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useGLTF, OrbitControls, Environment, Text, Text3D, MeshTransmissionMaterial, OrthographicCamera, PerspectiveCamera, Box} from '@react-three/drei'
import { Physics, RigidBody, RapierRigidBody, MeshCollider, CuboidCollider, RigidBodyTypeString } from '@react-three/rapier'

import { Panel, PanelHole, PanelSlope } from '@/components/3d/thinking-with-portals.jsx'
import { update } from '@react-spring/web'

interface ILayoutProps {
  // clippingPlane: THREE.Plane;
}

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

interface IPlaneActivatorProps {
  index: number;
  setCurClip: Dispatch<SetStateAction<number>>;
}

interface ICubeProps {
  name: string;
  planes: THREE.Plane[];
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
    <Canvas
      // gl={{ localClippingEnabled: true }}
      // onCreated={(state) => (state.gl.localClippingEnabled = true)}
    >
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
          {/* <RoomLayout clippingPlane={plane} /> */}
          <RoomLayout />
        </Physics>
      </Suspense>
      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}





// function RoomLayout({clippingPlane}: ILayoutProps) {
function RoomLayout() {
  let portals: IPortalProps[] = [
    { id: 0, type: 'PanelHole', position: { x: -2.5, y: 1, z: 0 }, normal: { x: 0, y: 1, z: 0 } },
    { id: 1, type: 'PanelHole', position: { x: 0, y: 0, z: 0 }, normal: { x: 0, y: 1, z: 0 } },
    { id: 2, type: 'PanelHole', position: { x: 2.5, y: -1, z: 0 }, normal: { x: 0, y: 1, z: 0 } },
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  // const [allPlanesState, setAllPlanesState] = useState<THREE.Plane[]>([]);
  const [activePlanes, setActivePlanes] = useState<THREE.Plane[]>([]);
  const [clippingPlane, setClippingPlane] = useState<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  const [lastTarget, setLastTarget] = useState(-1);
  const [target, setTarget] = useState(0);
  const [curClip, setCurClip] = useState(0);
  const [teleport, setTeleport] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const [activeCube, setActiveCube] = useState<RapierRigidBody>();
  const [inactiveCube, setInactiveCube] = useState<RapierRigidBody>();
  
  const cubeARef = useRef<RapierRigidBody>(null);
  const cubeBRef = useRef<RapierRigidBody>(null);

  function updateClipping(index: number) {
    // console.log('====== changing clip for: ' + index + ' =====');
    // console.log('before: ', clippingPlane.constant);

    let portal = portals[index];
    let point = new THREE.Vector3(portal.position.x, portal.position.y, portal.position.z);
    let normal = new THREE.Vector3(portal.normal.x, portal.normal.y, portal.normal.z).normalize();
    let originPlane = new THREE.Plane(normal, 0);

    // console.table([point, normal]);
    // console.log(originPlane.distanceToPoint(point));

    // originPlane.set(normal, originPlane.distanceToPoint(point));
    // console.log('origin: ', originPlane);

    // clippingPlane.set(normal, originPlane.distanceToPoint(point));

    let newPlane = new THREE.Plane(normal, originPlane.distanceToPoint(point));
    // console.log("new plane", newPlane);
    setClippingPlane(newPlane);

    // let plane = clippingPlane;
    // plane.constant = originPlane.distanceToPoint(point);
    // plane.coplanarPoint(point);

    // clippingPlane.constant = originPlane.distanceToPoint(point);
    // clippingPlane.coplanarPoint(point);

    // console.log('after: ', clippingPlane.constant);
    // console.log(clippingPlane);
    // console.log();
    // console.log();
    // console.log();

    // console.log('=================================');
  }

  useEffect(() => {
    updateClipping(curClip);
  }, [curClip]);

  // i.e. Initialize
  useEffect(() => {
    if (isLoaded) return;
    console.log('Initializing...');
    updateClipping(2);

    if (cubeARef.current && cubeBRef.current) {
      setActiveCube(cubeARef.current);
      setInactiveCube(cubeBRef.current);
    }
    setIsLoaded(true);

  });

  // useEffect(() => {
  //   if (!isLoaded) return;
  //   if (allPlanes.length === portals.length) {
  //     console.log('All planes:', allPlanes);
  //     setIsLoaded(true);
  //   }
  // }, [allPlanes]);

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

      // Update clipping planes
      // updateClipping(target);

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
          <Cube name="coobA" planes={[clippingPlane]} isActive={activeCube === cubeARef.current} />
        </RigidBody>
      </group>

      <group position={[0, -10, 0]}>
        <RigidBody ref={cubeBRef} name="CubeB" type={"dynamic"}>
          <Cube name="coobB" planes={[clippingPlane]} isActive={activeCube === cubeBRef.current} />
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








function Cube({name, planes, isActive}: ICubeProps) {
  const { nodes, materials } = useGLTF('./models/thinking-with-portals.gltf')
  return (

      <group scale={[0.75, 0.75, 0.75]}>
      <mesh geometry={(nodes.Cube001 as THREE.Mesh).geometry} >
        <meshStandardMaterial
          // clippingPlanes={planes} 
          // clipShadows={true}
          color={"blue"}
          visible={isActive}
        />
      </mesh>
      <mesh geometry={(nodes.Cube001_1 as THREE.Mesh).geometry} >
        <meshStandardMaterial
          // clippingPlanes={planes} 
          // clipShadows={true}
          color={"white"}
          visible={isActive}
        />
      </mesh>
      <mesh geometry={(nodes.Cube001_2 as THREE.Mesh).geometry} >
        <meshStandardMaterial
          // clippingPlanes={planes} 
          // clipShadows={true}
          color={"grey"}
          visible={isActive}
        />
      </mesh>
    </group>

  );
}


function PlaneActivator({index, setCurClip}: IPlaneActivatorProps) {
  return (
    <group >
      {/* Activator */}
      <CuboidCollider
        args={[1, 0.02, 1]}
        name="Teleporter"
        sensor
        onIntersectionEnter={() => {
          setCurClip(index);
        }}
      />
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


// function Clipper ({ geo, planesOffset }: { geo: THREE.TorusKnotGeometry, planesOffset: number[] }) {
//   const planeGeo = useMemo(() => {
//     console.log('Created plane Geometry')
//     return new THREE.PlaneGeometry(4, 4)
//   }, [])

//   const planesGeoRef = useRef<Mesh[]>([]);

//   const planes = useMemo(() => {
//     const norm = 1
//     return [
//         new THREE.Plane(new THREE.Vector3(norm, 0, 0), 0),
//         new THREE.Plane(new THREE.Vector3(0, norm, 0), 0),
//         new THREE.Plane(new THREE.Vector3(0, 0, norm), 0)
//     ]
// }, [])

//   useEffect(() => {
//     console.log('Updating planes position/direction')
//     for (let i = 0; i < planesGeoRef.current.length; i++) {
//       const plane = planes[i]
//       const po = planesGeoRef.current[i]
//       plane.constant = planesOffset[i]
//       plane.coplanarPoint(po.position)
//       po.lookAt(po.position.x - plane.normal.x, po.position.y - plane.normal.y, po.position.z - plane.normal.z)

//       // let point = new THREE.Vector3(surface.position.x, surface.position.y, surface.position.z);
//       // let normal = new THREE.Vector3(surface.normal.x, surface.normal.y, surface.normal.z).normalize();

//       // // Compute the magnitude of the normal vector
//       // let magnitude = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);

//       // // Compute the distance from the origin to the plane along the normal vector
//       // let d = Math.abs(normal.x * point.x + normal.y * point.y + normal.z * point.z) / magnitude;

//       // let plane = new THREE.Plane(normal, d);
//     }
//   }, [planes, planesOffset])
//   return (
//     <group>
//       {planes.map((plane: THREE.Plane, index: number) => {
//         return (
//           <group key={index}>
//             {/* <PlaneStencilGroup geometry={geo} plane={plane} renderOrder={index + 1} /> */}
//             <mesh
//               geometry={planeGeo}
//               onAfterRender={(renderer: THREE.WebGLRenderer) => renderer.clearStencil()}
//               renderOrder={index + 1.1}
//               ref={(el: Mesh) => (planesGeoRef.current[index] = el)}>
//               <meshStandardMaterial
//                 attach="material"
//                 // {...MaterialSettings.planeMaterial}
//                 clippingPlanes={planes.filter((p: THREE.Plane) => p !== plane)}
//               />
//             </mesh>
//           </group>
//         )
//       })}
//       <mesh geometry={geo} castShadow={true}>
        
//         <meshStandardMaterial clippingPlanes={planes} 
//           clipShadows={true}
//           color={"0xff0000"}
//         // {...MaterialSettings.mainMaterial} 
//         />
//       </mesh>
//     </group>
//   )
// }






// function ClipPlanes() {
//     const { gl } = useThree();
//     useEffect(() => {
//       // Save previous defaults 
//       const { clippingPlanes, localClippingEnabled } = gl
//       const plane = new Plane(new Vector3(0, 1, 0), 0.8)
//       gl.clippingPlanes = [plane]
//       gl.localClippingEnabled = true

//       // Go back to defaults on unmount
//       // Object.assign(gl, { clippingPlanes, localClippingEnabled})
//       return () => {
//         gl.clippingPlanes = clippingPlanes;
//         gl.localClippingEnabled = localClippingEnabled;
//       };
//     }, [])
//     return null;
// }




// function Clipper() {
  
//   const vertexShader = `

//     #if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )
//       varying vec3 vViewPosition;
//     #endif

//     void main() {
//       #if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )
//         vViewPosition = - mvPosition.xyz;
//       #endif
    
//   }`;

//   const fragmentShader = `
//     #if NUM_CLIPPING_PLANES > 0

//       #if ! defined( PHYSICAL ) && ! defined( PHONG )
//         varying vec3 vViewPosition;
//       #endif

//       uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

//     #endif  

//     void main() {
//       #if NUM_CLIPPING_PLANES > 0

//         for ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {

//           vec4 plane = clippingPlanes[ i ];
//           if ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;

//         }
          
//         #if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

//           bool clipped = true;
//           for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {
//             vec4 plane = clippingPlanes[ i ];
//             clipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;
//           }

//           if ( clipped ) discard;
        
//         #endif

//       #endif
//   }`;

//   return (
//     <group position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
//       <mesh>
//         <planeGeometry args={[1.5, 1.8]} />
//         <meshStandardMaterial wireframe={true} />
//       </mesh>
//       <mesh>
//         <planeGeometry args={[1.5, 1.8]} />
//         <shaderMaterial 
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//           clipping={true}
//         />
//       </mesh>
//     </group>
//   );
// }




// function Cube2() {
//   const { nodes, materials } = useGLTF('./models/thinking-with-portals.gltf')
//   return (
//     <group>
//       <mesh>
//         <bufferGeometry attach="geometry" {...nodes.Cube001.geometry} />
//         <meshStandardMaterial attach="material" {...materials.Blue} clippingPlanes={[]}/>
//       </mesh>
//       <mesh>
//         <bufferGeometry attach="geometry" {...nodes.Cube001_1.geometry} />
//         <meshStandardMaterial attach="material" {...materials.White} clippingPlanes={[]}/>
//       </mesh>
//       <mesh>
//         <bufferGeometry attach="geometry" {...nodes.Cube001_2.geometry} />
//         <meshStandardMaterial attach="material" {...materials.Grey} clippingPlanes={[]}/>
//       </mesh>
//     </group>
//   );
// }


useGLTF.preload('./models/thinking-with-portals.gltf');
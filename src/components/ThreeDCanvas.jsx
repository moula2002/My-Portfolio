import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Line, Html } from "@react-three/drei";

// Sub-component: 3D React Atom Node
const ReactNode = ({ position }) => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Central Sphere */}
      <mesh>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.8} roughness={0.1} />
      </mesh>
      
      {/* Orbit 1 */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.65, 0.015, 8, 48]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
      </mesh>
      
      {/* Orbit 2 */}
      <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.65, 0.015, 8, 48]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
      </mesh>
      
      {/* Orbit 3 */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.65, 0.015, 8, 48]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
      </mesh>

      {/* Floating text tag as HTML badge */}
      <Html position={[0, 0.8, 0]} center distanceFactor={6}>
        <div className="px-2 py-0.5 rounded-md bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff] text-[10px] font-bold font-mono whitespace-nowrap shadow-[0_0_8px_rgba(0,243,255,0.2)] select-none">
          React.js
        </div>
      </Html>
    </group>
  );
};

// Sub-component: 3D MongoDB Stack Node
const MongoNode = ({ position }) => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.cos(t * 1.2) * 0.08;
  });

  const stackMaterial = (
    <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
  );

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Stack Cylinder 1 */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
        {stackMaterial}
      </mesh>
      {/* Stack Cylinder 2 */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
        {stackMaterial}
      </mesh>
      {/* Stack Cylinder 3 */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
        {stackMaterial}
      </mesh>

      {/* Floating text tag as HTML badge */}
      <Html position={[0, 0.8, 0]} center distanceFactor={6}>
        <div className="px-2 py-0.5 rounded-md bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-[10px] font-bold font-mono whitespace-nowrap shadow-[0_0_8px_rgba(16,185,129,0.2)] select-none">
          MongoDB
        </div>
      </Html>
    </group>
  );
};

// Sub-component: 3D Node.js Node with satellites
const NodeJsNode = ({ position }) => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 1.0) * 0.08;
    groupRef.current.rotation.y = t * 0.4;
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Central Node */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.7} roughness={0.1} />
      </mesh>
      
      {/* Satellite 1 */}
      <mesh position={[0.4, 0.2, 0.1]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#4ade80" />
      </mesh>
      
      {/* Satellite 2 */}
      <mesh position={[-0.3, -0.3, -0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#4ade80" />
      </mesh>

      {/* Connection link to satellite */}
      <Line points={[[0, 0, 0], [0.4, 0.2, 0.1]]} color="#4ade80" lineWidth={0.8} transparent opacity={0.5} />
      <Line points={[[0, 0, 0], [-0.3, -0.3, -0.2]]} color="#4ade80" lineWidth={0.8} transparent opacity={0.5} />

      {/* Floating text tag as HTML badge */}
      <Html position={[0, 0.8, 0]} center distanceFactor={6}>
        <div className="px-2 py-0.5 rounded-md bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-[10px] font-bold font-mono whitespace-nowrap shadow-[0_0_8px_rgba(34,197,94,0.2)] select-none">
          Node.js
        </div>
      </Html>
    </group>
  );
};

// Sub-component: 3D Express.js Node
const ExpressNode = ({ position }) => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.cos(t * 1.4) * 0.09;
    groupRef.current.rotation.x = t * 0.5;
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      <mesh>
        <dodecahedronGeometry args={[0.2]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.6} roughness={0.2} />
      </mesh>
      
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.38, 0.012, 8, 32]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.6} />
      </mesh>

      {/* Floating text tag as HTML badge */}
      <Html position={[0, 0.8, 0]} center distanceFactor={6}>
        <div className="px-2 py-0.5 rounded-md bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ec4899] text-[10px] font-bold font-mono whitespace-nowrap shadow-[0_0_8px_rgba(236,72,153,0.2)] select-none">
          Express.js
        </div>
      </Html>
    </group>
  );
};

// Floating Code snippets particles as HTML badges
const FloatingText = ({ text, position, speed, range }) => {
  const labelRef = useRef(null);

  useFrame((state) => {
    if (!labelRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    labelRef.current.position.y = position[1] + Math.sin(t) * range;
  });

  return (
    <group ref={labelRef} position={position}>
      <Html center distanceFactor={6}>
        <div className="text-[#a78bfa]/50 font-mono text-[9px] sm:text-[10px] whitespace-nowrap select-none bg-[#a78bfa]/5 px-2 py-0.5 rounded border border-[#a78bfa]/15 shadow-xs">
          {text}
        </div>
      </Html>
    </group>
  );
};

// Main constellation coordinator
const MernConstellation = ({ isMobile }) => {
  const constellationRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Positions of main MERN nodes inside the group
  const reactPos = [0, 1.2, 0];
  const mongoPos = [1.5, -0.6, 0.2];
  const nodePos = [-1.5, -0.6, -0.2];
  const expressPos = [0, -1.8, 0];

  // Scroll mapping path (translates group position/scale from section to section)
  const xCoords = isMobile 
    ? [0, 0, 0, 0, 0, 0] 
    : [0, 2.0, -2.0, 1.8, -1.5, 0];

  const yCoords = isMobile
    ? [0.2, -0.6, 0.6, -0.2, 0.4, 0.2]
    : [0.2, -0.2, 0.3, 0.2, -0.4, 0.2];

  const zCoords = isMobile
    ? [-1.8, -2.6, -2.8, -2.4, -2.0, -1.8]
    : [0, -0.8, -1.0, -0.6, -0.8, 0];

  const scales = isMobile
    ? [0.9, 0.7, 0.65, 0.7, 0.65, 0.9]
    : [1.3, 1.1, 0.95, 1.1, 0.9, 1.2];

  const scrollSteps = [0, 0.22, 0.42, 0.65, 0.82, 1.0];

  const rawX = useTransform(scrollYProgress, scrollSteps, xCoords);
  const rawY = useTransform(scrollYProgress, scrollSteps, yCoords);
  const rawZ = useTransform(scrollYProgress, scrollSteps, zCoords);
  const rawScale = useTransform(scrollYProgress, scrollSteps, scales);

  // Auto spin
  const rawRx = useTransform(scrollYProgress, scrollSteps, [0, 0.8, 1.6, 2.4, 3.2, 6.28]);
  const rawRy = useTransform(scrollYProgress, scrollSteps, [0, 1.2, 2.4, 1.0, 2.0, 6.28]);

  const springConfig = { stiffness: 50, damping: 20, mass: 1 };
  
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springZ = useSpring(rawZ, springConfig);
  const springScale = useSpring(rawScale, springConfig);
  
  const springRx = useSpring(rawRx, springConfig);
  const springRy = useSpring(rawRy, springConfig);

  useFrame((state) => {
    if (!constellationRef.current) return;

    const t = state.clock.getElapsedTime();
    const autoRotateY = t * 0.08;

    // Read spring values safely to avoid NaN-corruption crashes in ThreeJS matrix calculations
    const x = springX.get();
    const y = springY.get();
    const z = springZ.get();
    const rx = springRx.get();
    const ry = springRy.get();
    const scaleVal = springScale.get();

    // Check if values are valid numbers
    const validX = (typeof x === "number" && !isNaN(x)) ? x : 0;
    const validY = (typeof y === "number" && !isNaN(y)) ? y : 0;
    const validZ = (typeof z === "number" && !isNaN(z)) ? z : 0;
    const validRx = (typeof rx === "number" && !isNaN(rx)) ? rx : 0;
    const validRy = (typeof ry === "number" && !isNaN(ry)) ? ry : 0;
    const validScale = (typeof scaleVal === "number" && !isNaN(scaleVal)) ? scaleVal : 1;

    // Apply scroll springs (removed mouse parallax)
    constellationRef.current.position.x = validX;
    constellationRef.current.position.y = validY;
    constellationRef.current.position.z = validZ;

    constellationRef.current.rotation.x = validRx;
    constellationRef.current.rotation.y = validRy + autoRotateY;

    constellationRef.current.scale.setScalar(validScale);
  });

  return (
    <group ref={constellationRef}>
      {/* 3D Nodes */}
      <ReactNode position={reactPos} />
      <MongoNode position={mongoPos} />
      <NodeJsNode position={nodePos} />
      <ExpressNode position={expressPos} />

      {/* Constellation Link Lines representing network routes / API calls */}
      <Line points={[reactPos, mongoPos]} color="#00f3ff" lineWidth={1} transparent opacity={0.3} />
      <Line points={[reactPos, nodePos]} color="#00f3ff" lineWidth={1} transparent opacity={0.3} />
      <Line points={[nodePos, expressPos]} color="#22c55e" lineWidth={1} transparent opacity={0.3} />
      <Line points={[mongoPos, expressPos]} color="#10b981" lineWidth={1} transparent opacity={0.3} />
      <Line points={[reactPos, expressPos]} color="#a78bfa" lineWidth={0.7} dashed dashScale={1.5} transparent opacity={0.25} />
      <Line points={[nodePos, mongoPos]} color="#a78bfa" lineWidth={0.7} dashed dashScale={1.5} transparent opacity={0.25} />

      {/* Ambient Data Packets */}
      <mesh position={[0.7, 0.3, 0.1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#00f3ff" />
      </mesh>
      <mesh position={[-0.8, 0.4, -0.2]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <mesh position={[0.4, -1.2, 0.3]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
      <mesh position={[-0.5, -1.1, -0.3]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Floating API / Code Labels */}
      <FloatingText text="GET /api/projects" position={[-2.2, 0.5, 0.5]} speed={0.9} range={0.15} />
      <FloatingText text="POST /api/contact" position={[2.2, 0.5, -0.5]} speed={0.7} range={0.2} />
      <FloatingText text="mongoose.connect()" position={[2.0, -1.5, 0.3]} speed={0.8} range={0.12} />
      <FloatingText text="express.Router()" position={[-1.9, -1.6, -0.3]} speed={0.6} range={0.18} />
      <FloatingText text="useState()" position={[-0.8, 1.9, 0.4]} speed={1.1} range={0.15} />
      <FloatingText text="useEffect()" position={[0.8, 1.9, -0.4]} speed={1.0} range={0.1} />
      <FloatingText text="STATUS: 200 OK" position={[0, -2.6, 0.2]} speed={0.5} range={0.1} />
    </group>
  );
};

export const ThreeDCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Lights setup to accent the neon nodes */}
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#00f3ff" />
        <directionalLight position={[-5, -8, 5]} intensity={1.2} color="#ec4899" />
        <pointLight position={[0, 4, -3]} intensity={2.0} color="#10b981" />
        <pointLight position={[0, -4, 3]} intensity={2.0} color="#8b5cf6" />
        
        {/* MERN Constellation */}
        <MernConstellation isMobile={isMobile} />
      </Canvas>
    </div>
  );
};


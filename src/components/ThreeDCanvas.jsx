import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Line, Html, Sparkles, Grid } from "@react-three/drei";
import { DoubleSide } from "three";


// Sub-component: 3D React Atom Node
const ReactNode = ({ position, isDark, isMobile }) => {
  const groupRef = useRef(null);
  const electron1Ref = useRef(null);
  const electron2Ref = useRef(null);
  const electron3Ref = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Subtle float
    groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.1;
    
    // Electron orbits
    const r = isMobile ? 0.45 : 0.65;
    if (electron1Ref.current) {
      const theta = t * 2.2;
      electron1Ref.current.position.set(r * Math.cos(theta), r * Math.sin(theta), 0);
    }
    if (electron2Ref.current) {
      const theta = t * 2.6 + 1.2;
      electron2Ref.current.position.set(r * Math.cos(theta), r * Math.sin(theta), 0);
    }
    if (electron3Ref.current) {
      const theta = t * 1.8 + 2.4;
      electron3Ref.current.position.set(r * Math.cos(theta), r * Math.sin(theta), 0);
    }
  });

  const themeColor = isDark ? "#00f3ff" : "#0891b2";
  const ringMaterial = (
    <meshBasicMaterial color={themeColor} transparent opacity={0.4} />
  );
  
  const electronMaterial = (
    <meshBasicMaterial color={themeColor} toneMapped={false} />
  );

  const ringRadius = isMobile ? 0.45 : 0.65;
  const ringTube = isMobile ? 0.007 : 0.01;
  const coreRadius = isMobile ? 0.18 : 0.26;
  const electronRadius = isMobile ? 0.03 : 0.045;

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Central Sphere Core */}
      <mesh>
        <sphereGeometry args={[coreRadius, 32, 32]} />
        <meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={isDark ? 0.8 : 0.2} roughness={0.1} />
      </mesh>
      
      {/* Orbit 1 */}
      <group rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[ringRadius, ringTube, 8, 48]} />
          {ringMaterial}
        </mesh>
        <mesh ref={electron1Ref}>
          <sphereGeometry args={[electronRadius, 12, 12]} />
          {electronMaterial}
        </mesh>
      </group>
      
      {/* Orbit 2 */}
      <group rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[ringRadius, ringTube, 8, 48]} />
          {ringMaterial}
        </mesh>
        <mesh ref={electron2Ref}>
          <sphereGeometry args={[electronRadius, 12, 12]} />
          {electronMaterial}
        </mesh>
      </group>
      
      {/* Orbit 3 */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <torusGeometry args={[ringRadius, ringTube, 8, 48]} />
          {ringMaterial}
        </mesh>
        <mesh ref={electron3Ref}>
          <sphereGeometry args={[electronRadius, 12, 12]} />
          {electronMaterial}
        </mesh>
      </group>

      {/* Floating text tag as HTML badge */}
      <Html position={[0, isMobile ? 0.55 : 0.8, 0]} center distanceFactor={6}>
        <div className={`px-2 py-0.5 rounded-sm border font-bold font-mono text-[9px] sm:text-[10px] whitespace-nowrap select-none backdrop-blur-xs transition-all duration-300 ${
          isDark 
            ? "bg-[#00f3ff]/15 border-l-2 border-l-[#00f3ff] border-y border-r border-[#00f3ff]/30 text-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.15)]"
            : "bg-cyan-50/90 border-l-2 border-l-cyan-600 border-y border-r border-cyan-200 text-cyan-800 shadow-sm"
        }`}>
          [ React.js ]
        </div>
      </Html>
    </group>
  );
};

// Sub-component: 3D MongoDB Stack Node
const MongoNode = ({ position, isDark, isMobile }) => {
  const groupRef = useRef(null);
  const scannerRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.cos(t * 1.2) * 0.08;
    
    if (scannerRef.current) {
      const bound = isMobile ? 0.15 : 0.22;
      scannerRef.current.position.y = Math.sin(t * 2.5) * bound + (isMobile ? 0.05 : 0.08);
    }
  });

  const themeColor = isDark ? "#10b981" : "#047857";
  const scannerColor = isDark ? "#34d399" : "#059669";

  const outerMaterial = (
    <meshStandardMaterial color={themeColor} transparent opacity={0.25} wireframe />
  );
  const innerMaterial = (
    <meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={isDark ? 0.8 : 0.2} roughness={0.2} />
  );

  const radius = isMobile ? 0.15 : 0.22;
  const height = isMobile ? 0.05 : 0.08;
  const laserHeight = isMobile ? 0.45 : 0.7;

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Central Laser Beam Core */}
      <mesh position={[0, isMobile ? 0.05 : 0.08, 0]}>
        <cylinderGeometry args={[0.015, 0.015, laserHeight, 8]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.6} />
      </mesh>

      {/* Database Stack Ring 1 */}
      <group position={[0, isMobile ? 0.16 : 0.25, 0]}>
        <mesh>
          <cylinderGeometry args={[radius, radius, height, 16]} />
          {outerMaterial}
        </mesh>
        <mesh scale={[0.8, 0.9, 0.8]}>
          <cylinderGeometry args={[radius, radius, height, 16]} />
          {innerMaterial}
        </mesh>
      </group>

      {/* Database Stack Ring 2 */}
      <group position={[0, isMobile ? 0.05 : 0.08, 0]}>
        <mesh>
          <cylinderGeometry args={[radius, radius, height, 16]} />
          {outerMaterial}
        </mesh>
        <mesh scale={[0.8, 0.9, 0.8]}>
          <cylinderGeometry args={[radius, radius, height, 16]} />
          {innerMaterial}
        </mesh>
      </group>

      {/* Database Stack Ring 3 */}
      <group position={[0, isMobile ? -0.06 : -0.09, 0]}>
        <mesh>
          <cylinderGeometry args={[radius, radius, height, 16]} />
          {outerMaterial}
        </mesh>
        <mesh scale={[0.8, 0.9, 0.8]}>
          <cylinderGeometry args={[radius, radius, height, 16]} />
          {innerMaterial}
        </mesh>
      </group>

      {/* Moving Scanning Band */}
      <mesh ref={scannerRef}>
        <torusGeometry args={[radius + 0.03, isMobile ? 0.008 : 0.012, 8, 24]} />
        <meshBasicMaterial color={scannerColor} toneMapped={false} />
      </mesh>

      {/* Floating text tag as HTML badge */}
      <Html position={[0, isMobile ? 0.55 : 0.8, 0]} center distanceFactor={6}>
        <div className={`px-2 py-0.5 rounded-sm border font-bold font-mono text-[9px] sm:text-[10px] whitespace-nowrap select-none backdrop-blur-xs transition-all duration-300 ${
          isDark 
            ? "bg-[#10b981]/15 border-l-2 border-l-[#10b981] border-y border-r border-[#10b981]/30 text-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.15)]"
            : "bg-emerald-50/90 border-l-2 border-l-emerald-600 border-y border-r border-emerald-200 text-emerald-800 shadow-sm"
        }`}>
          [ MongoDB ]
        </div>
      </Html>
    </group>
  );
};

// Sub-component: 3D Node.js Node with satellites
const NodeJsNode = ({ position, isDark, isMobile }) => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 1.0) * 0.08;
    groupRef.current.rotation.y = t * 0.4;
  });

  const themeColor = isDark ? "#22c55e" : "#15803d";
  const satColor = isDark ? "#4ade80" : "#22c55e";

  const coreRadius = isMobile ? 0.14 : 0.2;
  const sat1Radius = isMobile ? 0.04 : 0.06;
  const sat2Radius = isMobile ? 0.035 : 0.05;
  
  const sat1Pos = isMobile ? [0.3, 0.15, 0.07] : [0.45, 0.2, 0.1];
  const sat2Pos = isMobile ? [-0.25, -0.2, -0.15] : [-0.35, -0.3, -0.2];
  const sat3Pos = isMobile ? [0.07, -0.25, 0.25] : [0.1, -0.4, 0.35];

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Central Node Core */}
      <mesh>
        <sphereGeometry args={[coreRadius, 16, 16]} />
        <meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={isDark ? 0.7 : 0.2} roughness={0.1} />
      </mesh>
      
      {/* Satellite 1 */}
      <mesh position={sat1Pos}>
        <sphereGeometry args={[sat1Radius, 8, 8]} />
        <meshStandardMaterial color={satColor} emissive={satColor} emissiveIntensity={isDark ? 0.5 : 0.1} />
      </mesh>
      
      {/* Satellite 2 */}
      <mesh position={sat2Pos}>
        <sphereGeometry args={[sat2Radius, 8, 8]} />
        <meshStandardMaterial color={satColor} emissive={satColor} emissiveIntensity={isDark ? 0.5 : 0.1} />
      </mesh>

      {/* Satellite 3 */}
      <mesh position={sat3Pos}>
        <sphereGeometry args={[sat2Radius, 8, 8]} />
        <meshStandardMaterial color={satColor} emissive={satColor} emissiveIntensity={isDark ? 0.5 : 0.1} />
      </mesh>

      {/* Connection link to satellite */}
      <Line points={[[0, 0, 0], sat1Pos]} color={satColor} lineWidth={0.8} transparent opacity={0.4} />
      <Line points={[[0, 0, 0], sat2Pos]} color={satColor} lineWidth={0.8} transparent opacity={0.4} />
      <Line points={[[0, 0, 0], sat3Pos]} color={satColor} lineWidth={0.8} transparent opacity={0.4} />

      {/* Floating text tag as HTML badge */}
      <Html position={[0, isMobile ? 0.55 : 0.8, 0]} center distanceFactor={6}>
        <div className={`px-2 py-0.5 rounded-sm border font-bold font-mono text-[9px] sm:text-[10px] whitespace-nowrap select-none backdrop-blur-xs transition-all duration-300 ${
          isDark 
            ? "bg-[#22c55e]/15 border-l-2 border-l-[#22c55e] border-y border-r border-[#22c55e]/30 text-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.15)]"
            : "bg-green-50/90 border-l-2 border-l-green-600 border-y border-r border-green-200 text-green-800 shadow-sm"
        }`}>
          [ Node.js ]
        </div>
      </Html>
    </group>
  );
};

// Sub-component: 3D Express.js Node
const ExpressNode = ({ position, isDark, isMobile }) => {
  const groupRef = useRef(null);
  const coreRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.cos(t * 1.4) * 0.09;
    groupRef.current.rotation.x = t * 0.5;
    
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(t * 4.0) * 0.15;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  const themeColor = isDark ? "#ec4899" : "#be185d";

  const size = isMobile ? 0.15 : 0.22;
  const coreRadius = isMobile ? 0.06 : 0.09;
  const ringRadius = isMobile ? 0.25 : 0.38;

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Wireframe dodecahedron container */}
      <mesh>
        <dodecahedronGeometry args={[size]} />
        <meshStandardMaterial color={themeColor} transparent opacity={0.35} wireframe />
      </mesh>
      
      {/* Pulsing Solid Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[coreRadius, 16, 16]} />
        <meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={isDark ? 0.8 : 0.2} roughness={0.1} />
      </mesh>
      
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[ringRadius, isMobile ? 0.008 : 0.012, 8, 32]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.5} />
      </mesh>

      {/* Floating text tag as HTML badge */}
      <Html position={[0, isMobile ? 0.55 : 0.8, 0]} center distanceFactor={6}>
        <div className={`px-2 py-0.5 rounded-sm border font-bold font-mono text-[9px] sm:text-[10px] whitespace-nowrap select-none backdrop-blur-xs transition-all duration-300 ${
          isDark 
            ? "bg-[#ec4899]/15 border-l-2 border-l-[#ec4899] border-y border-r border-[#ec4899]/30 text-[#ec4899] shadow-[0_0_10px_rgba(236,72,153,0.15)]"
            : "bg-pink-50/90 border-l-2 border-l-pink-600 border-y border-r border-pink-200 text-pink-800 shadow-sm"
        }`}>
          [ Express.js ]
        </div>
      </Html>
    </group>
  );
};

// Floating Code snippets particles as HTML badges
const FloatingText = ({ text, position, isDark, isMobile, speed, range }) => {
  const labelRef = useRef(null);

  useFrame((state) => {
    if (!labelRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    labelRef.current.position.y = position[1] + Math.sin(t) * range;
  });

  return (
    <group ref={labelRef} position={position}>
      <Html center distanceFactor={6}>
        <div className={`font-mono text-[8px] sm:text-[9px] whitespace-nowrap select-none px-2 py-0.5 rounded border transition-colors duration-300 ${
          isDark 
            ? "text-[#a78bfa]/50 bg-[#a78bfa]/5 border-[#a78bfa]/15 shadow-xs"
            : "text-violet-700/60 bg-violet-50/50 border-violet-100 shadow-xs"
        }`}>
          {text}
        </div>
      </Html>
    </group>
  );
};

// DataPacket component to animate glowing request packet flowing along lines
const DataPacket = ({ start, end, isMobile, speed = 1.0, color = "#00f3ff", delay = 0 }) => {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = (state.clock.getElapsedTime() * speed + delay) % 1.0;
    
    // Linear interpolation
    meshRef.current.position.x = start[0] + (end[0] - start[0]) * t;
    meshRef.current.position.y = start[1] + (end[1] - start[1]) * t;
    meshRef.current.position.z = start[2] + (end[2] - start[2]) * t;
  });

  const radius = isMobile ? 0.022 : 0.035;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};

// Main constellation coordinator
const MernConstellation = ({ isMobile, isDark }) => {
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

    // Apply scroll springs (completely non-interactive)
    constellationRef.current.position.x = validX;
    constellationRef.current.position.y = validY;
    constellationRef.current.position.z = validZ;

    constellationRef.current.rotation.x = validRx;
    constellationRef.current.rotation.y = validRy + autoRotateY;

    constellationRef.current.scale.setScalar(validScale);
  });

  const lineColor = isDark ? "#a78bfa" : "#7c3aed";
  const neonLineColor = isDark ? "#00f3ff" : "#0891b2";

  return (
    <group ref={constellationRef}>
      {/* 3D Nodes */}
      <ReactNode position={reactPos} isDark={isDark} isMobile={isMobile} />
      <MongoNode position={mongoPos} isDark={isDark} isMobile={isMobile} />
      <NodeJsNode position={nodePos} isDark={isDark} isMobile={isMobile} />
      <ExpressNode position={expressPos} isDark={isDark} isMobile={isMobile} />


      {/* Constellation Link Lines representing network routes / API calls */}
      <Line points={[reactPos, mongoPos]} color={neonLineColor} lineWidth={1} transparent opacity={0.3} />
      <Line points={[reactPos, nodePos]} color={neonLineColor} lineWidth={1} transparent opacity={0.3} />
      <Line points={[nodePos, expressPos]} color={isDark ? "#22c55e" : "#15803d"} lineWidth={1} transparent opacity={0.3} />
      <Line points={[mongoPos, expressPos]} color={isDark ? "#10b981" : "#047857"} lineWidth={1} transparent opacity={0.3} />
      <Line points={[reactPos, expressPos]} color={lineColor} lineWidth={0.7} dashed dashScale={1.5} transparent opacity={0.25} />
      <Line points={[nodePos, mongoPos]} color={lineColor} lineWidth={0.7} dashed dashScale={1.5} transparent opacity={0.25} />

      {/* Moving API and DB Flow Data Packets along the lines */}
      <DataPacket start={reactPos} end={mongoPos} isMobile={isMobile} speed={0.4} color={isDark ? "#00f3ff" : "#0891b2"} delay={0} />
      <DataPacket start={reactPos} end={mongoPos} isMobile={isMobile} speed={0.4} color={isDark ? "#10b981" : "#047857"} delay={0.5} />
      
      <DataPacket start={reactPos} end={nodePos} isMobile={isMobile} speed={0.5} color={isDark ? "#00f3ff" : "#0891b2"} delay={0} />
      <DataPacket start={reactPos} end={nodePos} isMobile={isMobile} speed={0.5} color={isDark ? "#22c55e" : "#15803d"} delay={0.5} />
      
      <DataPacket start={nodePos} end={expressPos} isMobile={isMobile} speed={0.45} color={isDark ? "#22c55e" : "#15803d"} delay={0} />
      <DataPacket start={nodePos} end={expressPos} isMobile={isMobile} speed={0.45} color={isDark ? "#ec4899" : "#be185d"} delay={0.5} />
      
      <DataPacket start={mongoPos} end={expressPos} isMobile={isMobile} speed={0.35} color={isDark ? "#10b981" : "#047857"} delay={0} />
      <DataPacket start={mongoPos} end={expressPos} isMobile={isMobile} speed={0.35} color={isDark ? "#ec4899" : "#be185d"} delay={0.5} />

      {/* Ambient Data Packets */}
      <mesh position={[0.7, 0.3, 0.1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={isDark ? "#00f3ff" : "#0891b2"} />
      </mesh>
      <mesh position={[-0.8, 0.4, -0.2]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={isDark ? "#22c55e" : "#15803d"} />
      </mesh>
      <mesh position={[0.4, -1.2, 0.3]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={isDark ? "#ec4899" : "#be185d"} />
      </mesh>
      <mesh position={[-0.5, -1.1, -0.3]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={isDark ? "#10b981" : "#047857"} />
      </mesh>

      {/* Floating API / Code Labels */}
      <FloatingText text="GET /api/projects" position={[-2.2, 0.5, 0.5]} isDark={isDark} isMobile={isMobile} speed={0.9} range={0.15} />
      <FloatingText text="POST /api/contact" position={[2.2, 0.5, -0.5]} isDark={isDark} isMobile={isMobile} speed={0.7} range={0.2} />
      <FloatingText text="mongoose.connect()" position={[2.0, -1.5, 0.3]} isDark={isDark} isMobile={isMobile} speed={0.8} range={0.12} />
      <FloatingText text="express.Router()" position={[-1.9, -1.6, -0.3]} isDark={isDark} isMobile={isMobile} speed={0.6} range={0.18} />
      <FloatingText text="useState()" position={[-0.8, 1.9, 0.4]} isDark={isDark} isMobile={isMobile} speed={1.1} range={0.15} />
      <FloatingText text="useEffect()" position={[0.8, 1.9, -0.4]} isDark={isDark} isMobile={isMobile} speed={1.0} range={0.1} />
      <FloatingText text="STATUS: 200 OK" position={[0, -2.6, 0.2]} isDark={isDark} isMobile={isMobile} speed={0.5} range={0.1} />
    </group>
  );
};

export const ThreeDCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Check initial dark mode state
    setIsDark(document.documentElement.classList.contains("dark"));

    // Observe changes to document classList to toggle dark/light variables
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  // Theme-based values
  const gridCellColor = isDark ? "#1e1b4b" : "#e2e8f0";
  const gridSectionColor = isDark ? "#312e81" : "#cbd5e1";
  
  // Sparsely render sparkles on light mode for better contrast/minimalism
  const sparklesCount = isMobile ? 15 : (isDark ? 30 : 15);
  const sparklesOpacity = isDark ? 0.45 : 0.15;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isDark ? 0.4 : 0.65} />
        
        {/* Lights setup to accent the neon nodes */}
        <directionalLight position={[5, 8, 5]} intensity={isDark ? 1.5 : 1.0} color={isDark ? "#00f3ff" : "#ffffff"} />
        <directionalLight position={[-5, -8, 5]} intensity={isDark ? 1.2 : 0.8} color={isDark ? "#ec4899" : "#e0e7ff"} />
        <pointLight position={[0, 4, -3]} intensity={isDark ? 2.0 : 1.0} color="#10b981" />
        <pointLight position={[0, -4, 3]} intensity={isDark ? 2.0 : 1.0} color="#8b5cf6" />
        
        {/* Tech Grid helper for coordinate layout blueprint feel */}
        <Grid 
          position={[0, -3.5, -2]} 
          args={isMobile ? [15, 15] : [30, 30]} 
          cellSize={0.6} 
          cellThickness={0.5} 
          cellColor={gridCellColor} 
          sectionSize={3} 
          sectionThickness={1.0} 
          sectionColor={gridSectionColor} 
          fadeDistance={20} 
          infiniteGrid 
        />

        {/* Ambient drift neon dust sparkles (cyan, green, pink/magenta) */}
        <Sparkles count={sparklesCount} scale={isMobile ? 5 : 8} size={2.2} speed={0.4} color="#00f3ff" opacity={sparklesOpacity} />
        <Sparkles count={sparklesCount} scale={isMobile ? 5 : 8} size={2.2} speed={0.3} color="#10b981" opacity={sparklesOpacity} />
        <Sparkles count={sparklesCount} scale={isMobile ? 5 : 8} size={2.2} speed={0.5} color="#ec4899" opacity={sparklesOpacity} />
        
        {/* MERN Constellation */}
        <MernConstellation isMobile={isMobile} isDark={isDark} />
      </Canvas>
    </div>
  );
};

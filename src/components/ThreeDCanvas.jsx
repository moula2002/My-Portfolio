import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { Line, Text } from "@react-three/drei";

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

      {/* Floating text tag */}
      <Text 
        position={[0, 0.9, 0]} 
        fontSize={0.14} 
        color="#00f3ff" 
        material-transparent={true} 
        material-opacity={0.8}
      >
        React.js
      </Text>
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

      {/* Floating text tag */}
      <Text 
        position={[0, 0.9, 0]} 
        fontSize={0.14} 
        color="#10b981" 
        material-transparent={true} 
        material-opacity={0.8}
      >
        MongoDB
      </Text>
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

      {/* Floating text tag */}
      <Text 
        position={[0, 0.9, 0]} 
        fontSize={0.14} 
        color="#22c55e" 
        material-transparent={true} 
        material-opacity={0.8}
      >
        Node.js
      </Text>
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

      {/* Floating text tag */}
      <Text 
        position={[0, 0.9, 0]} 
        fontSize={0.14} 
        color="#ec4899" 
        material-transparent={true} 
        material-opacity={0.8}
      >
        Express.js
      </Text>
    </group>
  );
};

// Floating Code snippets particles
const FloatingText = ({ text, position, speed, range }) => {
  const textRef = useRef(null);

  useFrame((state) => {
    if (!textRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    textRef.current.position.y = position[1] + Math.sin(t) * range;
    textRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.12}
      color="#a78bfa"
      material-transparent={true}
      material-opacity={0.4}
    >
      {text}
    </Text>
  );
};

// Main constellation coordinator
const MernConstellation = ({ isMobile }) => {
  const constellationRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Mouse tracking parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

    // Apply scroll springs + mouse parallax
    constellationRef.current.position.x = springX.get() + (mouse.x * 0.4);
    constellationRef.current.position.y = springY.get() - (mouse.y * 0.4);
    constellationRef.current.position.z = springZ.get();

    constellationRef.current.rotation.x = springRx.get();
    constellationRef.current.rotation.y = springRy.get() + autoRotateY;

    constellationRef.current.scale.setScalar(springScale.get());
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

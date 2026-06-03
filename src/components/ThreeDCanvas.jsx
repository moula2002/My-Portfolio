import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { MeshDistortMaterial } from "@react-three/drei";

// The 3D Object Component inside the Three.js Canvas context
const FloatingModel = ({ isMobile }) => {
  const meshRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Mouse tracking state for parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to [-0.5, 0.5]
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Define scroll-linked translations and scales depending on screen layout
  // Desktop has side-floating states, mobile keeps it centered to avoid clipping text
  const xCoords = isMobile 
    ? [0, 0, 0, 0, 0, 0] // Centered on mobile
    : [0, 2.2, -2.2, 2.0, -1.8, 0]; // Alternating sides on desktop

  const yCoords = isMobile
    ? [0, -1.0, 1.0, -0.5, 0.5, 0] // Vertical shifting on mobile
    : [0, -0.4, 0.5, 0.4, -0.6, 0.8]; // Fine-tuned desktop heights

  const zCoords = isMobile
    ? [-1.5, -2.5, -3.0, -2.5, -2.0, -1.5] // Deeper on mobile
    : [0, -0.8, -1.2, -0.6, -0.8, 0];

  const scales = isMobile
    ? [1.0, 0.8, 0.7, 0.8, 0.7, 1.0] // Slightly smaller on mobile
    : [1.6, 1.3, 1.1, 1.3, 1.0, 1.5]; // Premium sizes on desktop

  // Scroll mapping
  const scrollSteps = [0, 0.22, 0.42, 0.65, 0.82, 1.0];

  // Base motion variables from scroll
  const rawX = useTransform(scrollYProgress, scrollSteps, xCoords);
  const rawY = useTransform(scrollYProgress, scrollSteps, yCoords);
  const rawZ = useTransform(scrollYProgress, scrollSteps, zCoords);
  const rawScale = useTransform(scrollYProgress, scrollSteps, scales);

  // Rotation values (spin the shape on scroll)
  const rawRx = useTransform(scrollYProgress, scrollSteps, [0, 1.5, 3.1, 4.5, 5.8, 6.28]);
  const rawRy = useTransform(scrollYProgress, scrollSteps, [0, 2.5, 4.0, 1.8, 3.5, 6.28]);
  const rawRz = useTransform(scrollYProgress, scrollSteps, [0, 0.8, 2.0, -1.0, 0.5, 0]);

  // Spring physics settings to damp and smooth the movement (stiffness/damping)
  const springConfig = { stiffness: 60, damping: 22, mass: 1 };
  
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springZ = useSpring(rawZ, springConfig);
  const springScale = useSpring(rawScale, springConfig);
  
  const springRx = useSpring(rawRx, springConfig);
  const springRy = useSpring(rawRy, springConfig);
  const springRz = useSpring(rawRz, springConfig);

  // Animation render loop (runs 60fps or max refresh rate)
  useFrame((state) => {
    if (!meshRef.current) return;

    // Apply auto-rotation as a baseline
    const elapsedTime = state.clock.getElapsedTime();
    const autoRotateX = elapsedTime * 0.15;
    const autoRotateY = elapsedTime * 0.2;

    // Smoothly apply scroll coordinates and mouse parallax offsets
    meshRef.current.position.x = springX.get() + (mouse.x * 0.5);
    meshRef.current.position.y = springY.get() - (mouse.y * 0.5);
    meshRef.current.position.z = springZ.get();

    meshRef.current.rotation.x = springRx.get() + autoRotateX;
    meshRef.current.rotation.y = springRy.get() + autoRotateY;
    meshRef.current.rotation.z = springRz.get();

    meshRef.current.scale.setScalar(springScale.get());
  });

  return (
    <mesh ref={meshRef}>
      {/* High density torus knot geometry for premium quality */}
      <torusKnotGeometry args={[1, 0.35, 128, 16]} />
      {/* Glossy, reflective glass/metallic hybrid material that wobbles subtly */}
      <MeshDistortMaterial
        color="#8b5cf6"
        clearcoat={1}
        clearcoatRoughness={0.15}
        metalness={0.9}
        roughness={0.2}
        distortion={0.3}
        speed={1.5}
      />
    </mesh>
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
        {/* Lights setup to create premium reflections */}
        <ambientLight intensity={0.4} />
        
        {/* Main highlight light */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ec4899" />
        
        {/* Backlight / Accent glow light */}
        <pointLight position={[-5, 5, -5]} intensity={2.0} color="#3b82f6" />
        
        {/* Center glowing light inside the canvas */}
        <pointLight position={[0, -2, 2]} intensity={1.5} color="#8b5cf6" />
        
        {/* Floating Model */}
        <FloatingModel isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

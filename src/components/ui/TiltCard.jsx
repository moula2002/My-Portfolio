import { useRef, useState } from "react";

export const TiltCard = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenX, setSheenX] = useState(50);
  const [sheenY, setSheenY] = useState(50);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates to -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Apply rotation ratios (up to 12 degrees tilt)
    const rX = -yPct * 12;
    const rY = xPct * 12;

    setRotateX(rX);
    setRotateY(rY);

    setSheenX((mouseX / width) * 100);
    setSheenY((mouseY / height) * 100);
    setOpacity(0.12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 transform-style-3d cursor-pointer ${className}`}
    >
      <div
        className="w-full h-full rounded-xl transition-transform duration-150 ease-out relative overflow-hidden transform-style-3d"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Radial light reflect highlight sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
          style={{
            opacity,
            background: `radial-gradient(circle 200px at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.2), transparent)`,
          }}
        />

        {/* 3D Content offset depth */}
        <div
          className="w-full h-full transform-style-3d"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

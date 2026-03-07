import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.05;

      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05 + currentPos.current.y * 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08 + currentPos.current.x * 0.4;

      meshRef.current.position.x = currentPos.current.x * 0.5;
      meshRef.current.position.y = currentPos.current.y * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <Sphere args={[1, 100, 200]} scale={2.2} ref={meshRef}>
        <MeshDistortMaterial
          color="#1e1e1e"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
};

const BackgroundParticles = () => {
  return (
    <Stars radius={40} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
  );
};

export const Scene3D: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        {!isMobile && <directionalLight position={[10, 10, 5]} intensity={1} color="#4f46e5" />}
        {!isMobile && <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />}
        {!isMobile && <AnimatedShape />}
        <Stars radius={40} depth={50} count={isMobile ? 2000 : 10000} factor={4} saturation={0} fade speed={isMobile ? 0.5 : 1} />
      </Canvas>
    </div>
  );
};
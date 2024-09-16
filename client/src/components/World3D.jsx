import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';

function AnimatedWorld() {
  const worldRef = useRef();

  useFrame((state, delta) => {
    worldRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={worldRef}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

const World3D = () => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedWorld />
      </Canvas>
    </div>
  );
};

export default World3D;
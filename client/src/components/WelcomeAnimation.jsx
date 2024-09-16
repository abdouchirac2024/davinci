import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls } from '@react-three/drei';

function AnimatedText() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <Text3D 
        font="/fonts/simplified3dfont.json"
        size={1}
        height={0.2}
        curveSegments={12}
      >
       
        <meshNormalMaterial />
      </Text3D>
    </mesh>
  );
}

const WelcomeAnimation = () => {
  return (
    <div style={{ height: '200px' }}>
      <Canvas>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <AnimatedText />
      </Canvas>
    </div>
  );
};

export default WelcomeAnimation;
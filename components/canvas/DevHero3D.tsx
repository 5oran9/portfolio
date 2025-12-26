// components/canvas/DevHero3D.tsx

'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

// 3D 오브젝트 컴포넌트
function AnimatedSphere() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    // 매 프레임마다 조금씩 회전하고, 위아래로 둥둥 떠다니는 느낌
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere visible args={[1, 100, 200]} scale={2} ref={meshRef}>
      <MeshDistortMaterial
        color="#4F46E5"
        attach="material"
        distort={0.5} // 일렁이는 정도
        speed={1.5}
        wireframe={true}
      />
    </Sphere>
  );
}

// 메인 씬 컴포넌트
export default function DevHero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
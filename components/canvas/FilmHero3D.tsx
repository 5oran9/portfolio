// components/canvas/FilmHero3D.tsx

'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SoundWaveform() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const count = 100;
  const spacing = 0.3;

  useFrame((state) => {
    const { clock } = state;
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const x = (i - count / 2) * spacing;
        const normPos = (i - count / 2) / (count / 2);

        // 양 끝이 높고 중앙이 낮은 스테레오 파형
        const stereoShape = Math.abs(Math.sin(Math.PI * normPos * 0.5));

        // 활발한 사운드 웨이브
        const wave1 = Math.sin(i * 0.3 + t * 2);
        const wave2 = Math.cos(i * 0.15 - t * 1.5) * 0.6;
        const wave3 = Math.sin(i * 0.5 + t * 2.5) * 0.4;

        // 파형 높이
        let scaleY = Math.abs(wave1 + wave2 + wave3) * stereoShape * 2.5 + 0.1;

        // 중앙에 배치하되 텍스트 아래
        dummy.position.set(x, -1.5, 0);
        dummy.scale.set(0.1, scaleY, 0.15);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ea580c" transparent opacity={0.75} />
    </instancedMesh>
  );
}

export default function FilmHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#f5f5f5] transition-colors duration-1000">
      <Canvas camera={{ position: [0, 0, 14], fov: 35 }}>
        <fog attach="fog" args={['#f5f5f5', 10, 25]} />
        <SoundWaveform />
      </Canvas>
    </div>
  );
}
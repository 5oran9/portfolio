// components/canvas/DevHero3D.tsx

'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const BG = '#050505';
const INDIGO_500 = new THREE.Color('#6366f1');
const SOFT = new THREE.Color('#c7d2fe');
const VIOLET = new THREE.Color('#a78bfa');

function Rings() {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringA = useRef<THREE.Mesh | null>(null);
  const ringB = useRef<THREE.Mesh | null>(null);
  const ringC = useRef<THREE.Mesh | null>(null);

  const geoms = useMemo(() => {
    const a = new THREE.TorusGeometry(2.2, 0.065, 24, 260);
    const b = new THREE.TorusGeometry(1.75, 0.048, 24, 240);
    const c = new THREE.TorusGeometry(1.25, 0.038, 24, 220);
    return { a, b, c };
  }, []);

  const matMain = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: INDIGO_500,
      emissive: INDIGO_500,
      emissiveIntensity: 0.65,
      roughness: 0.18,
      metalness: 0.92,
      transparent: true,
      opacity: 0.88,
    });
  }, []);

  const matSoft = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: SOFT,
      emissive: VIOLET,
      emissiveIntensity: 0.32,
      roughness: 0.24,
      metalness: 0.9,
      transparent: true,
      opacity: 0.38,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12 + px * 0.16;
      groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.06 + py * 0.10;
    }

    if (ringA.current) ringA.current.rotation.z = t * 0.30;
    if (ringB.current) ringB.current.rotation.z = -t * 0.24;
    if (ringC.current) ringC.current.rotation.z = t * 0.18;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringA} geometry={geoms.a} material={matMain} rotation={[0.38, 0.12, 0]} />
      <mesh ref={ringB} geometry={geoms.b} material={matSoft} rotation={[-0.28, 0.52, 0]} />
      <mesh ref={ringC} geometry={geoms.c} material={matMain} rotation={[0.12, -0.42, 0]} />
    </group>
  );
}

function FloatingBits() {
  const groupRef = useRef<THREE.Group | null>(null);

  const items = useMemo(() => {
    const arr: { p: [number, number, number]; r: [number, number, number]; s: number }[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        p: [(Math.random() - 0.5) * 7.8, (Math.random() - 0.5) * 4.4, (Math.random() - 0.5) * 4.8],
        r: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        s: 0.06 + Math.random() * 0.12,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.rotation.y = t * 0.085;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.045;
  });

  return (
    <group ref={groupRef}>
      {items.map((it, i) => (
        <mesh key={i} position={it.p} rotation={it.r} scale={it.s}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#E6EAFF"
            emissive={INDIGO_500}
            emissiveIntensity={0.16}
            roughness={0.28}
            metalness={0.94}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

function LightSweep() {
  const meshRef = useRef<THREE.Mesh | null>(null);

  const geom = useMemo(() => new THREE.PlaneGeometry(9, 4), []);
  const mat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    meshRef.current.position.x = Math.sin(t * 0.25) * 0.9;
    meshRef.current.position.y = Math.cos(t * 0.18) * 0.35;
    meshRef.current.rotation.z = t * 0.08;
  });

  return <mesh ref={meshRef} geometry={geom} material={mat} position={[0, 0, -1.3]} />;
}

function Scene() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.16) * 0.34;
    state.camera.position.y = Math.cos(t * 0.14) * 0.18;
    state.camera.position.z = 6.95 + Math.sin(t * 0.10) * 0.08;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3.5, 5, 2.5]} intensity={1.1} />
      <pointLight position={[0, 2.2, -3.8]} intensity={0.95} color="#A5B4FC" />
      <pointLight position={[-5.5, -0.8, 2]} intensity={0.55} color="#C7D2FE" />
      <pointLight position={[6.2, 0.2, 2.2]} intensity={0.35} color="#A78BFA" />

      <Rings />
      <FloatingBits />
      <LightSweep />

      <Sparkles count={52} scale={[12, 7, 10]} size={1.55} speed={0.20} opacity={0.14} />
      <Sparkles count={22} scale={[8, 5, 7]} size={1.05} speed={0.14} opacity={0.09} />
    </>
  );
}

export default function DevHero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 6.95], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[BG]} />
        <fog attach="fog" args={[BG, 7, 15]} />
        <Scene />
      </Canvas>
    </div>
  );
}

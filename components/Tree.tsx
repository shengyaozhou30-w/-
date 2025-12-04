import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

interface TreeProps {
  ornamentColor: string;
}

const LAYER_COUNT = 6;
const ORNAMENT_COUNT = 40;

export const LuxuryTree: React.FC<TreeProps> = ({ ornamentColor }) => {
  const treeRef = useRef<THREE.Group>(null);

  // Rotate tree slowly
  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Generate tree layers (Abstract Art Deco Cones)
  const layers = useMemo(() => {
    return new Array(LAYER_COUNT).fill(0).map((_, i) => {
      const scale = 1 + i * 0.8;
      const yPos = (LAYER_COUNT - i) * 1.2 - 3;
      return { scale, y: yPos, id: i };
    });
  }, []);

  // Generate ornament positions spiraling up the tree
  const ornaments = useMemo(() => {
    const temp = [];
    for (let i = 0; i < ORNAMENT_COUNT; i++) {
      const t = i / ORNAMENT_COUNT;
      const angle = t * Math.PI * 12; // 6 rotations
      const radius = 3.5 * (1 - t) + 0.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = t * 8 - 3.5;
      temp.push({ position: [x, y, z] as [number, number, number], scale: Math.random() * 0.2 + 0.1 });
    }
    return temp;
  }, []);

  return (
    <group ref={treeRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Main Tree Body - Emerald Glass/Metal Look */}
      {layers.map((layer) => (
        <mesh key={layer.id} position={[0, layer.y, 0]} castShadow receiveShadow>
          <coneGeometry args={[layer.scale * 0.8, 2, 8]} /> {/* Low poly for crystal look */}
          <meshPhysicalMaterial
            color="#003d2e" // Deep Emerald
            emissive="#001a14"
            roughness={0.1}
            metalness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            flatShading={true}
          />
        </mesh>
      ))}

      {/* Gold Trim/Wireframe Effect (Simulated with slightly larger wireframe mesh) */}
      {layers.map((layer) => (
        <mesh key={`trim-${layer.id}`} position={[0, layer.y, 0]}>
          <coneGeometry args={[layer.scale * 0.82, 2.05, 8]} />
          <meshStandardMaterial
            color="#C5A000"
            wireframe
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      </Float>

      {/* Instanced Ornaments */}
      <Instances range={ORNAMENT_COUNT}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={ornamentColor}
          roughness={0.1}
          metalness={1}
          emissive={ornamentColor}
          emissiveIntensity={0.5}
        />
        {ornaments.map((data, i) => (
          <Instance key={i} position={data.position} scale={data.scale} />
        ))}
      </Instances>

      {/* Floating Gold Dust */}
      <Sparkles
        count={200}
        scale={12}
        size={4}
        speed={0.4}
        opacity={0.8}
        color="#FFD700"
      />
      
      {/* Bottom Glow */}
       <pointLight position={[0, -4, 0]} intensity={2} color="#00ffaa" distance={5} />
    </group>
  );
};

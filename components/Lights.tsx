import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LightsProps {
  color: string;
}

export const Lights: React.FC<LightsProps> = ({ color }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Cinematic ambient fill */}
      <ambientLight intensity={0.2} color="#00241B" /> 
      
      {/* Key light for definition */}
      <spotLight
        position={[10, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#fff"
        castShadow
      />
      
      {/* Rim light for gold outline */}
      <spotLight
        position={[-10, 5, -10]}
        angle={0.5}
        penumbra={1}
        intensity={5}
        color="#4fd1c5" 
      />

      {/* Dynamic mood lights based on Gemini */}
      <group ref={groupRef}>
        <pointLight position={[5, 0, 5]} intensity={3} distance={10} color={color} />
        <pointLight position={[-5, 2, -5]} intensity={3} distance={10} color={color} />
      </group>
    </group>
  );
};

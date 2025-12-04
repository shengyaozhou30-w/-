import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { LuxuryTree } from "./Tree";
import { Lights } from "./Lights";
import { Environment, Stars, MeshReflectorMaterial } from "@react-three/drei";

interface SceneProps {
  ornamentColor: string;
  lightColor: string;
}

export const Scene: React.FC<SceneProps> = ({ ornamentColor, lightColor }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]} // Quality scaling
      camera={{ position: [0, 2, 12], fov: 35 }}
      gl={{ antialias: false, toneMappingExposure: 1.5 }}
      className="absolute top-0 left-0 w-full h-full z-0"
    >
      <color attach="background" args={["#000504"]} />
      
      {/* Background Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <LuxuryTree ornamentColor={ornamentColor} />
        <Lights color={lightColor} />
      </Suspense>

      {/* Post Processing for the "Cinematic Glow" */}
      <EffectComposer disableNormalPass>
        {/* Soft Gold Bloom */}
        <Bloom 
          luminanceThreshold={0.8} 
          mipmapBlur 
          intensity={1.2} 
          radius={0.6} 
        />
        <Bloom 
          luminanceThreshold={0} 
          mipmapBlur 
          intensity={0.2} 
          radius={0.8} 
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      {/* Floor Reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40} // Strength of reflection
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={1}
        />
      </mesh>
    </Canvas>
  );
};
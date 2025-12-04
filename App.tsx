import React, { useState } from "react";
import { Scene } from "./components/Scene";
import { UI } from "./components/UI";
import { generateHolidayMagic } from "./services/geminiService";
import { DEFAULT_MAGIC, TreeState } from "./types";

const App: React.FC = () => {
  const [state, setState] = useState<TreeState>({
    isLoading: false,
    userWish: "",
    magic: DEFAULT_MAGIC,
  });

  const handleWishSubmit = async (wish: string) => {
    setState((prev) => ({ ...prev, isLoading: true, userWish: wish }));
    
    try {
      const magicResponse = await generateHolidayMagic(wish);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        magic: magicResponse,
      }));
    } catch (error) {
      console.error("Failed to generate magic", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden selection:bg-[#FFD700] selection:text-black">
      {/* 3D Scene Layer */}
      <Scene 
        ornamentColor={state.magic.ornamentColor} 
        lightColor={state.magic.lightColor} 
      />
      
      {/* UI Overlay Layer */}
      <UI 
        isLoading={state.isLoading} 
        onWishSubmit={handleWishSubmit} 
        greeting={state.magic.greeting}
      />
      
      {/* Grain Overlay for cinematic film look */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { Loader2, Sparkles, Send } from "lucide-react";

interface UIProps {
  isLoading: boolean;
  onWishSubmit: (wish: string) => void;
  greeting: string;
}

export const UI: React.FC<UIProps> = ({ isLoading, onWishSubmit, greeting }) => {
  const [wish, setWish] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      onWishSubmit(wish);
      setWish("");
    }
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div className="text-[#a88b3b]">
          <h1 className="font-['Cinzel'] text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FBF5B7] to-[#AA8220]">
            Arix Signature
          </h1>
          <p className="font-['Playfair_Display'] text-sm md:text-base italic text-[#cfc098] tracking-widest mt-1 opacity-80">
            Est. 2024 • Interactive Holiday Collection
          </p>
        </div>
      </header>

      {/* Center Message Display */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl text-center px-4">
        <div className="transition-all duration-1000 ease-in-out">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-6xl text-[#FBF5B7] leading-tight drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            "{greeting}"
            </h2>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pointer-events-auto w-full max-w-md mx-auto mb-8 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00241B] via-[#FFD700] to-[#00241B] rounded-lg blur opacity-25"></div>
        <form 
            onSubmit={handleSubmit} 
            className="relative bg-[#00120e]/80 backdrop-blur-md border border-[#a88b3b]/30 rounded-lg p-1 flex items-center shadow-2xl"
        >
          <div className="pl-4 pr-2 text-[#a88b3b]">
            <Sparkles size={18} />
          </div>
          <input
            type="text"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            disabled={isLoading}
            placeholder="Whisper your holiday wish..."
            className="w-full bg-transparent border-none text-[#FBF5B7] font-['Playfair_Display'] placeholder-[#4a5d58] focus:ring-0 focus:outline-none py-3 text-lg"
          />
          <button
            type="submit"
            disabled={isLoading || !wish.trim()}
            className="p-3 rounded-md bg-[#a88b3b]/10 hover:bg-[#a88b3b]/20 text-[#FFD700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
        <p className="text-center text-[#4a5d58] text-xs mt-3 font-['Cinzel'] tracking-widest">
          Powered by Gemini 2.5 • AI Generated Experience
        </p>
      </div>
    </div>
  );
};

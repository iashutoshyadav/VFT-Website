"use client";
import { Play } from "lucide-react";
export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-screen">

      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.02] brightness-110 contrast-105"
        style={{
          backgroundImage: "url('/hero_gym_bg.png')",
        }}
      />

      {/* 75% dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content Container */}
      <div className="relative z-10 container-max px-6 pt-36 pb-28 flex flex-col items-center justify-center text-center w-full">

        {/* Massive Bold Centered Title */}
        <h1
          className="font-black text-white mb-4 animate-fade-in-up text-center uppercase tracking-tight [animation-delay:0.05s] [text-shadow:0_4px_20px_rgba(0,0,0,0.85),0_2px_8px_rgba(0,0,0,0.85)] [font-size:clamp(2.5rem,7.5vw,6.2rem)] leading-[1.0] tracking-[-0.04em]"
        >
          Welcome to Feeling
          <br />
          <span className="text-white/90">Vitality Good</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white font-extrabold text-lg md:text-xl mb-3 animate-fade-in-up tracking-wide [animation-delay:0.12s] [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]"
        >
          No contract. No surprises.
        </p>

        {/* Gym info line */}
        <p
          className="text-white/95 text-xs md:text-sm font-semibold tracking-wide animate-fade-in-up [animation-delay:0.22s] [text-shadow:0_2px_6px_rgba(0,0,0,0.9)]"
        >
          24/7 access · Unlimited sauna · Group classes · From £29.99/mo
        </p>

      </div>

      {/* Play Video button (bottom right corner) */}
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 right-8 z-10 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm text-white p-3 rounded-full flex items-center justify-center transition-all group cursor-pointer"
        aria-label="Play video"
      >
        <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
      </a>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <div className="w-5 h-8 border-2 border-white/25 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { preloadHeroImages } from "@/lib/threeDHeroManager";

interface LoadingScreenProps {
  onComplete: () => void;
}

const CAPTIONS = [
  "Decrypting national archives...",
  "Verifying historical records...",
  "Loading 3D archival galleries...",
  "Initializing digital exhibition hall...",
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [captionIndex, setCaptionIndex] = useState<number>(0);

  // Actual loaded % from the preloader
  const actualProgressRef = useRef<number>(0);
  // Whether the real load is finished
  const loadDoneRef = useRef<boolean>(false);

  useEffect(() => {
    // ── Smooth progress with lerp at ~60fps ──────────────────────────────────
    // The display value chases the real value so it never jumps.
    let rafId: number;
    let lastDisplay = 0;

    const tick = () => {
      const target = actualProgressRef.current;
      // Lerp: move ~8% of the remaining gap per frame
      lastDisplay = lastDisplay + (target - lastDisplay) * 0.08;

      // Snap to integer for display; clamp to 100
      const rounded = Math.min(100, Math.round(lastDisplay));
      setDisplayProgress(rounded);

      // Once display catches up to 100 and load is really done → complete
      if (loadDoneRef.current && rounded >= 99) {
        setDisplayProgress(100);
        setTimeout(onComplete, 450);
        return; // stop RAF
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Real image preloading ────────────────────────────────────────────────
    preloadHeroImages((percent) => {
      // Only ever move forward
      if (percent > actualProgressRef.current) {
        actualProgressRef.current = percent;
      }
    }).then(() => {
      actualProgressRef.current = 100;
      loadDoneRef.current = true;
    });

    // ── Caption cycling ──────────────────────────────────────────────────────
    const captionInterval = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % CAPTIONS.length);
    }, 900);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(captionInterval);
    };
  }, [onComplete]);

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-zinc-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Brand */}
        <h1
          className="text-5xl font-extrabold text-red-600 tracking-tight"
          style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}
        >
          POWERHOUSE
        </h1>

        {/* Circular Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Track */}
            <circle
              cx="50" cy="50" r="42"
              className="text-white/5"
              strokeWidth="5" stroke="currentColor" fill="transparent"
            />
            {/* Progress arc — no CSS transition, driven by lerp RAF instead */}
            <circle
              cx="50" cy="50" r="42"
              className="text-red-500"
              strokeWidth="5"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * displayProgress) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Percentage */}
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-mono font-bold text-white tracking-tighter">
              {displayProgress}%
            </span>
          </div>
        </div>

        {/* Dynamic Caption */}
        <div className="h-6 flex items-center justify-center">
          <motion.p
            key={captionIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2"
          >
            <Compass size={14} className="text-red-500 animate-spin" />
            <span>{CAPTIONS[captionIndex]}</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

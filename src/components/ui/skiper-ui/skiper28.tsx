"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import React, { useRef } from "react";

interface Skiper28Props {
  onComplete?: () => void;
}

const LINES = [
  "15th August 1947",
  "India gained independence",
  "from British colonial rule",
  "millions sacrificed everything",
  "regional heroes went unsung",
  "untold stories fade in time",
  "POWERHOUSE preserves them",
  "honoring the forgotten ones",
  "verifying every sacrifice",
  "80th Independence Day",
];

const Skiper28: React.FC<Skiper28Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Safe motion value event listener
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.97 && onComplete) {
      onComplete();
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050507]"
      style={{ height: `${LINES.length * 80 + 200}vh` }}
    >
      {/* Sticky 3D viewport */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-end justify-center pb-0"
        style={{
          perspective: "300px",
          perspectiveOrigin: "50% 100%",
        }}
      >
        {/* Scroll hint — only at start */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.08], [1, 0]) }}
          className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500 animate-pulse">
            Scroll to read
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>

        {/* 3D text plane */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {LINES.map((line, i) => (
            <TextLine
              key={i}
              text={line}
              index={i}
              total={LINES.length}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TextLineProps {
  text: string;
  index: number;
  total: number;
  progress: any;
}

const TextLine: React.FC<TextLineProps> = ({ text, index, total, progress }) => {
  const lineStart = index / total;
  const lineEnd = (index + 2) / total;

  const y = useTransform(progress, [0, 1], [`${(total - index) * 120}px`, `-${index * 60}px`]);
  const scale = useTransform(progress, [lineStart, lineEnd], [0.4, 1.8]);
  const opacity = useTransform(
    progress,
    [Math.max(0, lineStart - 0.05), lineStart, lineEnd - 0.05, Math.min(1, lineEnd)],
    [0, 1, 1, 0.2]
  );

  const isHighlight = text.includes("POWERHOUSE") || text.includes("1947") || text.includes("80th");

  return (
    <motion.div
      style={{ y, scale, opacity }}
      className="w-full text-center leading-none select-none pointer-events-none whitespace-nowrap overflow-visible"
    >
      <span
        className={`font-extrabold tracking-tight ${
          isHighlight ? "text-red-500" : "text-white"
        }`}
        style={{
          fontSize: "clamp(2.5rem, 8vw, 9rem)",
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          display: "block",
          paddingBottom: "0.15em",
        }}
      >
        {text}
      </span>
    </motion.div>
  );
};

export { Skiper28 };

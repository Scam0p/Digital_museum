"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "../../lib/utils";

export interface HoverExpandItem {
  label: string;
  /** e.g. country, year, category */
  sublabel?: string;
  image: string;
  imageAlt?: string;
  /** short descriptor shown when expanded */
  description?: string;
  /** Wikipedia URL or external archive link */
  wiki?: string;
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  /**
   * Row height when collapsed, in pixels.
   * @default 68
   */
  collapsedHeight?: number;
  /**
   * Row height when expanded, in pixels.
   * @default 320
   */
  expandedHeight?: number;
  className?: string;
  onItemClick?: (item: HoverExpandItem, index: number) => void;
}

export function HoverExpand({
  items,
  collapsedHeight = 68,
  expandedHeight = 320,
  className,
  onItemClick,
}: HoverExpandProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const handleClick = (item: HoverExpandItem, index: number) => {
    if (onItemClick) {
      onItemClick(item, index);
    } else if (item.wiki) {
      window.open(item.wiki, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="w-full border-t border-current opacity-15" />

      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && !isHovered;
        const isClickable = Boolean(item.wiki || onItemClick);

        return (
          <React.Fragment key={i}>
            <motion.div
              onClick={() => handleClick(item, i)}
              className={cn(
                "relative w-full overflow-hidden transition-colors select-none",
                isClickable ? "cursor-pointer group" : "cursor-default"
              )}
              animate={{
                height: isHovered ? expandedHeight : collapsedHeight,
                opacity: isOtherHovered ? 0.38 : 1,
              }}
              transition={{
                height: {
                  type: "spring",
                  stiffness: 280,
                  damping: 32,
                  mass: 0.9,
                },
                opacity: { duration: 0.22, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 1.06,
                }}
                transition={{
                  opacity: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                  scale: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
                }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt ?? item.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
              </motion.div>

              <div className="absolute inset-0 flex items-end px-5 pb-5">
                <div className="flex w-full items-end justify-between gap-4">
                  <div className="flex items-baseline gap-3 min-w-0">
                    <motion.span
                      className="text-xs tabular-nums shrink-0 opacity-40 font-mono"
                      animate={{
                        color: isHovered ? "#ff6b35" : "currentColor",
                        opacity: isHovered ? 0.9 : 0.4,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    <motion.span
                      className="font-semibold tracking-tight truncate"
                      style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                      animate={{
                        color: isHovered ? "#ffffff" : "currentColor",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>

                    {item.description && (
                      <motion.span
                        className="text-sm text-white/75 truncate hidden sm:block font-sans"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -8,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: isHovered ? 0.12 : 0,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        — {item.description}
                      </motion.span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Wikipedia Pill Badge shown on hover */}
                    {item.wiki && (
                      <motion.div
                        className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#ff6b35] text-white text-[10px] font-mono tracking-wider uppercase border border-white/20 transition-colors"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Wikipedia Archive</span>
                        <ExternalLink size={10} />
                      </motion.div>
                    )}

                    {item.sublabel && (
                      <motion.span
                        className="text-xs tracking-widest uppercase font-mono"
                        animate={{
                          color: isHovered
                            ? "rgba(255,255,255,0.75)"
                            : "currentColor",
                          opacity: isHovered ? 1 : 0.45,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.sublabel}
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="w-full border-t border-current opacity-15" />
          </React.Fragment>
        );
      })}
    </div>
  );
}

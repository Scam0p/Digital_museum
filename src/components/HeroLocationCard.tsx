import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Landmark, Calendar, Sparkles } from "lucide-react";

export interface MonumentLocation {
  id: string;
  name: string;
  location: string;
  state: string;
  constructedYear: string;
  fullLocationString: string;
  tag: string;
  description: string;
}

export const MONUMENT_LOCATIONS: MonumentLocation[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra",
    state: "UP",
    constructedYear: "1648",
    fullLocationString: "Taj Mahal , Agra , UP , Constructed : 1648",
    tag: "UNESCO World Heritage Site",
    description: "Ivory-white marble mausoleum on the Yamuna riverbank.",
  },
  {
    id: "red-fort",
    name: "Red Fort",
    location: "Old Delhi",
    state: "Delhi",
    constructedYear: "1648",
    fullLocationString: "Red Fort , Old Delhi , Delhi , Constructed : 1648",
    tag: "Historic Mughal Citadel",
    description: "Red sandstone fortress and national symbol of independence.",
  },
  {
    id: "gateway-of-india",
    name: "Gateway of India",
    location: "Mumbai",
    state: "Maharashtra",
    constructedYear: "1924",
    fullLocationString: "Gateway of India , Mumbai , Maharashtra , Constructed : 1924",
    tag: "Historic Waterfront Monument",
    description: "Colonnaded triumphal arch overlooking the Arabian Sea.",
  },
  {
    id: "india-gate",
    name: "India Gate",
    location: "New Delhi",
    state: "Delhi",
    constructedYear: "1931",
    fullLocationString: "India Gate , New Delhi , Delhi , Constructed : 1931",
    tag: "National War Memorial",
    description: "Triumphal memorial arch commemorating Indian soldiers.",
  },
  {
    id: "orchha-complex",
    name: "Orchha Heritage Complex",
    location: "Orchha",
    state: "MP",
    constructedYear: "1501",
    fullLocationString: "Orchha Complex , Orchha , MP , Constructed : 1501",
    tag: "Bundela Dynasty Architecture",
    description: "Grand medieval riverfront palaces, cenotaphs and temples.",
  },
];

interface HeroLocationCardProps {
  activeIndex: number;
  isVisible: boolean;
}

export const HeroLocationCard: React.FC<HeroLocationCardProps> = ({
  activeIndex,
  isVisible,
}) => {
  const currentIndex = Math.min(
    MONUMENT_LOCATIONS.length - 1,
    Math.max(0, activeIndex)
  );
  const current = MONUMENT_LOCATIONS[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          // Fully solid/opaque background (#09090e) ensures nothing underneath is visible
          className="fixed bottom-6 right-6 md:bottom-8 md:right-10 z-20 select-none pointer-events-auto"
          style={{ zIndex: 25 }}
        >
          {/* Card Container with solid opaque backdrop to completely mask underlying star watermark */}
          <div className="relative w-[300px] sm:w-[350px] rounded-2xl bg-[#09090e] border border-white/15 p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Subtle top accent highlight */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent" />

            {/* Header: Badge + Step Indicator */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-amber-300">
                  {current.tag}
                </span>
              </div>

              <span className="text-[11px] font-mono font-bold text-zinc-400 tracking-wider">
                0{currentIndex + 1} / 0{MONUMENT_LOCATIONS.length}
              </span>
            </div>

            {/* Dynamic Monument Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-1.5"
              >
                {/* Place Name */}
                <div className="flex items-center gap-2">
                  <Landmark size={18} className="text-amber-400 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                    {current.name}
                  </h3>
                </div>

                {/* Location & Year details formatted clearly */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-300 font-sans mt-0.5">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <MapPin size={13} className="text-red-400 flex-shrink-0" />
                    {current.location}, {current.state}
                  </span>

                  <span className="text-zinc-600">•</span>

                  <span className="flex items-center gap-1 font-mono font-medium text-amber-300/90">
                    <Calendar size={13} className="text-amber-400 flex-shrink-0" />
                    Constructed : {current.constructedYear}
                  </span>
                </div>

                {/* Full formatted location string banner */}
                <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 truncate">
                    <Sparkles size={12} className="text-amber-400/80 flex-shrink-0" />
                    <span className="truncate">{current.fullLocationString}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step progress dots / bars */}
            <div className="mt-3.5 flex items-center gap-1.5">
              {MONUMENT_LOCATIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                      : i < currentIndex
                      ? "bg-white/40"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

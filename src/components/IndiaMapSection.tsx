import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Volume2,
  Ticket,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  X,
  Compass,
  Landmark,
  ArrowRight,
  BookOpen,
  Eye,
  Award
} from "lucide-react";
import { MUSEUM_TOUR_CITIES, type MuseumTourCity } from "@/lib/museumTourData";

interface IndiaMapSectionProps {
  onSelectCityForBooking: (cityId: string) => void;
}

export const IndiaMapSection: React.FC<IndiaMapSectionProps> = ({
  onSelectCityForBooking,
}) => {
  const [activeCityId, setActiveCityId] = useState<string>("delhi");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  const currentCity =
    MUSEUM_TOUR_CITIES.find((c) => c.id === activeCityId) ||
    MUSEUM_TOUR_CITIES[0];

  const currentCityIndex = MUSEUM_TOUR_CITIES.findIndex(
    (c) => c.id === currentCity.id
  );

  const getNextCity = (): MuseumTourCity => {
    const nextIndex = (currentCityIndex + 1) % MUSEUM_TOUR_CITIES.length;
    return MUSEUM_TOUR_CITIES[nextIndex];
  };

  const handleCityPinClick = (cityId: string) => {
    setActiveCityId(cityId);
    setIsDetailModalOpen(true);
  };

  const handleNextCityClick = () => {
    const next = getNextCity();
    setActiveCityId(next.id);
  };

  const handleBookNow = (cityId: string) => {
    setIsDetailModalOpen(false);
    onSelectCityForBooking(cityId);
    // Smooth scroll down to the booking section
    setTimeout(() => {
      document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section
      id="map-section"
      className="w-full py-24 px-4 sm:px-6 lg:px-12 bg-[#050507] text-zinc-100 relative border-t border-white/10"
    >
      {/* Subtle national warm glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-red-500 font-semibold flex items-center gap-2">
            <Compass size={14} className="animate-spin text-red-500" />
            National Archival Network
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}
          >
            EXPLORE THE 5 HERITAGE CITIES & MUSEUMS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans leading-relaxed">
            Click any pin on the map to inspect the verified museum archives, guided tour itineraries, rare artifacts, and cultural significance before securing your visitor pass.
          </p>
        </div>

        {/* Main Map & Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Interactive Black India Map (7 Cols on desktop) */}
          <div className="lg:col-span-7 relative w-full rounded-3xl bg-[#09090f] border border-white/10 p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Map Frame Watermark / Coordinate overlay */}
            <div className="absolute top-4 left-6 flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>GEOGRAPHICAL CULTURAL MATRIX • 2026</span>
            </div>

            <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-3 text-[10px] font-mono text-zinc-400">
              <span>LAT 8°4′N — 37°6′N</span>
              <span>•</span>
              <span>LONG 68°7′E — 97°25′E</span>
            </div>

            {/* SVG India Map Container */}
            <div className="relative w-full aspect-[4/5] max-h-[580px] mx-auto flex items-center justify-center pt-6">
              <svg
                viewBox="0 0 450 540"
                className="w-full h-full select-none"
                style={{ filter: "drop-shadow(0 0 25px rgba(0,0,0,0.9))" }}
              >
                {/* Subtle Grid Lat/Long Lines */}
                <g stroke="rgba(255,255,255,0.03)" strokeWidth="0.5">
                  <line x1="20" y1="100" x2="430" y2="100" />
                  <line x1="20" y1="200" x2="430" y2="200" />
                  <line x1="20" y1="300" x2="430" y2="300" />
                  <line x1="20" y1="400" x2="430" y2="400" />
                  <line x1="100" y1="20" x2="100" y2="520" />
                  <line x1="200" y1="20" x2="200" y2="520" />
                  <line x1="300" y1="20" x2="300" y2="520" />
                  <line x1="400" y1="20" x2="400" y2="520" />
                </g>

                {/* Stylized Accurate India Contour Outline in Dark Theme */}
                <path
                  d="M175,32 L198,40 L212,56 L205,82 L225,98 L240,92 L258,110 L250,132 L275,138 L308,132 L342,148 L370,140 L400,165 L395,190 L360,195 L345,215 L320,205 L315,225 L328,245 L310,268 L285,260 L270,278 L250,270 L262,315 L245,355 L215,395 L198,435 L190,480 L180,488 L168,440 L152,380 L128,340 L115,285 L85,268 L70,240 L98,228 L115,195 L128,198 L142,165 L145,120 L160,85 Z"
                  fill="#0e0e18"
                  stroke="#ffffff25"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 hover:fill-[#121220]"
                />

                {/* Kashmir & Northern Frontiers */}
                <path
                  d="M175,32 L150,55 L145,95 L160,85 L175,32 Z"
                  fill="#0e0e18"
                  stroke="#ffffff25"
                  strokeWidth="1.2"
                />

                {/* Gujarat / Kathiawar Peninsula */}
                <path
                  d="M115,195 L68,210 L55,235 L70,250 L98,240 L115,220 Z"
                  fill="#0e0e18"
                  stroke="#ffffff25"
                  strokeWidth="1.2"
                />

                {/* Northeast States Branch */}
                <path
                  d="M342,148 L380,145 L415,160 L428,185 L395,190 L365,180 Z"
                  fill="#0e0e18"
                  stroke="#ffffff25"
                  strokeWidth="1.2"
                />

                {/* South Coastal Tip */}
                <path
                  d="M190,480 L180,515 L172,485 Z"
                  fill="#0e0e18"
                  stroke="#ffffff25"
                  strokeWidth="1.2"
                />

                {/* Inter-City Cultural Connecting Flight/Route Vectors */}
                <path
                  d="M185,155 Q150,280 145,310 Q160,380 185,415 Q210,410 215,420 Q240,320 305,275 Q245,210 185,155 Z"
                  fill="none"
                  stroke="rgba(239, 68, 68, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* 5 City Interactive Pins Placed on Exact SVG Coordinates */}
                {/* 1. DELHI */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleCityPinClick("delhi")}
                  onMouseEnter={() => setHoveredCityId("delhi")}
                  onMouseLeave={() => setHoveredCityId(null)}
                >
                  <circle cx="185" cy="155" r="16" fill="rgba(239, 68, 68, 0.15)" className="animate-ping" />
                  <circle cx="185" cy="155" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="185" cy="155" r="3" fill="#ffffff" />
                  {/* City Label */}
                  <rect x="202" y="142" width="70" height="24" rx="6" fill="#12121c" stroke="#ef4444" strokeWidth="1" />
                  <text x="237" y="158" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    DELHI
                  </text>
                </g>

                {/* 2. MUMBAI */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleCityPinClick("mumbai")}
                  onMouseEnter={() => setHoveredCityId("mumbai")}
                  onMouseLeave={() => setHoveredCityId(null)}
                >
                  <circle cx="145" cy="310" r="16" fill="rgba(249, 115, 22, 0.15)" className="animate-ping" />
                  <circle cx="145" cy="310" r="8" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="145" cy="310" r="3" fill="#ffffff" />
                  {/* City Label */}
                  <rect x="62" y="297" width="75" height="24" rx="6" fill="#12121c" stroke="#f97316" strokeWidth="1" />
                  <text x="99" y="313" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    MUMBAI
                  </text>
                </g>

                {/* 3. KOLKATA */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleCityPinClick("kolkata")}
                  onMouseEnter={() => setHoveredCityId("kolkata")}
                  onMouseLeave={() => setHoveredCityId(null)}
                >
                  <circle cx="305" cy="275" r="16" fill="rgba(239, 68, 68, 0.15)" className="animate-ping" />
                  <circle cx="305" cy="275" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="305" cy="275" r="3" fill="#ffffff" />
                  {/* City Label */}
                  <rect x="322" y="262" width="80" height="24" rx="6" fill="#12121c" stroke="#ef4444" strokeWidth="1" />
                  <text x="362" y="278" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    KOLKATA
                  </text>
                </g>

                {/* 4. BANGALORE */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleCityPinClick("bangalore")}
                  onMouseEnter={() => setHoveredCityId("bangalore")}
                  onMouseLeave={() => setHoveredCityId(null)}
                >
                  <circle cx="185" cy="415" r="16" fill="rgba(245, 158, 11, 0.15)" className="animate-ping" />
                  <circle cx="185" cy="415" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="185" cy="415" r="3" fill="#ffffff" />
                  {/* City Label */}
                  <rect x="90" y="402" width="86" height="24" rx="6" fill="#12121c" stroke="#f59e0b" strokeWidth="1" />
                  <text x="133" y="418" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    BANGALORE
                  </text>
                </g>

                {/* 5. CHENNAI */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleCityPinClick("chennai")}
                  onMouseEnter={() => setHoveredCityId("chennai")}
                  onMouseLeave={() => setHoveredCityId(null)}
                >
                  <circle cx="215" cy="420" r="16" fill="rgba(239, 68, 68, 0.15)" className="animate-ping" />
                  <circle cx="215" cy="420" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="215" cy="420" r="3" fill="#ffffff" />
                  {/* City Label */}
                  <rect x="232" y="407" width="76" height="24" rx="6" fill="#12121c" stroke="#ef4444" strokeWidth="1" />
                  <text x="270" y="423" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    CHENNAI
                  </text>
                </g>
              </svg>
            </div>

            {/* Quick interactive hint badge */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-red-400">
                <Sparkles size={12} />
                Click any city pin to launch full museum tour details
              </span>
              <span>5 Curated Hubs</span>
            </div>
          </div>

          {/* Right Panel: City Selection Cards & Fast Overview (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                Select a Heritage City
              </span>
              <span className="text-[11px] font-mono text-red-500 font-medium">
                05 Archival Locations
              </span>
            </div>

            {MUSEUM_TOUR_CITIES.map((city, idx) => {
              const isSelected = activeCityId === city.id;
              return (
                <motion.div
                  key={city.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleCityPinClick(city.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col gap-2 relative ${
                    isSelected
                      ? "bg-[#11111a] border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.18)]"
                      : "bg-[#09090e] border-white/10 hover:border-white/20 hover:bg-[#0d0d14]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-zinc-300">
                        0{idx + 1}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {city.name}
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400">
                        ({city.state})
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                      {city.badge}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 font-sans line-clamp-1">
                    {city.museumName}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Clock size={12} className="text-amber-400" />
                      {city.tourDuration}
                    </span>
                    <span className="flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold transition-colors">
                      Inspect Tour Details
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FULL-SCREEN IMMERSIVE MUSEUM & CULTURAL TOUR DEEP-DIVE MODAL
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsDetailModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#09090f] border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto my-auto text-zinc-100 selection:bg-red-600/30"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-red-600 via-orange-500 to-amber-400" />

              {/* Close Button */}
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close Tour Details"
              >
                <X size={18} />
              </button>

              {/* Header: Location & Museum Tag */}
              <div className="flex flex-col gap-2 mb-6 pr-10">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                    {currentCity.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    City 0{currentCityIndex + 1} of 05 • {currentCity.state}
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}
                >
                  {currentCity.name.toUpperCase()} — {currentCity.museumName.toUpperCase()}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans italic">
                  "{currentCity.tagline}"
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-8">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Tour Duration</span>
                  <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                    <Clock size={13} className="text-amber-400" />
                    {currentCity.tourDuration}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Audio Guide</span>
                  <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                    <Volume2 size={13} className="text-green-400" />
                    Bilingual Included
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Languages</span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {currentCity.languages.join(", ")}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Standard Pass</span>
                  <span className="text-xs sm:text-sm font-bold text-red-400 flex items-center gap-1 font-mono">
                    <Ticket size={13} />
                    {currentCity.guidedPassPrice}
                  </span>
                </div>
              </div>

              {/* Architecture & Overview */}
              <div className="mb-8 flex flex-col gap-2.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Landmark size={14} className="text-red-500" />
                  Museum Architecture & Archival Background
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {currentCity.overview}
                </p>
                <div className="p-3 rounded-xl bg-[#12121c] border border-white/5 text-[11px] font-mono text-zinc-400">
                  <span className="text-amber-400 font-semibold">Architectural Structure: </span>
                  {currentCity.architecture}
                </div>
              </div>

              {/* What Tour They Are Giving Us (Step-by-Step Guided Itinerary) */}
              <div className="mb-8 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <Compass size={14} className="text-red-500" />
                    What Tour You Are Receiving (Curated Itinerary)
                  </h3>
                  <span className="text-[10px] font-mono text-amber-400">4-Phase Walkthrough</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentCity.tourPhases.map((phase) => (
                    <div
                      key={phase.phase}
                      className="p-4 rounded-2xl bg-[#0e0e16] border border-white/5 flex flex-col gap-2 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-red-500 uppercase px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                          {phase.phase} • {phase.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {phase.title}
                      </h4>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="mt-auto pt-2 border-t border-white/5 text-[11px] font-mono text-amber-300/90">
                        <span className="text-zinc-500">Key Highlight: </span>
                        {phase.highlight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rare Artifacts & Regional Culture */}
              <div className="mb-8 flex flex-col gap-3.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Award size={14} className="text-red-500" />
                  Key Artifacts & Cultural Heritage on Display
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCity.artifacts.map((art, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0c0c14] border border-white/5 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="text-red-400 font-semibold">{art.period}</span>
                        <span className="truncate max-w-[140px]">{art.origin}</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-white">
                        {art.title}
                      </h5>
                      <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                        {art.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Cultural Heritage Notes */}
                <div className="p-4 rounded-2xl bg-red-950/15 border border-red-500/25 flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                    Regional Culture & Revolutionary Traditions: {currentCity.culturalHeritage.tradition}
                  </span>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {currentCity.culturalHeritage.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-zinc-400 mt-1">
                    <span className="text-zinc-500">Celebrated Patriots:</span>
                    {currentCity.culturalHeritage.keyFigures.map((fig, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                        {fig}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Significance Statement & Ticket Inclusions */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#101018] border border-white/10 mb-8 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  <ShieldCheck size={16} />
                  Historical Significance & Ticket Pass Value
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {currentCity.tourSignificance}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-400">
                  {currentCity.ticketIncludes.map((inc, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-zinc-300">
                      <span className="h-1 w-1 rounded-full bg-red-500" />
                      {inc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Bottom Actions: Book Pass + Next City Navigation */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Book Pass CTA */}
                <button
                  onClick={() => handleBookNow(currentCity.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Ticket size={14} />
                  Book Pass for {currentCity.name}
                </button>

                {/* Next City Button */}
                <button
                  onClick={handleNextCityClick}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-200 hover:text-white font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Next City: <strong>{getNextCity().name}</strong></span>
                  <ArrowRight size={14} className="text-red-400" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

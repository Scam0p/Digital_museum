import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Volume2,
  Ticket,
  ChevronRight,
  ShieldCheck,
  X,
  Compass,
  Landmark,
  ArrowRight,
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

  // Lock background body scroll when the modal is open to prevent background scrolling
  useEffect(() => {
    if (isDetailModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDetailModalOpen]);

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
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide text-center"
            style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif", letterSpacing: "0.05em" }}
          >
            EXPLORE THE 5 CITIES AND MUSEUMS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans leading-relaxed text-center">
            Click any pin on the map to inspect the verified museum archives, guided tour itineraries, rare artifacts, and cultural significance before securing your visitor pass.
          </p>
        </div>

        {/* Main Map & Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Static India Map (7 Cols on desktop) */}
          <div className="lg:col-span-7 relative w-full rounded-3xl bg-[#09090f] border border-white/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
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

            {/* Static PNG India Map Container with Absolute Interactive Pins */}
            <div className="relative w-full aspect-[1/1.15] max-w-[450px] mx-auto flex items-center justify-center pt-8">
              {/* Static High-Quality Transparent Silhouette Map of India */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/India_map_blank.svg/512px-India_map_blank.svg.png"
                alt="India Outline Map"
                className="w-full h-full object-contain select-none pointer-events-none opacity-25"
                style={{ filter: "invert(1) brightness(0.65) contrast(1.1)" }}
              />

              {/* Absolute City Pins overlaying the static PNG map */}
              {/* 1. DELHI */}
              <button
                onClick={() => handleCityPinClick("delhi")}
                className="absolute cursor-pointer group focus:outline-none bg-transparent border-none p-0"
                style={{ left: "48%", top: "31%", transform: "translate(-50%, -50%)" }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-500/30 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ef4444] border-2 border-white shadow-lg"></span>
                  
                  {/* Tooltip badge */}
                  <div className="absolute left-6 px-2.5 py-1 rounded bg-[#12121c] border border-red-500/50 text-[10px] font-bold text-white whitespace-nowrap shadow-xl">
                    DELHI
                  </div>
                </div>
              </button>

              {/* 2. MUMBAI */}
              <button
                onClick={() => handleCityPinClick("mumbai")}
                className="absolute cursor-pointer group focus:outline-none bg-transparent border-none p-0"
                style={{ left: "29%", top: "60%", transform: "translate(-50%, -50%)" }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-orange-500/30 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#f97316] border-2 border-white shadow-lg"></span>
                  
                  {/* Tooltip badge */}
                  <div className="absolute right-6 px-2.5 py-1 rounded bg-[#12121c] border border-orange-500/50 text-[10px] font-bold text-white whitespace-nowrap shadow-xl">
                    MUMBAI
                  </div>
                </div>
              </button>

              {/* 3. KOLKATA */}
              <button
                onClick={() => handleCityPinClick("kolkata")}
                className="absolute cursor-pointer group focus:outline-none bg-transparent border-none p-0"
                style={{ left: "74%", top: "52%", transform: "translate(-50%, -50%)" }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-500/30 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ef4444] border-2 border-white shadow-lg"></span>
                  
                  {/* Tooltip badge */}
                  <div className="absolute left-6 px-2.5 py-1 rounded bg-[#12121c] border border-red-500/50 text-[10px] font-bold text-white whitespace-nowrap shadow-xl">
                    KOLKATA
                  </div>
                </div>
              </button>

              {/* 4. BANGALORE */}
              <button
                onClick={() => handleCityPinClick("bangalore")}
                className="absolute cursor-pointer group focus:outline-none bg-transparent border-none p-0"
                style={{ left: "44%", top: "76%", transform: "translate(-50%, -50%)" }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-500/30 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#f59e0b] border-2 border-white shadow-lg"></span>
                  
                  {/* Tooltip badge */}
                  <div className="absolute right-6 px-2.5 py-1 rounded bg-[#12121c] border border-amber-500/50 text-[10px] font-bold text-white whitespace-nowrap shadow-xl">
                    BANGALORE
                  </div>
                </div>
              </button>

              {/* 5. CHENNAI */}
              <button
                onClick={() => handleCityPinClick("chennai")}
                className="absolute cursor-pointer group focus:outline-none bg-transparent border-none p-0"
                style={{ left: "52%", top: "78%", transform: "translate(-50%, -50%)" }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-500/30 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ef4444] border-2 border-white shadow-lg"></span>
                  
                  {/* Tooltip badge */}
                  <div className="absolute left-6 px-2.5 py-1 rounded bg-[#12121c] border border-red-500/50 text-[10px] font-bold text-white whitespace-nowrap shadow-xl">
                    CHENNAI
                  </div>
                </div>
              </button>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsDetailModalOpen(false)}
          >
            {/* Modal Inner Container - Flex container with scrollable content block and fixed header/footer */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#09090f] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden text-zinc-100 selection:bg-red-600/30"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 z-35" />

              {/* 1. FIXED MODAL HEADER - Remains static, close button always working */}
              <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between gap-4 flex-shrink-0 relative z-30 bg-[#09090f]">
                <div className="flex flex-col gap-1.5 pr-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[9px] font-mono font-bold uppercase tracking-wider text-red-400">
                      {currentCity.badge}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      Location 0{currentCityIndex + 1} • {currentCity.state}
                    </span>
                  </div>
                  <h2
                    className="text-xl sm:text-3xl font-extrabold text-white"
                    style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif", letterSpacing: "0.05em", lineHeight: "1.1" }}
                  >
                    {currentCity.name.toUpperCase()} — {currentCity.museumName.toUpperCase()}
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans italic line-clamp-1">
                    "{currentCity.tagline}"
                  </p>
                </div>

                {/* Fixed Close Button */}
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer flex-shrink-0 z-40"
                  title="Close Tour Details"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 2. SCROLLABLE CONTENT BODY - Displays larger images and shorter text layout */}
              <div className="p-6 sm:p-8 md:p-10 overflow-y-auto flex-grow flex flex-col gap-8 scrollbar-thin">
                
                {/* Immersive Splitted Gallery Banner (Virasat Inspired) - High Weight Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Museum Architecture Image Card */}
                  <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-black/40 h-48 sm:h-64 shadow-lg">
                    <img
                      src={currentCity.museumImage}
                      alt={currentCity.museumName}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold">Museum Architecture</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-sans truncate max-w-[320px]">
                        {currentCity.museumName}
                      </h4>
                    </div>
                  </div>

                  {/* Historical Context Image Card */}
                  <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-black/40 h-48 sm:h-64 shadow-lg">
                    <img
                      src={currentCity.historyImage}
                      alt={currentCity.tourTitle}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-red-400 font-bold">Historical Archive Exhibit</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-sans truncate max-w-[320px]">
                        {currentCity.tourTitle}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Tour Duration</span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                      <Clock size={13} className="text-amber-400" />
                      {currentCity.tourDuration}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Audio Guide</span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                      <Volume2 size={13} className="text-green-400" />
                      Bilingual Included
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Languages</span>
                    <span className="text-xs sm:text-sm font-bold text-white truncate">
                      {currentCity.languages.join(", ")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Standard Pass</span>
                    <span className="text-xs sm:text-sm font-bold text-red-400 flex items-center gap-1 font-mono">
                      <Ticket size={13} />
                      {currentCity.guidedPassPrice}
                    </span>
                  </div>
                </div>

                {/* Museum Summary Overview */}
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2 font-bold">
                    <Landmark size={13} className="text-red-500" />
                    Heritage Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {currentCity.overview}
                  </p>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400">
                    <span className="text-amber-400 font-semibold">Structure Detail: </span>
                    {currentCity.architecture}
                  </div>
                </div>

                {/* What Tour They Are Giving Us (Step-by-Step Guided Itinerary) */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2 font-bold">
                      <Compass size={13} className="text-red-500" />
                      Guided Tour Itinerary
                    </h3>
                    <span className="text-[10px] font-mono text-amber-400 font-semibold">4-Phase Walkthrough</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {currentCity.tourPhases.map((phase) => (
                      <div
                        key={phase.phase}
                        className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-2 hover:border-white/10 hover:bg-white/[0.02] transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold text-red-500 uppercase px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                            {phase.phase} • {phase.duration}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                          {phase.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                          {phase.description}
                        </p>
                        <div className="mt-auto pt-2 border-t border-white/5 text-[10px] font-mono text-amber-300/80">
                          <span className="text-zinc-500">Exhibit Highlight: </span>
                          {phase.highlight}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Artifacts Showcase */}
                <div className="flex flex-col gap-3.5">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2 font-bold">
                    <Award size={13} className="text-red-500" />
                    Verified Historical Artifact Exhibits
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCity.artifacts.map((art, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-1 hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                          <span className="text-red-400 font-semibold">{art.period}</span>
                          <span className="truncate max-w-[140px]">{art.origin}</span>
                        </div>
                        <h5 className="text-xs font-bold text-white">
                          {art.title}
                        </h5>
                        <p className="text-[10px] text-zinc-400 font-sans leading-normal">
                          {art.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Cultural Heritage Notes */}
                  <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/20 flex flex-col gap-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-400">
                      Regional Culture & Traditions: {currentCity.culturalHeritage.tradition}
                    </span>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {currentCity.culturalHeritage.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono text-zinc-500 mt-1">
                      <span className="text-zinc-500">Key Historical Figures:</span>
                      {currentCity.culturalHeritage.keyFigures.map((fig, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                          {fig}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Significance Statement & Ticket Inclusions */}
                <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    <ShieldCheck size={15} />
                    Historical Value Inclusions
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {currentCity.tourSignificance}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                    {currentCity.ticketIncludes.map((inc, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-zinc-300">
                        <span className="h-1 w-1 rounded-full bg-red-500" />
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. FIXED MODAL FOOTER - Action buttons remain permanently visible at bottom */}
              <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0 bg-[#09090f] z-30">
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

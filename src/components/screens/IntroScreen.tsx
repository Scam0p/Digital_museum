import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ShieldAlert, Award, CalendarDays, Compass, ArrowRight } from "lucide-react";

interface IntroScreenProps {
  onProceed: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onProceed }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-zinc-100 flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden selection:bg-red-900/40">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Section */}
      <header className="w-full flex flex-col items-center justify-center py-6 z-10">
        <h1 
          className="text-7xl md:text-9xl text-red-600 font-extrabold select-none transition-transform duration-500 hover:scale-[1.02]"
          style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif", letterSpacing: "0.04em" }}
        >
          POWERHOUSE
        </h1>
      </header>

      {/* Main Glassmorphic Panel */}
      <main className="w-full max-w-4xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 my-6 z-10 flex flex-col gap-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Theme Intro */}
        <section className="text-center flex flex-col items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-zinc-400 font-medium">
            Heritage & Culture Digital Museum
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mt-1">
            Preserving & Verifying India's Forgotten Narratives
          </h2>
        </section>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Statement */}
          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2.5 text-red-400">
              <ShieldAlert size={18} />
              <h3 className="font-sans font-semibold uppercase tracking-wider text-xs">
                The Historical Gap
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 font-sans">
              Most of India's freedom struggle is remembered through a handful of well-known names, while hundreds of regional revolutionaries, local uprisings, and cultural traditions are fading from public memory. There is no single destination where these stories are verified against public records and made accessible for a digital audience.
            </p>
          </div>

          {/* Solution Overview */}
          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Compass size={18} />
              <h3 className="font-sans font-semibold uppercase tracking-wider text-xs">
                The Platform
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 font-sans">
              <span className="text-red-600 font-extrabold" style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}>POWERHOUSE</span> combines archival storytelling with interactive design—letting users explore forgotten freedom fighters and cultural heritage, then book a guided museum tour experience end-to-end, all in one platform.
            </p>
          </div>
        </div>

        {/* Key Features List */}
        <section>
          <div className="flex items-center gap-2 text-zinc-300 mb-4 border-b border-white/5 pb-2">
            <Award size={16} />
            <h3 className="font-sans font-semibold uppercase tracking-wider text-xs">
              Platform Features
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <BookOpen className="text-zinc-300 mt-0.5 shrink-0" size={16} />
              <div>
                <h4 className="text-xs font-semibold text-zinc-200">Digital Archive Walkthrough</h4>
                <p className="text-[11px] text-zinc-500 mt-1">Lesser-known fighters verified against public historical records.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <Award className="text-zinc-300 mt-0.5 shrink-0" size={16} />
              <div>
                <h4 className="text-xs font-semibold text-zinc-200">Interactive Galleries</h4>
                <p className="text-[11px] text-zinc-500 mt-1">3D circular galleries and iconic moment cards with sourced links.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <CalendarDays className="text-zinc-300 mt-0.5 shrink-0" size={16} />
              <div>
                <h4 className="text-xs font-semibold text-zinc-200">Museum Tour Booking</h4>
                <p className="text-[11px] text-zinc-500 mt-1">Skyscanner-style sliding calendar to plan physical guided visits.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <Compass className="text-zinc-300 mt-0.5 shrink-0" size={16} />
              <div>
                <h4 className="text-xs font-semibold text-zinc-200">Personal Dashboard</h4>
                <p className="text-[11px] text-zinc-500 mt-1">Track saved stories, profile data, and electronic ticket bookings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Information */}
        <footer className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-zinc-500">
          <div>
            <span className="font-semibold text-zinc-400 uppercase text-[10px] tracking-wider">Team POWERHOUSE</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center font-mono text-[11px]">
            <span>Arjun V — <span className="text-zinc-400">1EP24IC007</span></span>
            <span>Jeevan Jaikumar — <span className="text-zinc-400">1EP24IC015</span></span>
            <span>Harsh Jangir — <span className="text-zinc-400">1EP24IC012</span></span>
          </div>
        </footer>
      </main>

      {/* Bottom Proceed Button */}
      <footer className="w-full flex justify-center py-4 z-10">
        <motion.button
          onClick={onProceed}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 bg-white/10 hover:bg-white/15 text-white font-sans font-semibold rounded-full border border-white/15 shadow-2xl tracking-wider uppercase text-xs cursor-pointer transition-all duration-300 flex items-center gap-2 backdrop-blur-xl"
        >
          <span>Enter Digital Museum</span>
          <ArrowRight size={14} />
        </motion.button>
      </footer>
    </div>
  );
};

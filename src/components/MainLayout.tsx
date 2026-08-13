import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, type Variants } from "framer-motion";
import Lenis from "lenis";
import { databaseService } from "@/lib/databaseService";
import { getHeroImages } from "@/lib/threeDHeroManager";
import type { UserProfile, BookingRecord } from "@/lib/databaseService";
import { audioManager } from "@/lib/audioManager";
import CircularGallery from "./CircularGallery";
import { HoverExpand } from "./unlumen-ui/hover-expand";
import { BookingSection } from "./BookingSection";
import { TicketPassModal } from "./TicketPassModal";
import { FREEDOM_FIGHTERS, ICONIC_MOMENTS } from "@/lib/galleryData";
import type { GalleryEntry } from "@/lib/galleryData";
import { 
  Volume2, VolumeX, User, 
  Ticket, X, ExternalLink, ArrowDown, ShieldCheck,
  Mail, Phone, MessageCircle, BookOpen
} from "lucide-react";
import { HistoryScreen } from "./HistoryScreen";

interface MainLayoutProps {
  onSignOut: () => void;
}

// ---------- Reusable section-reveal wrapper ----------
function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.82, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ---------- Stagger-reveal header block ----------
function RevealHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const base = align === "center" ? "flex flex-col items-center text-center gap-3" : "flex flex-col items-start gap-3";

  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
  };

  return (
    <motion.div
      ref={ref}
      className={base}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.span
        variants={child}
        className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={child}
        className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={child} className="text-xs text-zinc-400 max-w-md">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export const MainLayout: React.FC<MainLayoutProps> = ({ onSignOut }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // User & DB data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userBookings, setUserBookings] = useState<BookingRecord[]>([]);

  // Selected Gallery Card Detail Modal State
  const [activeCard, setActiveCard] = useState<GalleryEntry | null>(null);

  // Selected Pass Modal State (for viewing past passes from dashboard)
  const [selectedPassForModal, setSelectedPassForModal] = useState<BookingRecord | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  // ─── Lenis Smooth Scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ─── Hero 3D Scroll Canvas (Fixed Position, Lenis-synced) ─────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null); // center nav links — fade out past hero
  const images = getHeroImages();

  // Total spacer height. Frame scrub range = HERO_SCROLL_HEIGHT_VH - 100 (viewport).
  // Reducing to 380vh removes the 100vh dead-zone that was stuck on the last frame.
  const HERO_SCROLL_HEIGHT_VH = 380;

  const drawCoverImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    width: number,
    height: number
  ) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    let drawWidth, drawHeight, drawX, drawY;
    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      drawX = (width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      drawX = 0;
      drawY = (height - drawHeight) / 2;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  const drawFrameAtIndex = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = images[Math.min(599, Math.max(0, Math.round(idx)))];
    if (img && img.complete) {
      drawCoverImage(ctx, img, canvas.width, canvas.height);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    // Redraw current frame after resize
    const heroScrollPx = window.innerHeight * (HERO_SCROLL_HEIGHT_VH / 100 - 1);
    const progress = Math.min(1, Math.max(0, window.scrollY / heroScrollPx));
    drawFrameAtIndex(progress * 599);
  };

  const { scrollY } = useScroll();

  // Tagline opacity/y based on scroll progress (directly from scrollY, immediately visible on mount)
  const heroContentOpacity = useTransform(scrollY, (y: number) => {
    const maxScroll = window.innerHeight * (HERO_SCROLL_HEIGHT_VH / 100 - 1);
    if (maxScroll <= 0) return 1;
    const p = Math.min(1, Math.max(0, y / maxScroll));
    if (p <= 0.15) {
      return 1 - p / 0.15; // 1 -> 0
    } else if (p < 0.8) {
      return 0; // hidden while user scrubs through middle 3D sequence
    } else if (p <= 0.95) {
      return (p - 0.8) / 0.15; // 0 -> 1 fade back in at end of 3D effect
    } else {
      return 1;
    }
  });

  const heroContentY = useTransform(scrollY, (y: number) => {
    const maxScroll = window.innerHeight * (HERO_SCROLL_HEIGHT_VH / 100 - 1);
    if (maxScroll <= 0) return "0%";
    const p = Math.min(1, Math.max(0, y / maxScroll));
    if (p <= 0.15) {
      return `${-(p / 0.15) * 8}%`;
    } else if (p < 0.8) {
      return "-8%";
    } else if (p <= 0.95) {
      return `${(1 - (p - 0.8) / 0.15) * 8}%`;
    } else {
      return "0%";
    }
  });

  // Canvas scrub driven by Lenis scroll events (RAF-synced, buttery smooth).
  // Falls back to native window scroll if Lenis isn't ready yet.
  useEffect(() => {
    let lastIdx = -1;

    const heroScrollPx = () => window.innerHeight * (HERO_SCROLL_HEIGHT_VH / 100 - 1);
    const heroPxTotal = () => window.innerHeight * (HERO_SCROLL_HEIGHT_VH / 100);

    const updateFrame = (scrollPosition: number) => {
      const progress = Math.min(1, Math.max(0, scrollPosition / heroScrollPx()));
      const idx = Math.round(progress * 599);
      if (idx !== lastIdx) {
        lastIdx = idx;
        drawFrameAtIndex(idx);
      }

      // Hide canvas once scrolled past hero so it never peeks through edges or behind sections
      if (canvasRef.current) {
        const pastHero = scrollPosition >= heroPxTotal() - 50;
        canvasRef.current.style.opacity = pastHero ? "0" : "1";
        canvasRef.current.style.visibility = pastHero ? "hidden" : "visible";
      }

      // Fade center nav links out once past the hero spacer
      if (navLinksRef.current) {
        const past = scrollPosition > heroPxTotal() - 80;
        navLinksRef.current.style.opacity = past ? "0" : "1";
        navLinksRef.current.style.pointerEvents = past ? "none" : "auto";
      }
    };

    // Use Lenis for frame updates (in sync with Lenis RAF loop)
    const lenis = lenisRef.current;
    if (lenis) {
      const lenisHandler = (e: any) => updateFrame(e.scroll);
      lenis.on("scroll", lenisHandler);
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => {
        lenis.off("scroll", lenisHandler);
        window.removeEventListener("resize", resizeCanvas);
      };
    }

    // Fallback: native scroll
    let rafId: number;
    const nativeHandler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateFrame(window.scrollY));
    };
    window.addEventListener("scroll", nativeHandler, { passive: true });
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("scroll", nativeHandler);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafId);
    };
  }, [images, showHistory]);

  useEffect(() => {
    loadUserData();
  }, []);

  // Scroll to top instantly when showHistory toggles to prevent scroll jump and canvas rendering glitches.
  // Synchronized with Lenis virtual scroll state to prevent scroll restoring conflicts.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [showHistory]);

  const loadUserData = async () => {
    const user = databaseService.getCurrentUser();
    if (user) {
      setUserProfile(user);
    }
    const bookingsRes = await databaseService.getBookings();
    if (bookingsRes.success && bookingsRes.bookings) {
      setUserBookings(bookingsRes.bookings);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = audioManager.toggleMute();
    setIsPlaying(!muted);
  };

  const handleCardClick = (entryOrIndex: any) => {
    let found: GalleryEntry | undefined;
    if (typeof entryOrIndex === "number") {
      found = FREEDOM_FIGHTERS[entryOrIndex];
    } else if (typeof entryOrIndex === "string") {
      found = FREEDOM_FIGHTERS.find(f => f.text.toLowerCase() === entryOrIndex.toLowerCase());
    } else if (typeof entryOrIndex === "object" && entryOrIndex?.text) {
      found = FREEDOM_FIGHTERS.find(f => f.text.toLowerCase() === entryOrIndex.text.toLowerCase());
    }
    if (found) {
      setActiveCard(found);
    }
  };

  const scrollToBooking = () => {
    setIsDrawerOpen(false);
    document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookingCompleted = async (newRecord: any) => {
    await databaseService.createBooking(
      newRecord.date,
      newRecord.adults + newRecord.children,
      newRecord.adults,
      newRecord.children,
      newRecord.city
    );
    loadUserData();
  };

  if (showHistory) {
    return <HistoryScreen onBack={() => setShowHistory(false)} />;
  }

  return (
    // No flex-col needed — fixed elements handle the hero, block sections stack below the spacer
    <div className="relative bg-[#050507] text-zinc-100 font-sans selection:bg-orange-600/30">

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — FIXED CANVAS (always rendered)
          Canvas lives at z:5. Top/bottom gradients at z:6. Tagline at z:7. Navbar at z:30.
          All content sections are wrapped in a z:20 container with solid bg-[#050507],
          so they naturally slide OVER the canvas as the user scrolls past the hero spacer.
          No sudden disappearance — one continuous smooth scroll from hero to footer.
          ═══════════════════════════════════════════════════════════════ */}

      {/* Canvas — always fixed, sits behind everything, frame drawn by Lenis scroll events */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none bg-black"
        style={{ zIndex: 5, transition: "opacity 0.25s ease, visibility 0.25s ease" }}
      />

      {/* Bottom fade — blends canvas into page bg color */}
      <div
        className="fixed inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none"
        style={{ zIndex: 6 }}
      />

      {/* Top gradient — darkens above tagline for navbar readability */}
      <div
        className="fixed inset-x-0 top-0 h-44 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none"
        style={{ zIndex: 6 }}
      />

      {/* ── NAVBAR — fixed, z:30. Logo + profile always visible.
               Center links fade out past the hero using direct DOM (no re-renders). */}
      <nav
        className="fixed top-0 left-0 right-0 px-12 py-8 flex items-center justify-between bg-transparent border-none shadow-none"
        style={{ zIndex: 30 }}
      >
        {/* Left: Brand — always visible */}
        <div className="flex items-center gap-3">
          <h1
            onClick={scrollToTop}
            className="text-2xl font-extrabold text-red-600 tracking-tight cursor-pointer select-none"
            style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}
          >
            POWERHOUSE
          </h1>
        </div>

        {/* Center: Nav links — absolutely centered, fade out past hero */}
        <div
          ref={navLinksRef}
          className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
          style={{ transition: "opacity 0.4s ease" }}
        >
          <button
            onClick={() => document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" })}
            className="text-[11px] font-sans tracking-widest text-zinc-300 hover:text-white uppercase transition-colors cursor-pointer bg-transparent border-none"
          >
            Museums
          </button>
          <button
            onClick={scrollToBooking}
            className="text-[11px] font-sans tracking-widest text-zinc-300 hover:text-white uppercase transition-colors cursor-pointer bg-transparent border-none"
          >
            Book Pass
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="text-[11px] font-sans tracking-widest text-zinc-300 hover:text-white uppercase transition-colors cursor-pointer bg-transparent border-none"
          >
            About India
          </button>
        </div>

        {/* Right: Profile + sound — always visible */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 border border-white/25 rounded-full px-4 py-2 bg-white/5 backdrop-blur-md">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 text-white/90 hover:text-white font-sans text-[10px] tracking-widest uppercase cursor-pointer transition-colors bg-transparent border-none"
            >
              <User size={12} className="text-white/80" />
              <span className="max-w-[100px] truncate">{userProfile?.name || "Account"}</span>
            </button>
            <div className="w-[1px] h-3 bg-white/20" />
            <button
              onClick={toggleSound}
              className="text-white/80 hover:text-white transition-colors cursor-pointer flex items-center justify-center bg-transparent border-none"
              title={isPlaying ? "Mute Background Music" : "Play Background Music"}
            >
              {isPlaying ? <Volume2 size={13} className="text-white" /> : <VolumeX size={13} className="text-zinc-400" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO TAGLINE — fixed center, fades out/in with scroll progress ─────── */}
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 py-20 pointer-events-none"
        style={{ opacity: heroContentOpacity, y: heroContentY, zIndex: 7 }}
      >
        <h2
          className="text-6xl md:text-8xl lg:text-[9rem] text-white font-light tracking-tight text-center leading-[0.95] select-none"
          style={{ fontFamily: "'Playfair Display', 'Italiana', Georgia, serif" }}
        >
          Incredible <br />
          <span className="italic font-normal">India</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-300 max-w-xl text-center font-sans tracking-wide leading-relaxed mt-6">
          A magical mix of colorful culture, friendly locals and stunning nature
        </p>
        <button
          onClick={() => document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" })}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-zinc-200 transition-all cursor-pointer mt-8 shadow-lg animate-bounce pointer-events-auto"
        >
          <ArrowDown size={18} className="text-black" />
        </button>
      </motion.div>

      {/* Spacer — provides scroll height for the 3D hero sequence.
           flex-shrink-0 prevents outer flex containers from collapsing it. */}
      <div
        style={{ height: `${HERO_SCROLL_HEIGHT_VH}vh` }}
        className="flex-shrink-0"
        aria-hidden="true"
      />

      {/* ───────────────────────────────────────────────────────────────
           CONTENT SECTIONS — z:20 isolation layer with solid background.
           bg-[#050507] covers the canvas fully so it can never bleed through.
           isolation:isolate keeps all child stacking contexts self-contained.
           ─────────────────────────────────────────────────────────────── */}
      <div 
        className="w-full relative z-20 overflow-hidden bg-[#050507]" 
        style={{ isolation: "isolate", minHeight: "100vh", backgroundColor: "#050507" }}
      >

      {/* ═══════════════════════════════════════════════════════════════
          2. CIRCULAR GALLERY SECTION — stagger reveal
          ═══════════════════════════════════════════════════════════════ */}
      <section id="gallery-section" className="w-full py-24 px-4 bg-[#050507] relative border-t border-white/5">
        {/* Subtle ambient radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-3 mb-10 relative z-10">
          <RevealHeader
            eyebrow="3D Archival Exhibition"
            title="Freedom Fighters & Historical Events"
            subtitle="Drag horizontally to rotate through cards. Click any card to inspect verified historical records."
            align="center"
          />
        </div>

        <RevealSection delay={0.1}>
          <div className="w-full h-[600px] relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
            <CircularGallery
              items={FREEDOM_FIGHTERS.map(f => ({ image: f.image, text: f.text }))}
              bend={2.5}
              textColor="#ffffff"
              borderRadius={0.06}
              onCardClick={handleCardClick}
            />
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. ICONIC MOMENTS — HOVER EXPAND — stagger + counter-parallax
          ═══════════════════════════════════════════════════════════════ */}
      <IconicMomentsSection onScrollToBooking={scrollToBooking} />

      {/* ═══════════════════════════════════════════════════════════════
          4. BOOKING SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <BookingSectionWrapper
        userEmail={userProfile?.email}
        userName={userProfile?.name}
        onBookingComplete={handleBookingCompleted}
        onReturnToHero={scrollToTop}
      />

      {/* ═══════════════════════════════════════════════════════════════
          5. FOOTER
          ═══════════════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════════════
          5. FOOTER — POWERHOUSE TECH. STYLE (Expanded & Rich)
          ═══════════════════════════════════════════════════════════════ */}
      <footer className="w-full bg-[#050507] border-t border-white/10 pt-20 pb-12 px-6 md:px-16 text-zinc-400 font-sans relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-950/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
          {/* Main Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Col 1: Brand & Exhibition Mission (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5 text-left">
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl md:text-4xl font-extrabold text-red-600 tracking-tight select-none cursor-pointer"
                  style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}
                  onClick={scrollToTop}
                >
                  POWERHOUSE
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  Digital Museum
                </span>
              </div>

              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-md font-sans">
                An immersive 3D digital museum and verified archival exhibition commemorating the 80th Independence Day of India. Built to preserve national heritage, celebrate unsung freedom fighters, and inspire modern innovators.
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Digital Archive
                </span>
              </div>
            </div>

            {/* Col 2: Navigation & Sections (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
                Exhibition
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
                <li>
                  <button
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    3D Hero Parallax
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    Freedom Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollToBooking}
                    className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    Guided Tour Passes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowHistory(true)}
                    className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    About India & History
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Student Engineering Credits & USNs (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
                Creators & USN
              </span>
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex flex-col">
                  <span className="text-white font-medium">Arjun V</span>
                  <span className="text-[11px] font-mono text-[#ff6b35] tracking-wider">1EP24IC007</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium">Harsh Jangir</span>
                  <span className="text-[11px] font-mono text-[#ff6b35] tracking-wider">1EP24IC012</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium">Jeevan Jaikumar</span>
                  <span className="text-[11px] font-mono text-[#ff6b35] tracking-wider">1EP24IC015</span>
                </div>
              </div>
            </div>

            {/* Col 4: powerhouse-tech.site Connect Links (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
                Get In Touch
              </span>
              <div className="flex flex-col gap-3 text-xs">
                <a
                  href="mailto:contact@powerhouse-tech.site"
                  className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors group"
                >
                  <Mail size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span>Email Us</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors group"
                >
                  <Phone size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span>Call Us</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors group"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-zinc-500 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors group"
                >
                  <MessageCircle size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://powerhouse-tech.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors group"
                >
                  <BookOpen size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span>Blog & Insights</span>
                </a>
              </div>
            </div>

          </div>


          {/* Bottom Legal & MSME Bar */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] font-mono text-zinc-500">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Registered MSME</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">UDYAM-KR-03-0720445</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>© 2026 POWERHOUSE. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Close the z:20 content isolation wrapper — modals are fixed so they live outside it */}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          6. USER DASHBOARD MODAL
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Centered Modal Content (Revamped Dashboard Layout) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-[#0c0c0e]/95 border border-white/10 rounded-[36px] p-6 md:p-8 flex flex-col gap-6 shadow-2xl overflow-hidden z-10 my-auto backdrop-blur-3xl font-sans text-left min-h-[550px]"
            >
              {/* Top Tricolor Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

              {/* 2. MAIN CONTENT AREA (FLEX-1) */}
              <div className="flex-1 flex flex-col gap-6">
                
                {/* Dashboard Header Bar */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">My Dashboard</h3>
                    <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">Museum access profile</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-bold text-zinc-300 block">{userProfile?.name || "Guest Visitor"}</span>
                      <span className="text-[10px] font-mono text-zinc-500 block">{userProfile?.email}</span>
                    </div>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Dashboard Two-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* LEFT PANEL (Col-span-2): Metrics, Chart, and Progress */}
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* Metrics Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Booking count */}
                      <div className="bg-[#18181c]/60 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <Ticket size={18} />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Passes Issued</span>
                          <span className="text-lg font-bold text-white block">{userBookings.length} Visits</span>
                        </div>
                      </div>

                      {/* Age card */}
                      <div className="bg-[#18181c]/60 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                          <User size={18} />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Visitor Profile</span>
                          <span className="text-lg font-bold text-white block">{userProfile?.age ? `${userProfile.age} Yrs` : "N/A"}</span>
                        </div>
                      </div>

                      {/* Status card */}
                      <div className="bg-[#18181c]/60 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35]">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">ID Status</span>
                          <span className="text-lg font-bold text-white block">Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Statistic Graph panel */}
                    <div className="bg-[#18181c]/40 border border-white/5 p-5 rounded-[24px] flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-white">Visitor Insights</h4>
                          <span className="text-[10px] text-zinc-500">Monthly booking activity overview</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          Active Season
                        </span>
                      </div>
                      
                      {/* Beautiful Custom Wave SVG Graph */}
                      <div className="relative">
                        <svg className="w-full h-28" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Grid Lines */}
                          <line x1="0" y1="20" x2="500" y2="20" stroke="white" strokeOpacity="0.03" />
                          <line x1="0" y1="60" x2="500" y2="60" stroke="white" strokeOpacity="0.03" />
                          <line x1="0" y1="100" x2="500" y2="100" stroke="white" strokeOpacity="0.03" />
                          
                          {/* Saffron Wave Line */}
                          <path
                            d="M10,95 Q80,25 160,80 T310,45 T480,95"
                            stroke="#ff6b35"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          
                          {/* White Wave Line */}
                          <path
                            d="M10,105 Q90,55 170,95 T320,65 T480,80"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeOpacity="0.25"
                            strokeLinecap="round"
                            strokeDasharray="4 4"
                          />
                          
                          {/* Dot highlight on active node */}
                          <circle cx="160" cy="80" r="4.5" fill="#ff6b35" />
                          <circle cx="160" cy="80" r="9" stroke="#ff6b35" strokeOpacity="0.3" strokeWidth="1.5" />
                        </svg>
                        
                        {/* Month labels under chart */}
                        <div className="flex justify-between text-[9px] font-mono text-zinc-500 px-2 mt-1">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Rings/Bars Panel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Coverage Ring */}
                      <div className="bg-[#18181c]/60 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex flex-col gap-1 text-left">
                          <span className="text-xs font-bold text-white">Museum Coverage</span>
                          <span className="text-[10px] text-zinc-500">Museum branches explored</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-[#ff6b35]">78%</span>
                          <div className="w-10 h-10 rounded-full border-[3px] border-zinc-700 border-t-[#ff6b35] rotate-45" />
                        </div>
                      </div>

                      {/* Reading progression */}
                      <div className="bg-[#18181c]/60 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex flex-col gap-1 w-full mr-4 text-left">
                          <div className="flex justify-between w-full">
                            <span className="text-xs font-bold text-white">Significance Reading</span>
                            <span className="text-xs font-black text-white">97%</span>
                          </div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: "97%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE PANEL (Col-span-1): Premium Pass & Past Bookings */}
                  <div className="flex flex-col gap-6">
                    
                    {/* Membership Pass Card */}
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 rounded-3xl p-5 relative overflow-hidden shadow-xl min-h-[170px] flex flex-col justify-between">
                      {/* Glossy radial blur */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff6b35]/15 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Logo and chip */}
                      <div className="flex justify-between items-center">
                        <div className="w-8 h-6 bg-amber-500/15 border border-amber-500/25 rounded-md relative flex flex-col justify-between p-0.5">
                          <div className="border-b border-amber-500/20 h-1/2 w-full" />
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-amber-500/20 h-full" />
                        </div>
                        <span 
                          className="text-red-500 font-extrabold uppercase italic tracking-[0.12em] text-[11px]"
                          style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}
                        >
                          POWERHOUSE MEMBER
                        </span>
                      </div>

                      {/* Ref code placeholder */}
                      <div className="my-2 text-zinc-400 font-mono text-xs tracking-[0.22em] text-left">
                        •••• •••• •••• {userBookings[0]?.ticket_ref?.split("-")[1] || "GUEST"}
                      </div>

                      {/* Footer Metadata */}
                      <div className="flex justify-between items-end border-t border-white/5 pt-3 text-left">
                        <div>
                          <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block">Visitor</span>
                          <span className="text-[11px] font-bold text-white uppercase block mt-0.5 truncate max-w-[100px]">
                            {userProfile?.name || "Guest Visitor"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block">Total Spent</span>
                          <span className="text-[11px] font-extrabold text-[#ff6b35] block mt-0.5">
                            ₹{userBookings.reduce((sum, b) => sum + ((b.adults ?? 1) * 1000 + (b.children ?? 0) * 500), 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bookings List */}
                    <div className="flex-1 flex flex-col gap-3 min-h-[190px]">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold text-left">
                        ACTIVE ACCESS PASSES
                      </span>

                      {userBookings.length === 0 ? (
                        <div className="flex-1 p-6 rounded-2xl border border-dashed border-white/10 text-center flex flex-col items-center justify-center gap-2 text-zinc-600 bg-white/[0.01]">
                          <Ticket size={24} />
                          <span className="text-[11px] font-semibold text-zinc-400 block">No passes issued yet</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2.5 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
                          {userBookings.map((b, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedPassForModal(b)}
                              className="p-3.5 rounded-2xl bg-[#18181c]/60 border border-white/5 hover:border-[#ff6b35]/40 flex justify-between items-center cursor-pointer transition-all group"
                            >
                              <div className="flex flex-col gap-0.5 text-left">
                                <span className="font-bold text-xs text-white group-hover:text-[#ff6b35] transition-colors">
                                  {b.city}
                                </span>
                                <span className="text-[9px] font-mono text-zinc-500">
                                  ID: {b.ticket_ref} • {b.date}
                                </span>
                              </div>
                              <div className="px-2.5 py-1 rounded-full bg-white/5 group-hover:bg-[#ff6b35]/25 border border-white/5 text-[9px] font-mono text-zinc-300 font-bold transition-all uppercase tracking-wider">
                                View
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-white/5 pt-4 flex gap-2 w-full mt-auto">
                      <button
                        onClick={() => {
                          setIsDrawerOpen(false);
                          scrollToBooking();
                        }}
                        className="flex-1 py-3 bg-[#ff6b35] hover:bg-orange-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-all"
                      >
                        Reserve Visit
                      </button>
                      <button
                        onClick={onSignOut}
                        className="py-3 px-4 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-semibold rounded-xl text-xs cursor-pointer transition-all border border-white/5"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          7. DIGITAL PASS MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {selectedPassForModal && (
        <TicketPassModal
          ticket={selectedPassForModal}
          userName={userProfile?.name}
          userEmail={userProfile?.email}
          onClose={() => setSelectedPassForModal(null)}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          8. GALLERY CARD DETAIL MODAL
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0e0e12] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl z-10 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">Historical Record</span>
                  <h3 className="text-2xl font-bold text-white mt-1">{activeCard.text}</h3>
                  {activeCard.years && <p className="text-xs font-mono text-zinc-400">{activeCard.years} • {activeCard.region}</p>}
                </div>
                <button
                  onClick={() => setActiveCard(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 relative">
                <img src={activeCard.image} alt={activeCard.text} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs leading-relaxed text-zinc-300 font-sans">
                {activeCard.summary}
              </p>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
                <a
                  href={activeCard.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold rounded-full text-xs flex items-center gap-1.5 transition-all"
                >
                  <span>Verify Archive Record</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components with their own scroll contexts (avoids prop-drilling useScroll)
// ─────────────────────────────────────────────────────────────────────────────

function IconicMomentsSection({ onScrollToBooking: _ }: { onScrollToBooking: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle counter-scroll on the background to add depth
  const bgCounterY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-12 bg-[#08080c] relative border-t border-white/5 overflow-hidden"
    >
      {/* Counter-parallax decorative layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgCounterY }}
      >
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-red-950/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-amber-950/6 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
        <RevealHeader
          eyebrow="Chronological Highlights"
          title="Pivotal Moments of Independence"
          subtitle="Hover over each milestone to expand details and historic context."
          align="left"
        />

        <RevealSection delay={0.1}>
          <div className="w-full">
            <HoverExpand
              items={ICONIC_MOMENTS.map(m => ({
                label: m.label,
                sublabel: m.sublabel,
                image: m.image,
                description: m.description,
                wiki: m.wiki,
              }))}
              collapsedHeight={76}
              expandedHeight={340}
            />
          </div>
        </RevealSection>
      </div>
    </motion.section>
  );
}

function BookingSectionWrapper(props: {
  userEmail?: string;
  userName?: string;
  onBookingComplete?: (record: any) => void;
  onReturnToHero?: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Booking card scales subtly into view — "zooming in to a display case"
  const bookingScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const bookingOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ scale: bookingScale, opacity: bookingOpacity }}
      className="will-change-transform"
    >
      <BookingSection {...props} />
    </motion.div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Ticket, Check, ArrowRight, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";

interface BookingSectionProps {
  userEmail?: string;
  userName?: string;
  onBookingComplete?: (record: any) => void;
  onReturnToHero?: () => void;
}

const CITIES = [
  { id: "bangalore", name: "Bangalore", museum: "National Gallery of Modern Art & Heritage Hall" },
  { id: "chennai", name: "Chennai", museum: "Fort St. George National Heritage Complex" },
  { id: "delhi", name: "Delhi", museum: "Red Fort Freedom Fighters Museum" },
  { id: "kolkata", name: "Kolkata", museum: "Victoria Memorial Archive & Netaji Hall" },
  { id: "mumbai", name: "Mumbai", museum: "August Kranti Maidan Commemorative Museum" }
];

const MONTHS_DATA = [
  {
    name: "August",
    monthNumber: 8,
    year: 2026,
    daysCount: 31,
    prevDays: [30, 31],    // July 30–31 (Aug 1 = Saturday, start-of-week = Mon → 2 trailing)
    nextDays: [1, 2, 3]   // Sep 1–3
  },
  {
    name: "September",
    monthNumber: 9,
    year: 2026,
    daysCount: 30,
    prevDays: [31],        // Aug 31 (Sep 1 = Tue → 1 trailing)
    nextDays: [1, 2, 3, 4] // Oct 1–4
  },
  {
    name: "October",
    monthNumber: 10,
    year: 2026,
    daysCount: 31,
    prevDays: [],          // Oct 1 = Thu → 3 trailing Mon-Wed
    nextDays: [1, 2]
  },
  {
    name: "November",
    monthNumber: 11,
    year: 2026,
    daysCount: 30,
    prevDays: [],          // Nov 1 = Sun → 6 trailing Mon-Sat
    nextDays: [1, 2, 3, 4, 5]
  },
  {
    name: "December",
    monthNumber: 12,
    year: 2026,
    daysCount: 31,
    prevDays: [30, 31],    // Dec 1 = Tue → 1 trailing Mon
    nextDays: [1, 2, 3]
  }
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  userEmail = "",
  userName = "",
  onBookingComplete,
  onReturnToHero
}) => {
  // Calendar state
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [step, setStep] = useState<"calendar" | "form" | "paying" | "ticket">("calendar");

  // Custom Calendar Redesign state
  const [monthIndex, setMonthIndex] = useState<number>(0); // Start on August 2026
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);

  // Form inputs
  const [fullName, setFullName] = useState<string>(userName || "");
  const [email, setEmail] = useState<string>(userEmail || "");
  const [city, setCity] = useState<string>("delhi");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  // Ticket Pass Data
  const [ticketData, setTicketData] = useState<any>(null);

  const calculateTotal = () => {
    return (adults * 1000) + (children * 500);
  };

  const handleDateSelect = (day: number) => {
    setSelectedDayNumber(day);
    const currentM = MONTHS_DATA[monthIndex] || MONTHS_DATA[0];
    const monthNum = currentM.monthNumber.toString().padStart(2, "0");
    const formattedDate = `${currentM.year}-${monthNum}-${day.toString().padStart(2, "0")}`;
    setSelectedDate(formattedDate);
    setStep("form");
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("paying");

    setTimeout(() => {
      const ticketRef = `IND80-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const newRecord = {
        date: selectedDate,
        city: CITIES.find(c => c.id === city)?.name || city,
        museum: CITIES.find(c => c.id === city)?.museum,
        adults,
        children,
        num_people: adults + children,
        total: calculateTotal(),
        ticketRef,
        ticket_ref: ticketRef,
        name: fullName || "Valued Visitor",
        email: email || "visitor@museum.in"
      };

      setTicketData(newRecord);
      setStep("ticket");
      if (onBookingComplete) {
        onBookingComplete(newRecord);
      }
    }, 1500);
  };

  const handleCloseTicket = () => {
    setStep("calendar");
    setSelectedDate("");
    setTicketData(null);
    if (onReturnToHero) {
      onReturnToHero();
    }
  };

  return (
    <section id="booking-section" className="w-full py-20 px-4 md:px-12 bg-[#08080a] text-zinc-100 relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-950/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
            Guided Tour Reservation
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Plan Your Guided Museum Visit
          </h2>
          <p className="text-xs text-zinc-400 max-w-lg mt-1 font-sans">
            Select a date below to reserve physical guided access to verified freedom archives across 5 major metro locations.
          </p>
        </div>

        {/* Sliding Skyscanner-Style Container */}
        <div className="w-full bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden min-h-[520px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: CALENDAR VIEW (Reference Screenshot Redesign - Clean Version) */}
            {step === "calendar" && (
              <motion.div
                key="calendar-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-lg mx-auto bg-[#1c1c1f] border border-white/10 rounded-[36px] p-6 md:p-8 shadow-2xl backdrop-blur-3xl font-sans"
              >
                {/* Top Header Row */}
                <div className="flex items-center justify-between mb-6 px-1">
                  {/* Month title + Navigation Arrows */}
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-medium text-white tracking-tight">
                      {(MONTHS_DATA[monthIndex] || MONTHS_DATA[3]).name}
                    </h3>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <button
                        type="button"
                        onClick={() => setMonthIndex((prev) => (prev > 0 ? prev - 1 : MONTHS_DATA.length - 1))}
                        className="p-1.5 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                        title="Previous Month"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMonthIndex((prev) => (prev < MONTHS_DATA.length - 1 ? prev + 1 : 0))}
                        className="p-1.5 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                        title="Next Month"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Step Badge */}
                  <div className="text-[11px] font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-zinc-400 uppercase tracking-wider">
                    Select Date
                  </div>
                </div>

                {/* Weekday Capsule Header */}
                <div className="bg-[#27272a]/90 rounded-2xl py-2.5 px-3 flex items-center justify-between mb-4 shadow-inner">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                    <div
                      key={day}
                      className={`w-9 text-center text-xs font-medium ${
                        idx === 6 ? "text-white font-bold bg-[#38383c] py-1 rounded-xl shadow-sm" : "text-zinc-400"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-7 gap-y-3 gap-x-1.5 text-center items-center justify-items-center py-1">
                  {/* Prev Month Trailing Days */}
                  {((MONTHS_DATA[monthIndex] || MONTHS_DATA[3]).prevDays || []).map((d) => (
                    <div key={`prev-${d}`} className="w-9 h-9 flex items-center justify-center text-xs font-medium text-[#52525b]">
                      {d}
                    </div>
                  ))}

                  {/* Current Month Active Days */}
                  {Array.from({ length: (MONTHS_DATA[monthIndex] || MONTHS_DATA[3]).daysCount || 31 }, (_, i) => i + 1).map((day) => {
                    const isSelected = selectedDayNumber === day;

                    return (
                      <motion.button
                        key={day}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDateSelect(day)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#ff6b35] text-white font-bold shadow-lg shadow-orange-600/40"
                            : "text-[#e4e4e7] hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        {day}
                      </motion.button>
                    );
                  })}

                  {/* Next Month Leading Days */}
                  {((MONTHS_DATA[monthIndex] || MONTHS_DATA[3]).nextDays || []).map((d) => (
                    <div key={`next-${d}`} className="w-9 h-9 flex items-center justify-center text-xs font-medium text-[#52525b]">
                      {d}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: BOOKING DETAILS FORM */}
            {step === "form" && (
              <motion.div
                key="form-step"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                {/* Form Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep("calendar")}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer font-mono"
                    >
                      ← Change Date
                    </button>
                    <span className="text-zinc-600">|</span>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Ticket className="text-red-500" size={18} />
                      <span>Configure Tour Details ({selectedDate})</span>
                    </h3>
                  </div>
                  <div className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-zinc-400">
                    Step 2 of 2
                  </div>
                </div>

                <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Details */}
                  <div className="flex flex-col gap-5">
                    {/* Visitor Name */}
                    <div>
                      <label className="text-xs text-zinc-400 uppercase tracking-wider font-mono block mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter primary visitor name"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-zinc-400 uppercase tracking-wider font-mono block mb-1.5">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="visitor@domain.com"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>

                    {/* City / Museum Selection */}
                    <div>
                      <label className="text-xs text-zinc-400 uppercase tracking-wider font-mono block mb-1.5">
                        Select Museum Branch
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {CITIES.map(c => (
                          <label
                            key={c.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              city === c.id
                                ? "bg-red-950/30 border-red-500/50 text-white"
                                : "bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="city"
                                value={c.id}
                                checked={city === c.id}
                                onChange={() => setCity(c.id)}
                                className="accent-red-500"
                              />
                              <div>
                                <span className="text-sm font-semibold text-white">{c.name}</span>
                                <p className="text-[11px] text-zinc-400">{c.museum}</p>
                              </div>
                            </div>
                            <MapPin size={16} className={city === c.id ? "text-red-400" : "text-zinc-600"} />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Headcount & Bill Summary */}
                  <div className="flex flex-col justify-between gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <div className="flex flex-col gap-6">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300 border-b border-white/5 pb-2">
                        Headcount & Pricing
                      </h4>

                      {/* Adult Counter */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-semibold text-white">Adults</span>
                          <p className="text-xs text-zinc-500">₹1,000 / person</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono text-sm font-bold text-white">{adults}</span>
                          <button
                            type="button"
                            onClick={() => setAdults(adults + 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children Counter */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-semibold text-white">Children (Below 12)</span>
                          <p className="text-xs text-zinc-500">₹500 / child</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono text-sm font-bold text-white">{children}</span>
                          <button
                            type="button"
                            onClick={() => setChildren(children + 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Bill Calculation Breakdown */}
                      <div className="border-t border-white/10 pt-4 flex flex-col gap-2 font-mono text-xs text-zinc-400">
                        <div className="flex justify-between">
                          <span>Adult Tickets ({adults} × ₹1,000)</span>
                          <span>₹{(adults * 1000).toLocaleString()}</span>
                        </div>
                        {children > 0 && (
                          <div className="flex justify-between">
                            <span>Child Tickets ({children} × ₹500)</span>
                            <span>₹{(children * 500).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-white font-bold text-sm border-t border-white/10 pt-3">
                          <span>Total Payable</span>
                          <span className="text-red-400 text-lg">₹{calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pay Now Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-sans font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider text-xs"
                    >
                      <CreditCard size={16} />
                      <span>Pay Now & Issue Ticket Pass</span>
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: PROCESSING PAYMENT */}
            {step === "paying" && (
              <motion.div
                key="paying-step"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-mono text-zinc-300">Processing secure payment & generating Official Tricolor Pass...</p>
              </motion.div>
            )}

            {/* STEP 4: TRICOLOR DIGITAL TICKET PASS */}
            {step === "ticket" && ticketData && (
              <motion.div
                key="ticket-step"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-4 gap-6"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Check className="p-0.5 bg-emerald-500/20 rounded-full" size={18} />
                  <span>Payment Successful! Official Pass Issued</span>
                </div>

                {/* Redesigned Coupon Stub Ticket Container */}
                <div className="w-full max-w-2xl bg-transparent flex flex-col sm:flex-row items-stretch select-none relative filter drop-shadow-2xl text-left">
                  
                  {/* LEFT MAIN CARD */}
                  <div className="flex-1 bg-white rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[220px] border-t border-r border-l sm:border-r-0 sm:border-b border-zinc-200">
                    {/* Top Accent Stripe (Saffron) */}
                    <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FF9933]" />
                    
                    {/* Top Logo and Price Row */}
                    <div className="flex justify-between items-center mt-1">
                      <span 
                        className="text-red-600 font-extrabold uppercase italic text-lg leading-none"
                        style={{ 
                          fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                          letterSpacing: "0.24em"
                        }}
                      >
                        POWERHOUSE
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 font-bold bg-zinc-100 px-2 py-0.5 rounded">
                        [PRICE: ₹{(ticketData.total || 0).toLocaleString()}]
                      </span>
                    </div>

                    {/* Big Center Display Title */}
                    <div className="my-5">
                      <h4 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
                        MUSEUM PASS
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                        Official Entry Reservation
                      </p>
                    </div>

                    {/* Details Row */}
                    <div className="flex justify-between items-end gap-4 border-t border-zinc-100 pt-4">
                      {/* Visitor and Date */}
                      <div className="flex flex-col gap-1.5">
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">VISITOR</span>
                          <span className="text-xs font-bold text-zinc-800 uppercase block truncate max-w-[130px]">{ticketData.name}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">DATE</span>
                          <span className="text-xs font-mono font-bold text-zinc-800 block">[{ticketData.date}]</span>
                        </div>
                      </div>

                      {/* Location Branch & Pass ID */}
                      <div className="flex flex-col gap-1.5">
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">PASS ID</span>
                          <span className="text-xs font-mono font-bold text-zinc-800 block">{ticketData.ticketRef}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">LOCATION</span>
                          <span className="text-xs font-bold text-zinc-800 block">{ticketData.city}</span>
                        </div>
                      </div>

                      {/* Barcode representation */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 w-24 bg-zinc-900 rounded p-1 flex items-center justify-between overflow-hidden">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-full bg-white"
                              style={{
                                width: i % 3 === 0 ? "2px" : i % 2 === 0 ? "1px" : "1.5px",
                                opacity: i % 4 === 0 ? 0.7 : 1
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-[8px] font-mono text-zinc-400">ACCESS PERMIT</span>
                      </div>
                    </div>
                  </div>

                  {/* PERFORATED SEPARATOR WITH BITES */}
                  <div className="w-full h-[2px] sm:w-[2px] sm:h-auto bg-white flex sm:flex-col items-center justify-between relative">
                    {/* Top Bite Circle */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 sm:top-0 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-5 h-5 rounded-full bg-[#08080a] z-20" />
                    {/* Bottom Bite Circle */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 w-5 h-5 rounded-full bg-[#08080a] z-20" />
                    {/* Dashed perforated line */}
                    <div className="w-full sm:w-0 sm:h-full border-t-2 sm:border-l-2 border-dashed border-zinc-200 self-stretch my-2" />
                  </div>

                  {/* RIGHT STUB */}
                  <div className="w-full sm:w-[200px] bg-[#138808] rounded-b-3xl sm:rounded-b-none sm:rounded-r-3xl p-5 flex flex-col justify-between relative overflow-hidden border-b border-r border-l sm:border-l-0 sm:border-t border-[#0e6205] text-white min-h-[220px]">
                    {/* Top Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#107006] hidden sm:block" />

                    {/* QR Code and Meta Row */}
                    <div className="flex justify-between items-start">
                      {/* Placeholder QR Grid */}
                      <div className="w-12 h-12 bg-white rounded p-1 flex flex-col justify-between">
                        {Array.from({ length: 4 }).map((_, r) => (
                          <div key={r} className="flex justify-between h-2">
                            {Array.from({ length: 4 }).map((_, c) => (
                              <div
                                key={c}
                                className={`w-2 h-2 rounded-sm ${
                                  (r + c) % 2 === 0 ? "bg-black" : "bg-white"
                                }`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      
                      {/* Rotated Vertical Stub Metadata */}
                      <div className="text-right">
                        <span className="text-[8px] font-mono text-emerald-100 uppercase tracking-widest block font-bold">MUSEUM ACCESS</span>
                        <span className="text-[9px] font-bold text-white uppercase block mt-0.5 truncate max-w-[110px]">{ticketData.name}</span>
                        <span className="text-[8px] font-mono text-emerald-100 block">{ticketData.date}</span>
                      </div>
                    </div>

                    {/* Tour Start Time */}
                    <div className="my-3">
                      <span className="text-[9px] font-mono text-emerald-100 uppercase tracking-wider block">TOUR TIME</span>
                      <span className="text-2xl font-black tracking-tight block mt-0.5">10:00 AM</span>
                    </div>

                    {/* Web Link at the bottom */}
                    <div className="border-t border-emerald-500/40 pt-3 text-center">
                      <span className="text-[9px] font-mono text-emerald-100 hover:underline">
                        [powerhouse-tech.site]
                      </span>
                    </div>
                  </div>
                </div>

                {/* Return to Hero Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseTicket}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-sans font-semibold rounded-full cursor-pointer transition-all text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Close Pass & Return to Main Hall</span>
                  <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

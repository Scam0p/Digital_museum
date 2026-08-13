import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BookingRecord } from "@/lib/databaseService";

interface TicketPassModalProps {
  ticket: BookingRecord | any | null;
  userName?: string;
  userEmail?: string;
  onClose: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  ticket,
  userName,
  onClose,
}) => {
  if (!ticket) return null;

  const visitorName = ticket.name || userName || "Valued Visitor";
  const city = ticket.city || "Delhi";
  const date = ticket.date || "2026-08-15";
  const ticketRef = ticket.ticket_ref || ticket.ticketRef || `IND80-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const totalAmount = ticket.total || ((ticket.adults ?? 1) * 1000 + (ticket.children ?? 0) * 500);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-transparent z-10 flex flex-col items-center gap-6 my-auto"
        >
          {/* Redesigned Coupon Stub Ticket Container */}
          <div className="w-full bg-transparent flex flex-col sm:flex-row items-stretch select-none relative filter drop-shadow-2xl text-left">
            
            {/* LEFT MAIN CARD */}
            <div className="flex-1 bg-white rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[220px] border-t border-r border-l sm:border-r-0 sm:border-b border-zinc-200">
              {/* Top Accent Stripe (Saffron) */}
              <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FF9933]" />
              
              {/* Top Logo and Price Row */}
              <div className="flex justify-between items-center mt-1">
                {/* Red Powerhouse logo in Impact font */}
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
                  [PRICE: ₹{(totalAmount || 0).toLocaleString()}]
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
                    <span className="text-xs font-bold text-zinc-800 uppercase block truncate max-w-[130px]">{visitorName}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">DATE</span>
                    <span className="text-xs font-mono font-bold text-zinc-800 block">[{date}]</span>
                  </div>
                </div>

                {/* Location Branch & Pass ID */}
                <div className="flex flex-col gap-1.5">
                  <div>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">PASS ID</span>
                    <span className="text-xs font-mono font-bold text-zinc-800 block">{ticketRef}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">LOCATION</span>
                    <span className="text-xs font-bold text-zinc-800 block">{city}</span>
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
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 sm:top-0 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-5 h-5 rounded-full bg-[#08080a]/90 z-20" />
              {/* Bottom Bite Circle */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 w-5 h-5 rounded-full bg-[#08080a]/90 z-20" />
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
                  <span className="text-[9px] font-bold text-white uppercase block mt-0.5 truncate max-w-[110px]">{visitorName}</span>
                  <span className="text-[8px] font-mono text-emerald-100 block">{date}</span>
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

          {/* Close Modal Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-sans font-semibold rounded-full cursor-pointer transition-all text-xs uppercase tracking-wider flex items-center gap-2"
          >
            Close Pass
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

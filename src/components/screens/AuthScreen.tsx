import React, { useState } from "react";
import { motion } from "framer-motion";
import { databaseService } from "@/lib/databaseService";
import { audioManager } from "@/lib/audioManager";
import { User, Mail, Phone, Calendar, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  
  // Registration fields
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Sign In
        const result = await databaseService.signIn(email);
        if (result.success) {
          audioManager.start();
          setSuccessMsg("Login successful! Entering digital archive...");
          setTimeout(() => {
            onAuthSuccess();
          }, 1800);
        } else {
          setError(result.error || "Authentication failed.");
        }
      } else {
        // Sign Up
        if (!name || !phone || !age) {
          setError("All profile fields are required.");
          setLoading(false);
          return;
        }

        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum) || ageNum <= 0) {
          setError("Please enter a valid age.");
          setLoading(false);
          return;
        }

        const result = await databaseService.signUp(email, name, phone, ageNum, gender);
        if (result.success) {
          audioManager.start();
          setSuccessMsg("Registration successful! Creating profile...");
          setTimeout(() => {
            onAuthSuccess();
          }, 1800);
        } else {
          setError(result.error || "Registration failed.");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-zinc-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl z-10 flex flex-col gap-6 relative"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-1">
          <h1 
            className="text-4xl font-extrabold text-red-600 tracking-tight"
            style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
          >
            POWERHOUSE
          </h1>
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
            Archival Access Portal
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isLogin ? "bg-white/10 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              !isLogin ? "bg-white/10 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Error / Success Notifications */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              {/* Full Name */}
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Age Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 24"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        gender === g
                          ? "bg-red-950/40 border-red-500/50 text-white"
                          : "bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-2 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50"
          >
            <span>{loading ? "Verifying..." : isLogin ? "Access Archives" : "Register Account"}</span>
            <ArrowRight size={14} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface HistoryScreenProps {
  onBack: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-zinc-100 flex flex-col overflow-hidden select-none font-sans selection:bg-orange-600/30">
      <div className="absolute inset-0 z-0">
        <img src="/hero-landscape.png" alt="India Landscape Background" className="w-full h-full object-cover object-center opacity-10 filter blur-sm brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#050507]/90 to-[#050507]" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#138808]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>
      <div className="absolute inset-4 border border-white/10 rounded-[2rem] pointer-events-none z-30" />
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-10 py-10 px-6 md:px-12">
        <header className="w-full flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase font-mono">POWERHOUSE</h1>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF9933] border-l border-white/10 pl-3">Civilizational Legacy</span>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-sans text-xs tracking-wider uppercase transition-all cursor-pointer">
            <ArrowLeft size={14} />
            <span>Back to Museum</span>
          </button>
        </header>
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.4em] font-mono text-[#FF9933] font-semibold">History &amp; Significance</span>
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-none" style={{ fontFamily: "'Playfair Display', 'Italiana', Georgia, serif" }}>
            Incredible <span className="italic font-normal">India</span>
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed mt-2">
            From the dawn of human civilization to the leading frontier of technology, explore the values, scientific breakthroughs, and cultural milestones that define the Indian sub-continent.
          </p>
        </motion.section>
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col gap-12 text-zinc-300 leading-[1.9] text-[15px]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          <section className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Cradle of Civilization &amp; Philosophy</h3>
            <div className="w-10 h-px bg-[#FF9933]" />
            <p>Home to the ancient Indus Valley Civilization—encompassing the planned cities of Harappa and Mohenjo-daro—India stands as one of the world's earliest cradles of organized urban life. These settlements, flourishing as far back as 2500 BCE, demonstrated sophisticated drainage systems, standardized weights, and proto-writing scripts millennia before much of the world had reached comparable complexity.</p>
            <p>Beyond its material achievements, India gave the world some of its most enduring philosophical traditions. Hinduism, Buddhism, Jainism, and Sikhism were all born here, each introducing concepts that would ripple across continents—Dharma as cosmic order, Ahimsa as a political instrument of change, and deep existential inquiry into consciousness and impermanence that continues to influence modern thought.</p>
          </section>
          <hr className="border-white/5" />
          <section className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Pioneering Science &amp; Mathematics</h3>
            <div className="w-10 h-px bg-[#FF9933]" />
            <p>The concept of zero—perhaps the most consequential mathematical abstraction in human history—was formalized in India. Aryabhata's 5th-century treatises on arithmetic, algebra, and astronomy laid groundwork that would later transform navigation and physics across the globe. The decimal place-value system that now underpins all modern computing originated in Indian mathematical schools.</p>
            <p>In medicine, Sushruta practiced complex surgical procedures including rhinoplasty and cataract surgery nearly 2,600 years ago. The Charaka Samhita codified Ayurvedic medicine into a comprehensive system of healing that balanced pharmacology with diet, lifestyle, and mental well-being—a holistic approach that modern integrative medicine is only beginning to rediscover.</p>
          </section>
          <hr className="border-white/5" />
          <section className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Global Cultural &amp; Trade Influence</h3>
            <div className="w-10 h-px bg-[#FF9933]" />
            <blockquote className="border-l-2 border-[#FF9933] pl-5 py-1 text-zinc-400 italic text-base">
              "India was the motherland of our race, and Sanskrit the mother of Europe's languages."
              <span className="block text-[11px] font-mono text-zinc-500 mt-2 not-italic">— Will Durant, historian</span>
            </blockquote>
            <p>For centuries India was the pivot of two great axes of world trade—the Silk Road and the Spice Route. Merchants from Arabia, Rome, China, and Southeast Asia carried not only Indian pepper, muslin, and indigo, but ideas: the counting systems, the philosophical texts, the architectural motifs of temple-building that shaped the great Hindu-Buddhist kingdoms of Cambodia, Indonesia, and Vietnam.</p>
            <p>Sanskrit, the language that encoded much of this knowledge, directly influenced Greek, Latin, and the Germanic languages. The influence of Indian storytelling traditions on Arabic literature, and subsequently on medieval European fables, is well-documented—proof that cultural exchange flowed long before the age of digital communication.</p>
          </section>
          <hr className="border-white/5" />
          <section className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>The Struggle for Freedom</h3>
            <div className="w-10 h-px bg-[#138808]" />
            <p>No story of India is complete without its independence movement—a decades-long, multi-faceted struggle that became a template for decolonization worldwide. Mahatma Gandhi's strategy of Satyagraha—non-violent civil disobedience—demonstrated for the first time that empire could be dismantled without matching its violence. The Salt March of 1930 remains one of the most studied acts of political theater in history.</p>
            <p>Alongside Gandhi, the movement encompassed revolutionary patriots—Bhagat Singh, who challenged the doctrine of passive resistance with passionate urgency; Netaji Subhas Chandra Bose, who organized the Indian National Army abroad; and countless unsung heroes across every province, caste, and faith who paid with their freedom or lives. On August 15, 1947, the tricolor rose over a free India.</p>
          </section>
          <hr className="border-white/5" />
          <section className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>The Modern Powerhouse</h3>
            <div className="w-10 h-px bg-[#FF9933]" />
            <p>In the eight decades since independence, India has emerged as the world's most populous democracy and a formidable force in technology, space exploration, and pharmaceuticals. ISRO's Chandrayaan-3 mission became the first to land near the lunar south pole—a milestone that repositioned India in the global space race. India's software sector now generates over a quarter-trillion dollars annually, and its diaspora leads some of the most influential corporations on the planet.</p>
            <p>Yet what makes India's rise remarkable is not just its numbers. It is the way a civilization 5,000 years old continues to negotiate its plural identity—23 official languages, hundreds of dialects, every major world religion—within a single constitutional framework. That negotiation, sometimes turbulent, is itself the story: a civilization that has always been in conversation with the world, and always will be.</p>
          </section>
        </motion.article>
        <footer className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500 border-t border-white/10 pt-6 mt-4">
          <span>Satyamev Jayate • Truth Alone Triumphs</span>
          <div className="flex gap-4"><span>5000+ Years of Heritage</span><span>•</span><span>Vibrant Democracy</span></div>
        </footer>
      </div>
    </div>
  );
};

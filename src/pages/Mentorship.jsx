import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Target, Rocket, Clock } from 'lucide-react';

const Mentorship = () => {
  const benefits = [
    { icon: <Star className="text-amber-500" size={24} />, title: "1-on-1 Coaching", desc: "Sesi privat eksklusif via video call" },
    { icon: <Target className="text-rose-500" size={24} />, title: "Portfolio Review", desc: "Audit aset dan evaluasi performa" },
    { icon: <Rocket className="text-emerald-500" size={24} />, title: "Action Plan", desc: "Strategi investasi yang dipersonalisasi" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container - Ditambahkan flex-col dan items-center agar PASTI ke tengah */}
      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-100 text-green-700 text-sm font-bold rounded-full tracking-wider mb-10 shadow-sm w-fit"
        >
          <Clock size={16} /> SEGERA HADIR (COMING SOON)
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-tight w-full"
        >
          Tingkatkan Level Investasi Anda <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Bersama Para Ahli</span>
        </motion.h1>

        {/* Subtitle - Diubah jadi leading-loose agar jarak baris lebih lega */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg md:text-xl leading-loose max-w-3xl mb-20 w-full"
        >
          Saat ini kami sedang mengkurasi praktisi terbaik di industri keuangan <br className="hidden md:block" /> untuk menjadi mentor Anda. Fitur ini akan segera dibuka untuk publik.
        </motion.p>    
      </div>
    </div>
  );
};

export default Mentorship;

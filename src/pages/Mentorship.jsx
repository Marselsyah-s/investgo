import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Star, Users, Target, Rocket, Sparkles, ArrowRight } from 'lucide-react';

const Mentorship = () => {
  const mentors = [
    { name: 'Budi Santoso', role: 'Venture Capitalist', expertise: 'Startup Scaling', avatar: 'BS' },
    { name: 'Siska Putri', role: 'Senior Trader', expertise: 'Technical Analysis', avatar: 'SP' },
    { name: 'Andi Wijaya', role: 'Financial Advisor', expertise: 'Personal Finance', avatar: 'AW' },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#F8FAFC] relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full tracking-wider uppercase">
              Exclusive Content
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight"
          >
            Mentorship & Funding
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl leading-relaxed"
          >
            Akses langsung ke jaringan investor dan mentor profesional untuk mengakselerasi pertumbuhan finansial Anda.
          </motion.p>
        </header>

        {/* Content Teaser Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-40 blur-[8px] pointer-events-none select-none transition-all duration-700">
          {mentors.map((mentor, index) => (
            <div key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-400">
                  {mentor.avatar}
                </div>
                <div className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Mentor
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-100 rounded-lg w-3/4" />
                <div className="h-4 bg-gray-50 rounded-md w-1/2" />
                <div className="pt-4 space-y-2">
                  <div className="h-3 bg-gray-50 rounded w-full" />
                  <div className="h-3 bg-gray-50 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))}

          <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm min-h-[300px]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-100 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-32" />
                <div className="h-3 bg-gray-50 rounded w-24" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-gray-50 rounded-2xl border border-dashed border-gray-200" />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Lock Modal */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pt-20 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white/90 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white max-w-3xl w-full text-center relative"
          >
            {/* Premium Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-xl">
              <Sparkles size={14} className="text-yellow-400" />
              Premium Access Only
            </div>

            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-200 rotate-3">
              <Lock className="text-white w-12 h-12" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Unlock the Full <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">InvestGo Experience</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Bergabunglah dengan program eksklusif kami untuk mendapatkan bimbingan strategis, koneksi investor, dan peluang pendanaan nyata.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-12">
              {[
                { icon: <Star className="text-amber-500" />, title: "One-on-One", desc: "Sesi privat dengan mentor" },
                { icon: <Users className="text-blue-500" />, title: "VIP Circle", desc: "Komunitas investor eksklusif" },
                { icon: <Target className="text-rose-500" />, title: "Portfolio Review", desc: "Audit aset oleh profesional" },
                { icon: <Rocket className="text-emerald-500" />, title: "Funding Access", desc: "Akses hibah & modal kerja" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{item.title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-5 bg-green-500 hover:bg-green-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-green-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
                Upgrade ke Pro Sekarang
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  +2.4k Members
                </p>
              </div>
              <p className="text-xs text-gray-300 font-medium">
                Safe & Secure Payments • Instant Access
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;

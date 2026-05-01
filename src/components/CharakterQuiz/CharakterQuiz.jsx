import React, { useState } from 'react';
import './CharakterQuiz.css';

const questions = [
  {
    q: "Jika nilai investasimu turun 10% dalam sehari, apa yang kamu lakukan?",
    opts: [
      { t: "Panik dan langsung jual semua.", v: 1 },
      { t: "Diam dulu sambil pantau situasi.", v: 2 },
      { t: "Justru beli lagi karena mumpung murah!", v: 3 }
    ]
  },
  {
    q: "Apa tujuan utamamu berinvestasi?",
    opts: [
      { t: "Yang penting uang aman, meski untung kecil.", v: 1 },
      { t: "Ingin beli barang impian dalam 3-5 tahun.", v: 2 },
      { t: "Mencari kebebasan finansial secepat mungkin.", v: 3 }
    ]
  },
  {
    q: "Seberapa besar pemahamanmu tentang naik-turunnya pasar?",
    opts: [
      { t: "Masih bingung, takut uang hilang.", v: 1 },
      { t: "Lumayan tahu, tapi tetap butuh panduan.", v: 2 },
      { t: "Sudah paham risiko dan siap menghadapinya.", v: 3 }
    ]
  },
  {
    q: "Berapa lama kamu akan mendiamkan uangmu di instrumen investasi?",
    opts: [
      { t: "Kurang dari 1 tahun.", v: 1 },
      { t: "1 sampai 3 tahun.", v: 2 },
      { t: "Lebih dari 5 tahun.", v: 3 }
    ]
  },
  {
    q: "Pilih sumber penghasilan yang kamu sukai:",
    opts: [
      { t: "Gaji tetap setiap bulan tanpa risiko.", v: 1 },
      { t: "Gaji tetap ditambah bonus performa.", v: 2 },
      { t: "Profit bisnis yang fluktuatif tapi bisa meledak.", v: 3 }
    ]
  }
];

export default function CharakterQuiz({ onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (pts) => {
    const newScore = score + pts;
    if (currentQ < questions.length - 1) {
      setScore(newScore);
      setCurrentQ(currentQ + 1);
    } else {
      setScore(newScore);
      setShowResult(true);
    }
  };

  const getResult = (s) => {
    // Logic pembagian karakter berdasarkan range poin (5-15)
    // dan tier berdasarkan kecenderungan (kedalaman skor)
    if (s >= 5 && s <= 8) {
      if (s <= 6) return { title: "Si Kura-Kura Baja", desc: "Luar biasa! Kamu adalah Kura-Kura Baja! Pertahananmu tak tertembus. Kamu adalah tipe investor yang paling tenang saat orang lain panik. Fondasimu sangat kokoh!", animal: "🐢" };
      return { title: "Si Kura-Kura Bijak", desc: "Wah, kamu adalah Kura-Kura Bijak! Kamu sangat sabar dan tidak gampang goyah oleh badai pasar. Bagimu, keamanan adalah nomor satu!", animal: "🐢" };
    } else if (s >= 9 && s <= 12) {
      if (s >= 10 && s <= 11) return { title: "Si Lumba-Lumba Navigator", desc: "Gokil! Kamu adalah Lumba-Lumba Navigator! Instingmu dalam menyeimbangkan risiko dan keuntungan sangat tajam. Kamu adalah penguasa arus pasar yang handal!", animal: "🐬" };
      return { title: "Si Lumba-Lumba Cerdas", desc: "Keren! Karaktermu adalah Lumba-Lumba Cerdas. Kamu tahu kapan harus bermain aman dan kapan harus melompat mengambil peluang. Kamu sangat seimbang!", animal: "🐬" };
    } else {
      if (s >= 14) return { title: "Raja Harimau (Apex Predator)", desc: "Sempurna! Kamu adalah Raja Harimau (Apex Predator)! Ambisimu luar biasa dan nyalimu tak tertandingi. Kamu siap menaklukkan market yang paling liar sekalipun demi cuan maksimal!", animal: "🐅" };
      return { title: "Si Harimau Pemburu", desc: "Ganas! Kamu adalah Harimau Pemburu. Risiko bukan halangan, tapi tantangan bagimu. Kamu punya mental pemenang yang kuat di pasar!", animal: "🐅" };
    }
  };

  if (showResult) {
    const res = getResult(score);
    return (
      <div className="cq-wrapper">
        <div className="cq-card cq-result-card">
          <div className="cq-animal">{res.animal}</div>
          <h2 className="cq-title">{res.title}</h2>
          <p className="cq-desc">{res.desc}</p>
          <button className="cq-btn cq-btn-primary" onClick={() => onComplete && onComplete(res)}>
            Mulai Petualangan Investasi
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="cq-wrapper">
      <div className="cq-card">
        <div className="cq-progress-bar">
          <div className="cq-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="cq-header">
          <span className="cq-step">Pertanyaan {currentQ + 1} dari {questions.length}</span>
        </div>
        <h2 className="cq-question">{q.q}</h2>
        <div className="cq-options">
          {q.opts.map((opt, i) => (
            <button key={i} className="cq-opt-btn" onClick={() => handleAnswer(opt.v)}>
              {opt.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

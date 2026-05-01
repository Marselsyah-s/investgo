export const level6 = {
  id: 6, title: 'Technical Analysis 101', icon: '📐', display_order: 6,
  color: '#06b6d4', shadowColor: '#0891b2', bgColor: '#ecfeff',
  lessons: [
    {
      id: 'l6-1', title: 'Apa itu Analisis Teknikal?', emoji: '📐', display_order: 1,
      slides: [
        { tag: 'KONSEP', title: 'Membaca Grafik Harga', body: 'Analisis Teknikal menggunakan grafik harga historis untuk memprediksi pergerakan harga di masa depan. Prinsipnya: "History repeats itself" — pola harga cenderung berulang.', visual_emoji: '📈', display_order: 1 },
        { tag: 'KEGUNAAN', title: 'Kapan Beli & Jual?', body: 'Analis teknikal mencari timing masuk (buy) dan keluar (sell) yang optimal. Cocok dikombinasikan dengan fundamental untuk keputusan investasi yang lebih baik.', visual_emoji: '⏱️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Analisis teknikal berfokus pada?', explanation: 'Teknikal menggunakan data harga dan volume historis untuk memprediksi pergerakan harga ke depan.', options: [{ label: 'Laporan keuangan', emoji: '📋', is_correct: false }, { label: 'Grafik & data harga historis', emoji: '📈', is_correct: true }, { label: 'Berita perusahaan', emoji: '📰', is_correct: false }, { label: 'Dividen', emoji: '💰', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Prinsip dasar analisis teknikal adalah?', explanation: 'Teknikal percaya pola harga historis cenderung berulang karena perilaku pelaku pasar yang mirip.', options: [{ label: 'Perusahaan bagus pasti untung', emoji: '🏢', is_correct: false }, { label: 'History repeats itself', emoji: '🔄', is_correct: true }, { label: 'Beli saat semua orang jual', emoji: '🛒', is_correct: false }, { label: 'Ikuti analis terkenal', emoji: '⭐', is_correct: false }] },
      ]
    },
    {
      id: 'l6-2', title: 'Candlestick: Si Hijau & Si Merah', emoji: '🕯️', display_order: 2,
      slides: [
        { tag: 'ANATOMI', title: 'Membaca Satu Candlestick', body: 'Setiap candlestick merangkum 4 harga: Open (buka), High (tertinggi), Low (terendah), Close (tutup). Body = rentang buka-tutup. Shadow/Wick = ekor atas & bawah.', visual_emoji: '🕯️', display_order: 1 },
        { tag: 'WARNA', title: 'Hijau vs Merah', body: 'Hijau (Bullish): Close > Open → harga naik. Merah (Bearish): Close < Open → harga turun. Ini sinyal paling dasar yang wajib kamu hafal!', visual_emoji: '🎨', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Candlestick hijau berarti?', explanation: 'Candlestick hijau (bullish): harga penutupan (close) lebih tinggi dari harga pembukaan (open).', options: [{ label: 'Harga turun', emoji: '📉', is_correct: false }, { label: 'Harga naik (close > open)', emoji: '📈', is_correct: true }, { label: 'Volume tinggi', emoji: '📊', is_correct: false }, { label: 'Pasar tutup', emoji: '🔒', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Shadow/Wick pada candlestick menunjukkan?', explanation: 'Shadow/Wick adalah garis tipis di atas/bawah body yang menunjukkan harga tertinggi dan terendah dalam periode.', options: [{ label: 'Harga pembukaan', emoji: '🌅', is_correct: false }, { label: 'Volume perdagangan', emoji: '📊', is_correct: false }, { label: 'Harga tertinggi & terendah', emoji: '✅', is_correct: true }, { label: 'Harga rata-rata', emoji: '➡️', is_correct: false }] },
      ]
    },
    {
      id: 'l6-3', title: 'Support: Lantai Pantulan Harga', emoji: '🏗️', display_order: 3,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu Support?', body: 'Support adalah level harga di mana tekanan BELI cukup kuat untuk menahan harga agar tidak turun lebih jauh. Harga "memantul" naik saat menyentuh support.', visual_emoji: '⬆️', display_order: 1 },
        { tag: 'STRATEGI', title: 'Cara Menggunakan Support', body: 'Trader sering BUY di dekat support dan pasang stop-loss di bawah support. Jika support "jebol" (harga turun tembus), support tersebut bisa berubah menjadi resistance.', visual_emoji: '🎯', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Support adalah level harga di mana?', explanation: 'Support = level harga di mana tekanan beli cukup kuat menahan penurunan. Harga cenderung memantul naik.', options: [{ label: 'Harga pasti berbalik turun', emoji: '📉', is_correct: false }, { label: 'Tekanan beli menahan penurunan', emoji: '✅', is_correct: true }, { label: 'Volume perdagangan nol', emoji: '0️⃣', is_correct: false }, { label: 'Perusahaan umumkan dividen', emoji: '💰', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Jika harga menembus/breakdown dari support, support tersebut?', explanation: 'Support yang tertembus (breakdown) seringkali berubah peran menjadi resistance baru.', options: [{ label: 'Tetap jadi support', emoji: '🏗️', is_correct: false }, { label: 'Berubah menjadi resistance', emoji: '✅', is_correct: true }, { label: 'Hilang selamanya', emoji: '💨', is_correct: false }, { label: 'Harga pasti kembali naik', emoji: '🚀', is_correct: false }] },
      ]
    },
    {
      id: 'l6-4', title: 'Resistance: Atap Penahan Harga', emoji: '🛡️', display_order: 4,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu Resistance?', body: 'Resistance adalah level harga di mana tekanan JUAL cukup kuat untuk menahan kenaikan harga. Harga "terpantul" turun saat menyentuh resistance.', visual_emoji: '⬇️', display_order: 1 },
        { tag: 'BREAKOUT', title: 'Saat Resistance Ditembus', body: 'Jika harga berhasil menembus (breakout) resistance dengan volume tinggi, ini sinyal bullish kuat. Resistance yang tertembus bisa berubah menjadi support baru.', visual_emoji: '💥', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Resistance adalah level harga di mana?', explanation: 'Resistance = level harga di mana tekanan jual kuat menahan kenaikan. Harga cenderung berbalik turun.', options: [{ label: 'Harga pasti terus naik', emoji: '🚀', is_correct: false }, { label: 'Tekanan jual menahan kenaikan', emoji: '✅', is_correct: true }, { label: 'Perusahaan tutup', emoji: '🔒', is_correct: false }, { label: 'Volume perdagangan tinggi', emoji: '📊', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Breakout resistance dengan volume tinggi adalah sinyal?', explanation: 'Breakout resistance disertai volume tinggi = sinyal bullish kuat, konfirmasi kenaikan harga berlanjut.', options: [{ label: 'Sinyal jual', emoji: '📤', is_correct: false }, { label: 'Sinyal bullish (beli)', emoji: '✅', is_correct: true }, { label: 'Sinyal netral', emoji: '➡️', is_correct: false }, { label: 'Harga pasti turun lagi', emoji: '📉', is_correct: false }] },
      ]
    },
    {
      id: 'l6-5', title: 'Tren: Uptrend, Downtrend, Sideways', emoji: '📈', display_order: 5,
      slides: [
        { tag: 'TIGA TREN', title: 'Tipe-Tipe Tren Pasar', body: 'Uptrend: harga membuat higher high & higher low → tren naik. Downtrend: lower high & lower low → tren turun. Sideways: harga bergerak horizontal → tidak ada tren jelas.', visual_emoji: '↗️', display_order: 1 },
        { tag: 'STRATEGI', title: 'Trade Mengikuti Tren', body: '"The trend is your friend" — lebih aman trading searah tren. Saat uptrend, fokus cari peluang beli. Saat downtrend, hindari beli atau tunggu tren berbalik.', visual_emoji: '🤝', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Uptrend ditandai dengan?', explanation: 'Uptrend = harga membuat puncak lebih tinggi (higher high) dan lembah lebih tinggi (higher low) secara konsisten.', options: [{ label: 'Lower high & lower low', emoji: '📉', is_correct: false }, { label: 'Higher high & higher low', emoji: '✅', is_correct: true }, { label: 'Harga bergerak horizontal', emoji: '➡️', is_correct: false }, { label: 'Volume meningkat', emoji: '📊', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Saat pasar sideways, strategi terbaik adalah?', explanation: 'Saat sideways, beli di area support bawah dan jual di area resistance atas dari range pergerakan.', options: [{ label: 'Beli sebanyak mungkin', emoji: '🛒', is_correct: false }, { label: 'Beli di support, jual di resistance', emoji: '✅', is_correct: true }, { label: 'Short selling agresif', emoji: '📉', is_correct: false }, { label: 'Tidak perlu strategi', emoji: '🤷', is_correct: false }] },
      ]
    },
  ]
}

export const level7 = {
  id: 7, title: 'Technical Analysis 102', icon: '⚙️', display_order: 7,
  color: '#8b5cf6', shadowColor: '#6d28d9', bgColor: '#f5f3ff',
  lessons: [
    {
      id: 'l7-1', title: 'Volume: Bensin Pergerakan Harga', emoji: '🔊', display_order: 1,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu Volume?', body: 'Volume adalah jumlah saham yang diperdagangkan dalam satu periode. Volume tinggi = banyak pelaku pasar aktif = pergerakan harga lebih valid dan kuat.', visual_emoji: '⛽', display_order: 1 },
        { tag: 'KONFIRMASI', title: 'Volume Sebagai Konfirmasi', body: 'Kenaikan harga + volume tinggi = bullish kuat ✅. Kenaikan harga + volume rendah = lemah, waspadai reversal. Penurunan + volume tinggi = jual besar-besaran, bahaya!', visual_emoji: '🔍', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Harga naik dengan volume rendah menandakan?', explanation: 'Kenaikan harga tanpa dukungan volume tinggi = sinyal lemah, pergerakan kurang meyakinkan.', options: [{ label: 'Sinyal beli kuat', emoji: '💪', is_correct: false }, { label: 'Kenaikan kurang meyakinkan', emoji: '⚠️', is_correct: true }, { label: 'Pasti lanjut naik', emoji: '🚀', is_correct: false }, { label: 'Volume tidak penting', emoji: '🤷', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Volume tinggi saat breakout resistance berarti?', explanation: 'Breakout disertai volume tinggi = konfirmasi kuat bahwa pergerakan naik akan berlanjut.', options: [{ label: 'Sinyal palsu (false breakout)', emoji: '❌', is_correct: false }, { label: 'Konfirmasi breakout yang kuat', emoji: '✅', is_correct: true }, { label: 'Harus segera jual', emoji: '📤', is_correct: false }, { label: 'Tidak ada artinya', emoji: '😴', is_correct: false }] },
      ]
    },
    {
      id: 'l7-2', title: 'Moving Average (MA)', emoji: '📉', display_order: 2,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu MA?', body: 'Moving Average adalah rata-rata harga dalam periode tertentu yang bergerak seiring waktu. MA20 = rata-rata 20 hari terakhir. Berguna untuk menghilangkan "noise" harga harian.', visual_emoji: '📊', display_order: 1 },
        { tag: 'GOLDEN CROSS', title: 'Sinyal Beli & Jual MA', body: 'Golden Cross: MA pendek (MA50) memotong MA panjang (MA200) dari bawah ke atas = sinyal beli kuat. Death Cross: sebaliknya = sinyal jual. Banyak digunakan trader profesional!', visual_emoji: '✨', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'MA20 artinya?', explanation: 'MA20 = Moving Average 20 hari = rata-rata harga penutupan 20 hari terakhir.', options: [{ label: 'Harga naik 20%', emoji: '📈', is_correct: false }, { label: 'Rata-rata harga 20 hari terakhir', emoji: '✅', is_correct: true }, { label: 'Volume 20 juta saham', emoji: '📊', is_correct: false }, { label: 'Resistance di level 20', emoji: '🛡️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Golden Cross adalah?', explanation: 'Golden Cross: MA50 memotong MA200 dari bawah ke atas = sinyal bullish kuat untuk beli.', options: [{ label: 'MA50 turun memotong MA200', emoji: '📉', is_correct: false }, { label: 'MA50 naik memotong MA200', emoji: '✅', is_correct: true }, { label: 'Volume melonjak tiba-tiba', emoji: '📊', is_correct: false }, { label: 'Harga menyentuh resistance', emoji: '🛡️', is_correct: false }] },
      ]
    },
    {
      id: 'l7-3', title: 'MACD: Kapan Beli & Jual?', emoji: '⚙️', display_order: 3,
      slides: [
        { tag: 'INDIKATOR', title: 'Apa Itu MACD?', body: 'MACD (Moving Average Convergence Divergence) terdiri dari: MACD Line, Signal Line, dan Histogram. Mengukur momentum dan arah tren dengan membandingkan dua MA.', visual_emoji: '⚡', display_order: 1 },
        { tag: 'SINYAL', title: 'Cara Baca MACD', body: 'Sinyal BELI: MACD Line memotong Signal Line dari bawah ke atas. Sinyal JUAL: MACD Line memotong Signal Line dari atas ke bawah. Histogram positif = momentum naik.', visual_emoji: '🎯', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Sinyal BELI pada MACD terjadi saat?', explanation: 'MACD Line memotong Signal Line dari bawah ke atas = sinyal bullish/beli.', options: [{ label: 'Histogram negatif', emoji: '📉', is_correct: false }, { label: 'MACD Line turun memotong Signal Line', emoji: '⬇️', is_correct: false }, { label: 'MACD Line naik memotong Signal Line', emoji: '✅', is_correct: true }, { label: 'Volume menurun', emoji: '📊', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Histogram MACD positif menandakan?', explanation: 'Histogram positif = MACD Line di atas Signal Line = momentum bullish/naik sedang dominan.', options: [{ label: 'Momentum turun', emoji: '📉', is_correct: false }, { label: 'Momentum naik dominan', emoji: '✅', is_correct: true }, { label: 'Volume tinggi', emoji: '📊', is_correct: false }, { label: 'Harga akan turun', emoji: '⬇️', is_correct: false }] },
      ]
    },
    {
      id: 'l7-4', title: 'RSI: Jenuh Beli atau Jual?', emoji: '🌡️', display_order: 4,
      slides: [
        { tag: 'INDIKATOR', title: 'Apa Itu RSI?', body: 'RSI (Relative Strength Index) mengukur kecepatan dan perubahan pergerakan harga, dengan skala 0-100. Membantu mendeteksi kondisi jenuh beli (overbought) atau jenuh jual (oversold).', visual_emoji: '📏', display_order: 1 },
        { tag: 'ZONA', title: 'Zona RSI', body: 'RSI > 70 = Overbought (jenuh beli) → waspada koreksi/turun. RSI < 30 = Oversold (jenuh jual) → potensi pantulan naik. RSI 30-70 = zona normal.', visual_emoji: '🎚️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'RSI di atas 70 menandakan kondisi?', explanation: 'RSI > 70 = overbought (jenuh beli). Harga sudah naik terlalu cepat, waspadai koreksi.', options: [{ label: 'Oversold (jenuh jual)', emoji: '😢', is_correct: false }, { label: 'Normal', emoji: '😐', is_correct: false }, { label: 'Overbought (jenuh beli)', emoji: '⚠️', is_correct: true }, { label: 'Volume tinggi', emoji: '📊', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'RSI di bawah 30 adalah peluang untuk?', explanation: 'RSI < 30 = oversold, harga sudah turun berlebihan. Ini sering menjadi peluang beli karena potensi pantulan.', options: [{ label: 'Segera jual', emoji: '📤', is_correct: false }, { label: 'Potensi peluang beli (oversold)', emoji: '✅', is_correct: true }, { label: 'Pasang stop-loss', emoji: '🛑', is_correct: false }, { label: 'Tidak ada sinyal', emoji: '😴', is_correct: false }] },
      ]
    },
    {
      id: 'l7-5', title: 'Breakout vs False Breakout', emoji: '💥', display_order: 5,
      slides: [
        { tag: 'BREAKOUT', title: 'Apa Itu Breakout?', body: 'Breakout terjadi saat harga menembus level support atau resistance yang kuat. Breakout yang valid biasanya disertai volume tinggi dan harga tetap di atas/bawah level tersebut.', visual_emoji: '🚀', display_order: 1 },
        { tag: 'FALSE BREAKOUT', title: 'Waspada False Breakout!', body: 'False breakout = harga seolah menembus resistance/support tapi kemudian kembali ke range sebelumnya. Ciri: volume rendah saat breakout, harga cepat kembali. Jangan langsung FOMO!', visual_emoji: '⚠️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Breakout yang valid biasanya disertai?', explanation: 'Breakout valid = volume tinggi + harga bertahan di atas resistance (tidak kembali ke bawah dengan cepat).', options: [{ label: 'Volume rendah', emoji: '🔇', is_correct: false }, { label: 'Volume tinggi', emoji: '✅', is_correct: true }, { label: 'RSI di 50', emoji: '📊', is_correct: false }, { label: 'Berita buruk', emoji: '📰', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Ciri utama false breakout adalah?', explanation: 'False breakout: harga tampak menembus level penting tapi volume rendah dan harga cepat kembali ke range.', options: [{ label: 'Volume sangat tinggi', emoji: '📊', is_correct: false }, { label: 'Harga bertahan lama di atas resistance', emoji: '⏳', is_correct: false }, { label: 'Volume rendah & harga cepat kembali', emoji: '✅', is_correct: true }, { label: 'RSI > 70', emoji: '🌡️', is_correct: false }] },
      ]
    },
  ]
}

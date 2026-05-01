export const level4 = {
  id: 4, title: 'Fundamental Analysis 101', icon: '🔍', display_order: 4,
  color: '#FFC107', shadowColor: '#e6a800', bgColor: '#fffbea',
  lessons: [
    {
      id: 'l4-1', title: 'Apa itu Analisis Fundamental?', emoji: '🔍', display_order: 1,
      slides: [
        { tag: 'KONSEP', title: 'Nilai Intrinsik Saham', body: 'Analisis Fundamental menilai saham dengan mempelajari kesehatan bisnis: pendapatan, laba, hutang, dan prospek masa depan. Tujuannya menemukan saham "murah" tapi berkualitas.', visual_emoji: '📋', display_order: 1 },
        { tag: 'VS TEKNIKAL', title: 'Fundamental vs Teknikal', body: 'Fundamental bertanya: "Apakah bisnis perusahaan ini sehat?" Teknikal bertanya: "Kapan waktu beli/jual yang tepat?" Investor jangka panjang lebih mengandalkan fundamental.', visual_emoji: '⚖️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Analisis fundamental berfokus pada?', explanation: 'Fundamental analysis menilai nilai intrinsik saham berdasarkan kondisi keuangan dan prospek bisnis.', options: [{ label: 'Grafik harga saham', emoji: '📈', is_correct: false }, { label: 'Kesehatan bisnis perusahaan', emoji: '🏢', is_correct: true }, { label: 'Volume perdagangan', emoji: '📊', is_correct: false }, { label: 'Sentimen pasar', emoji: '💬', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Analisis fundamental paling cocok untuk investor?', explanation: 'Fundamental analysis lebih relevan untuk investor jangka panjang yang ingin memiliki bisnis berkualitas.', options: [{ label: 'Scalper (menit-menit)', emoji: '⚡', is_correct: false }, { label: 'Day trader (harian)', emoji: '🌞', is_correct: false }, { label: 'Jangka panjang (tahunan)', emoji: '📅', is_correct: true }, { label: 'Spekulan', emoji: '🎲', is_correct: false }] },
      ]
    },
    {
      id: 'l4-2', title: 'Membaca Laporan Laba Rugi', emoji: '📋', display_order: 2,
      slides: [
        { tag: 'LAPORAN', title: 'Income Statement', body: 'Laporan Laba Rugi menunjukkan seberapa banyak uang yang diperoleh dan dikeluarkan perusahaan dalam satu periode. Rumus: Pendapatan - Biaya = Laba Bersih.', visual_emoji: '📝', display_order: 1 },
        { tag: 'YANG DICARI', title: 'Tanda Perusahaan Sehat', body: 'Perhatikan: apakah pendapatan tumbuh konsisten? Apakah laba bersih positif dan meningkat? Apakah profit margin stabil? Ini indikator bisnis yang sehat.', visual_emoji: '✅', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Pendapatan Rp100M, total biaya Rp80M. Laba bersihnya?', explanation: 'Laba Bersih = Pendapatan - Total Biaya = Rp100M - Rp80M = Rp20M.', options: [{ label: 'Rp80M', emoji: '8️⃣', is_correct: false }, { label: 'Rp100M', emoji: '💯', is_correct: false }, { label: 'Rp20M', emoji: '✅', is_correct: true }, { label: 'Rp180M', emoji: '🔢', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Yang pertama diperiksa dalam laporan laba rugi adalah?', explanation: 'Fokus utama: apakah pendapatan dan laba bersih tumbuh secara konsisten dari tahun ke tahun.', options: [{ label: 'Nama direktur', emoji: '👔', is_correct: false }, { label: 'Pertumbuhan pendapatan & laba', emoji: '📈', is_correct: true }, { label: 'Alamat kantor', emoji: '📍', is_correct: false }, { label: 'Logo perusahaan', emoji: '🎨', is_correct: false }] },
      ]
    },
    {
      id: 'l4-3', title: 'EPS: Untung per Lembar Saham', emoji: '💵', display_order: 3,
      slides: [
        { tag: 'RUMUS', title: 'Apa Itu EPS?', body: 'EPS (Earning Per Share) = Laba Bersih ÷ Jumlah Saham Beredar. Menunjukkan berapa keuntungan yang dihasilkan perusahaan untuk setiap lembar saham.', visual_emoji: '🧮', display_order: 1 },
        { tag: 'INTERPRETASI', title: 'EPS Tinggi = Bagus?', body: 'EPS yang terus NAIK dari tahun ke tahun adalah sinyal perusahaan makin profitable. Bandingkan EPS antar tahun dan antar perusahaan di industri yang sama.', visual_emoji: '📊', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'EPS dihitung dengan rumus?', explanation: 'EPS = Laba Bersih ÷ Jumlah Saham Beredar. Menunjukkan keuntungan per lembar saham.', options: [{ label: 'Harga Saham ÷ Laba', emoji: '➗', is_correct: false }, { label: 'Laba Bersih ÷ Jumlah Saham', emoji: '✅', is_correct: true }, { label: 'Pendapatan ÷ Biaya', emoji: '🧮', is_correct: false }, { label: 'Aset ÷ Hutang', emoji: '⚖️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'EPS yang ideal adalah yang?', explanation: 'EPS yang terus naik dari tahun ke tahun menandakan perusahaan makin menguntungkan.', options: [{ label: 'Sangat tinggi di satu tahun saja', emoji: '1️⃣', is_correct: false }, { label: 'Terus naik konsisten', emoji: '📈', is_correct: true }, { label: 'Selalu negatif', emoji: '📉', is_correct: false }, { label: 'Sama setiap tahun', emoji: '➡️', is_correct: false }] },
      ]
    },
    {
      id: 'l4-4', title: 'PER: Saham Murah atau Mahal?', emoji: '💹', display_order: 4,
      slides: [
        { tag: 'RUMUS', title: 'Apa Itu PER?', body: 'PER (Price to Earnings Ratio) = Harga Saham ÷ EPS. Menunjukkan berapa tahun yang dibutuhkan untuk balik modal dari laba perusahaan. PER 15 = balik modal dalam 15 tahun.', visual_emoji: '📐', display_order: 1 },
        { tag: 'INTERPRETASI', title: 'PER Rendah = Murah?', body: 'PER lebih rendah dari rata-rata industri = saham relatif murah (undervalued). PER tinggi = mahal (overvalued). Tapi konteks industri dan pertumbuhan tetap harus dipertimbangkan!', visual_emoji: '🏷️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'PER dihitung dengan rumus?', explanation: 'PER = Harga Saham ÷ EPS. Menunjukkan kelipatan harga terhadap laba per saham.', options: [{ label: 'Laba ÷ Harga Saham', emoji: '🔄', is_correct: false }, { label: 'Harga Saham ÷ EPS', emoji: '✅', is_correct: true }, { label: 'Aset ÷ Hutang', emoji: '⚖️', is_correct: false }, { label: 'EPS × Jumlah Saham', emoji: '✖️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Saham dengan PER lebih rendah dari rata-rata industri berarti?', explanation: 'PER di bawah rata-rata industri mengindikasikan saham relatif murah atau undervalued.', options: [{ label: 'Perusahaan rugi', emoji: '📉', is_correct: false }, { label: 'Saham relatif murah (undervalued)', emoji: '🏷️', is_correct: true }, { label: 'Saham pasti naik', emoji: '🚀', is_correct: false }, { label: 'Harus langsung dijual', emoji: '🚫', is_correct: false }] },
      ]
    },
    {
      id: 'l4-5', title: 'PBV: Cek Harga Wajar', emoji: '📏', display_order: 5,
      slides: [
        { tag: 'RUMUS', title: 'Apa Itu PBV?', body: 'PBV (Price to Book Value) = Harga Saham ÷ Nilai Buku per Saham. Nilai Buku = total aset - total hutang. PBV 1 berarti harga saham = nilai buku perusahaan.', visual_emoji: '📚', display_order: 1 },
        { tag: 'INTERPRETASI', title: 'Cara Membaca PBV', body: 'PBV < 1 = saham dijual lebih murah dari nilai aset bersihnya (bisa jadi peluang). PBV > 1 = pasar menghargai lebih dari nilai bukunya (premium). Selalu bandingkan dengan industri sejenis.', visual_emoji: '🔍', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'PBV = 0.8 artinya?', explanation: 'PBV < 1 artinya harga saham lebih murah dari nilai buku (aset bersih) perusahaan — potensi undervalued.', options: [{ label: 'Perusahaan bangkrut', emoji: '💀', is_correct: false }, { label: 'Harga saham lebih murah dari nilai buku', emoji: '🏷️', is_correct: true }, { label: 'Saham mahal', emoji: '💰', is_correct: false }, { label: 'PBV tidak bisa di bawah 1', emoji: '❌', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Nilai Buku (Book Value) dihitung dari?', explanation: 'Nilai Buku = Total Aset - Total Hutang (equity/modal bersih perusahaan).', options: [{ label: 'Pendapatan - Biaya', emoji: '📊', is_correct: false }, { label: 'Total Aset - Total Hutang', emoji: '✅', is_correct: true }, { label: 'Harga Saham × Jumlah Saham', emoji: '✖️', is_correct: false }, { label: 'Laba × 10', emoji: '🔟', is_correct: false }] },
      ]
    },
  ]
}

export const level5 = {
  id: 5, title: 'Fundamental Analysis 102', icon: '📑', display_order: 5,
  color: '#ef4444', shadowColor: '#c81e1e', bgColor: '#fff1f1',
  lessons: [
    {
      id: 'l5-1', title: 'Dividen: Pasif Income dari Saham', emoji: '💰', display_order: 1,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu Dividen?', body: 'Dividen adalah pembagian keuntungan perusahaan kepada pemegang saham. Biasanya dibagikan setahun sekali atau dua kali. Kamu dapat uang hanya karena memegang saham!', visual_emoji: '💸', display_order: 1 },
        { tag: 'DIVIDEND YIELD', title: 'Cara Menghitung Dividen', body: 'Dividend Yield = Dividen per Saham ÷ Harga Saham × 100%. Yield 5% artinya kamu dapat 5% dari nilai sahammu per tahun dari dividen saja.', visual_emoji: '🧮', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Dividen adalah?', explanation: 'Dividen = pembagian keuntungan perusahaan kepada pemegang saham secara proporsional.', options: [{ label: 'Hutang perusahaan ke bank', emoji: '🏦', is_correct: false }, { label: 'Pembagian keuntungan ke pemegang saham', emoji: '💰', is_correct: true }, { label: 'Biaya pembelian saham', emoji: '🏷️', is_correct: false }, { label: 'Denda OJK', emoji: '⚠️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Dividend yield 5% artinya?', explanation: 'Yield 5% = kamu mendapat 5% dari nilai investasimu per tahun hanya dari dividen.', options: [{ label: 'Harga saham naik 5%', emoji: '📈', is_correct: false }, { label: '5% return dari dividen per tahun', emoji: '✅', is_correct: true }, { label: 'Pajak dividen 5%', emoji: '🧾', is_correct: false }, { label: 'Dividen dibagi 5 kali', emoji: '5️⃣', is_correct: false }] },
      ]
    },
    {
      id: 'l5-2', title: 'Right Issue', emoji: '📝', display_order: 2,
      slides: [
        { tag: 'AKSI KORPORASI', title: 'Apa Itu Right Issue?', body: 'Right Issue adalah penerbitan saham baru oleh perusahaan untuk mendapat tambahan modal. Pemegang saham lama diberi HAK (right) untuk membeli saham baru dengan harga diskon.', visual_emoji: '🆕', display_order: 1 },
        { tag: 'DAMPAK', title: 'Efek Right Issue', body: 'Jika kamu TIDAK beli right issue → kepemilikanmu terdilusi (persentase berkurang). Jika kamu BELI → kamu dapat saham dengan harga diskon. Keputusan tergantung kondisi perusahaan!', visual_emoji: '⚖️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Right Issue adalah?', explanation: 'Right issue = penerbitan saham baru, pemegang lama diberi hak beli terlebih dahulu dengan harga diskon.', options: [{ label: 'Hak untuk jual saham', emoji: '📤', is_correct: false }, { label: 'Hak beli saham baru dengan diskon', emoji: '✅', is_correct: true }, { label: 'Pembagian dividen tambahan', emoji: '💰', is_correct: false }, { label: 'Pemecahan saham', emoji: '✂️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Jika tidak ambil right issue, apa yang terjadi?', explanation: 'Tidak mengambil right issue menyebabkan dilusi — persentase kepemilikanmu di perusahaan berkurang.', options: [{ label: 'Saham otomatis dijual', emoji: '📤', is_correct: false }, { label: 'Kepemilikan terdilusi', emoji: '⬇️', is_correct: true }, { label: 'Dapat dividen lebih besar', emoji: '💰', is_correct: false }, { label: 'Tidak ada dampaknya', emoji: '😌', is_correct: false }] },
      ]
    },
    {
      id: 'l5-3', title: 'Stock Split: Kenapa Saham Dipecah?', emoji: '✂️', display_order: 3,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu Stock Split?', body: 'Stock split adalah pemecahan saham menjadi lebih banyak dengan harga lebih rendah. Split 1:5 artinya 1 saham Rp5.000 jadi 5 saham Rp1.000. Total nilai tetap sama!', visual_emoji: '🔪', display_order: 1 },
        { tag: 'TUJUAN', title: 'Mengapa Perusahaan Split?', body: 'Agar harga saham lebih terjangkau oleh investor ritel (pemula). Saham yang harganya ratusan ribu per lembar susah dibeli investor kecil. Split meningkatkan likuiditas pasar.', visual_emoji: '🎯', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Stock split 1:5 dari harga Rp5.000, harga baru per lembar?', explanation: 'Split 1:5: 1 saham dipecah jadi 5. Rp5.000 ÷ 5 = Rp1.000 per lembar. Jumlah saham 5× lipat.', options: [{ label: 'Rp5.000', emoji: '5️⃣', is_correct: false }, { label: 'Rp2.500', emoji: '2️⃣', is_correct: false }, { label: 'Rp1.000', emoji: '✅', is_correct: true }, { label: 'Rp25.000', emoji: '2️⃣', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Tujuan utama stock split adalah?', explanation: 'Stock split membuat harga saham lebih terjangkau sehingga likuiditas meningkat karena lebih banyak investor bisa beli.', options: [{ label: 'Mengurangi utang', emoji: '💳', is_correct: false }, { label: 'Meningkatkan harga saham', emoji: '🚀', is_correct: false }, { label: 'Membuat harga lebih terjangkau', emoji: '🏷️', is_correct: true }, { label: 'Membagikan dividen', emoji: '💰', is_correct: false }] },
      ]
    },
    {
      id: 'l5-4', title: 'ROE: Seberapa Pintar Cari Cuan?', emoji: '💡', display_order: 4,
      slides: [
        { tag: 'RUMUS', title: 'Apa Itu ROE?', body: 'ROE (Return on Equity) = Laba Bersih ÷ Ekuitas × 100%. Mengukur seberapa efisien perusahaan menggunakan modal sendiri untuk menghasilkan laba.', visual_emoji: '🧮', display_order: 1 },
        { tag: 'STANDAR', title: 'ROE yang Baik', body: 'ROE > 15% dianggap baik. ROE > 20% sangat baik. Bandingkan dengan industri sejenis — ROE bank berbeda standarnya dengan manufaktur.', visual_emoji: '📊', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'ROE mengukur apa?', explanation: 'ROE mengukur efisiensi perusahaan menggunakan modal sendiri (ekuitas) untuk menghasilkan keuntungan.', options: [{ label: 'Rasio hutang perusahaan', emoji: '💳', is_correct: false }, { label: 'Efisiensi penggunaan modal sendiri', emoji: '✅', is_correct: true }, { label: 'Pertumbuhan pendapatan', emoji: '📈', is_correct: false }, { label: 'Harga saham wajar', emoji: '🏷️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'ROE berapa yang dianggap baik secara umum?', explanation: 'ROE > 15% umumnya dianggap baik. ROE tinggi konsisten menunjukkan manajemen yang efisien.', options: [{ label: 'Di atas 2%', emoji: '2️⃣', is_correct: false }, { label: 'Di atas 5%', emoji: '5️⃣', is_correct: false }, { label: 'Di atas 15%', emoji: '✅', is_correct: true }, { label: 'Di atas 50%', emoji: '5️⃣', is_correct: false }] },
      ]
    },
    {
      id: 'l5-5', title: 'DER: Cek Hutang Perusahaan', emoji: '⚠️', display_order: 5,
      slides: [
        { tag: 'RUMUS', title: 'Apa Itu DER?', body: 'DER (Debt to Equity Ratio) = Total Hutang ÷ Total Ekuitas. Mengukur seberapa besar perusahaan bergantung pada hutang dibanding modal sendiri. DER 1 = hutang = modal sendiri.', visual_emoji: '⚖️', display_order: 1 },
        { tag: 'STANDAR', title: 'DER yang Aman', body: 'DER < 1 dianggap aman (hutang lebih kecil dari modal). DER > 2 perlu diwaspadai. Sektor perbankan wajar punya DER tinggi karena nature bisnisnya berbeda.', visual_emoji: '🛡️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'DER = 2 artinya?', explanation: 'DER 2 = hutang perusahaan 2× lebih besar dari modal sendiri. Perlu diwaspadai jika terus meningkat.', options: [{ label: 'Hutang = 50% modal', emoji: '5️⃣', is_correct: false }, { label: 'Hutang 2× lebih besar dari modal', emoji: '✅', is_correct: true }, { label: 'Perusahaan bangkrut', emoji: '💀', is_correct: false }, { label: 'ROE bernilai 2', emoji: '2️⃣', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'DER yang umumnya aman adalah?', explanation: 'DER < 1 menandakan hutang masih lebih kecil dari modal sendiri, kondisi yang relatif sehat.', options: [{ label: 'DER > 5', emoji: '5️⃣', is_correct: false }, { label: 'DER > 3', emoji: '3️⃣', is_correct: false }, { label: 'DER < 1', emoji: '✅', is_correct: true }, { label: 'DER = 0 selalu', emoji: '0️⃣', is_correct: false }] },
      ]
    },
  ]
}

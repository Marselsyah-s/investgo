export const level1 = {
  id: 1, title: 'Mindset & Dasar Keuangan', icon: '🧠',
  color: '#00D166', shadowColor: '#00a652', bgColor: '#e8fff4', display_order: 1,
  lessons: [
    {
      id: 'l1-1', title: 'Inflasi: Si Pencuri Uang', emoji: '💸', display_order: 1,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu Inflasi?', body: 'Inflasi adalah kenaikan harga barang secara umum tiap tahun. Inflasi 5%/tahun berarti Rp100.000 hari ini hanya senilai Rp95.238 tahun depan.', visual_emoji: '📈', display_order: 1 },
        { tag: 'DAMPAK', title: 'Mengapa Berbahaya?', body: 'Uang yang hanya disimpan nilainya terus menyusut. Investasi adalah cara terbaik untuk mengalahkan inflasi dan menjaga daya beli.', visual_emoji: '🏦', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Apa yang terjadi pada nilai uang saat inflasi tinggi?', explanation: 'Inflasi membuat daya beli uang menurun — barang yang sama makin mahal di masa depan.', options: [{ label: 'Naik', emoji: '📈', is_correct: false }, { label: 'Turun', emoji: '📉', is_correct: true }, { label: 'Tetap', emoji: '➡️', is_correct: false }, { label: 'Berlipat', emoji: '2️⃣', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Tujuan investasi terkait inflasi adalah?', explanation: 'Investasi bertujuan agar return lebih besar dari laju inflasi agar kekayaan tidak tergerus.', options: [{ label: 'Hindari pajak', emoji: '🧾', is_correct: false }, { label: 'Kalahkan inflasi', emoji: '🏆', is_correct: true }, { label: 'Tabung lebih', emoji: '🐷', is_correct: false }, { label: 'Beli emas saja', emoji: '🥇', is_correct: false }] },
      ]
    },
    {
      id: 'l1-2', title: 'Menabung vs Investasi', emoji: '🏦', display_order: 2,
      slides: [
        { tag: 'PERBEDAAN', title: 'Menabung vs Investasi', body: 'Menabung = menyimpan uang aman di bank, bunga 1-3%/tahun. Investasi = menumbuhkan uang dengan potensi return lebih tinggi namun ada risiko.', visual_emoji: '⚖️', display_order: 1 },
        { tag: 'STRATEGI', title: 'Kapan Pakai Yang Mana?', body: 'Menabung untuk dana darurat (3-6 bulan pengeluaran). Investasi untuk tujuan jangka panjang: rumah, pendidikan, pensiun.', visual_emoji: '🎯', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Berapa bulan pengeluaran yang disarankan untuk dana darurat?', explanation: 'Dana darurat ideal 3-6 bulan pengeluaran, disimpan di tabungan/deposito yang likuid.', options: [{ label: '1 bulan', emoji: '1️⃣', is_correct: false }, { label: '2 bulan', emoji: '2️⃣', is_correct: false }, { label: '3-6 bulan', emoji: '✅', is_correct: true }, { label: '12 bulan', emoji: '📅', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Untuk tujuan jangka panjang (10+ tahun), lebih cocok?', explanation: 'Investasi lebih tepat untuk jangka panjang karena compound interest bekerja maksimal.', options: [{ label: 'Celengan', emoji: '🐷', is_correct: false }, { label: 'Tabungan biasa', emoji: '🏦', is_correct: false }, { label: 'Investasi', emoji: '📈', is_correct: true }, { label: 'Arisan', emoji: '🤝', is_correct: false }] },
      ]
    },
    {
      id: 'l1-3', title: 'High Risk, High Return', emoji: '⚖️', display_order: 3,
      slides: [
        { tag: 'PRINSIP', title: 'Hukum Dasar Investasi', body: 'Semakin besar potensi keuntungan, semakin besar pula risiko kerugiannya. Ini hukum dasar investasi yang tidak bisa dihindari.', visual_emoji: '⚡', display_order: 1 },
        { tag: 'CONTOH', title: 'Spektrum Risiko', body: 'Deposito = risiko rendah, return 4-6%. Reksa Dana = sedang, 8-15%. Saham = tinggi, potensi 20%+. Sesuaikan dengan profil risikomu!', visual_emoji: '🎚️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Investasi potensi return tinggi biasanya memiliki risiko yang?', explanation: 'Prinsip High Risk High Return: potensi untung tinggi selalu disertai risiko tinggi.', options: [{ label: 'Rendah', emoji: '🟢', is_correct: false }, { label: 'Sedang', emoji: '🟡', is_correct: false }, { label: 'Tinggi', emoji: '🔴', is_correct: true }, { label: 'Tidak ada', emoji: '❌', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Investasi mana yang paling RENDAH risikonya?', explanation: 'Deposito dijamin LPS hingga Rp2 Miliar, menjadikannya instrumen paling aman.', options: [{ label: 'Saham', emoji: '📈', is_correct: false }, { label: 'Kripto', emoji: '₿', is_correct: false }, { label: 'Deposito', emoji: '🏛️', is_correct: true }, { label: 'Reksa Dana Saham', emoji: '📊', is_correct: false }] },
      ]
    },
    {
      id: 'l1-4', title: 'Keajaiban Bunga Berbunga', emoji: '🌱', display_order: 4,
      slides: [
        { tag: 'KONSEP', title: 'Apa Itu Compound Interest?', body: 'Bunga berbunga adalah keajaiban di mana keuntunganmu ikut menghasilkan keuntungan lagi. Einstein menyebutnya "keajaiban dunia ke-8".', visual_emoji: '🚀', display_order: 1 },
        { tag: 'CONTOH', title: 'Dahsyatnya Efek Waktu', body: 'Rp10.000.000 dengan return 10%/tahun → setelah 10 tahun jadi Rp25,9 juta (bukan Rp20 juta). Semakin lama, semakin dahsyat!', visual_emoji: '📈', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Compound interest adalah?', explanation: 'Compound interest = keuntungan yang ikut menghasilkan keuntungan lagi secara otomatis.', options: [{ label: 'Bunga tetap per tahun', emoji: '📌', is_correct: false }, { label: 'Bunga berbunga', emoji: '🌱', is_correct: true }, { label: 'Bunga negatif', emoji: '📉', is_correct: false }, { label: 'Bunga bank saja', emoji: '🏦', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Faktor terpenting untuk memaksimalkan compound interest?', explanation: 'Waktu adalah faktor terpenting — semakin awal mulai, semakin besar efek compound interest.', options: [{ label: 'Modal besar', emoji: '💰', is_correct: false }, { label: 'Waktu yang lama', emoji: '⏳', is_correct: true }, { label: 'Tipe investasi', emoji: '📊', is_correct: false }, { label: 'Keberuntungan', emoji: '🍀', is_correct: false }] },
      ]
    },
    {
      id: 'l1-5', title: 'Menentukan Tujuan Keuangan', emoji: '🎯', display_order: 5,
      slides: [
        { tag: 'LANGKAH AWAL', title: 'Mengapa Tujuan Penting?', body: 'Sebelum investasi, tentukan TUJUAN terlebih dahulu. Tujuan menentukan jangka waktu, pilihan instrumen, dan toleransi risiko yang tepat.', visual_emoji: '🗺️', display_order: 1 },
        { tag: 'KATEGORI', title: 'Tiga Horizon Investasi', body: 'Pendek (<3 tahun): deposito, RDPU. Menengah (3-10 tahun): obligasi, reksa dana campuran. Panjang (>10 tahun): saham, reksa dana saham.', visual_emoji: '📅', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Untuk tujuan keuangan jangka pendek (<3 tahun), instrumen paling cocok?', explanation: 'Untuk jangka pendek, pilih instrumen aman dan likuid seperti deposito atau RDPU.', options: [{ label: 'Saham', emoji: '📈', is_correct: false }, { label: 'Kripto', emoji: '₿', is_correct: false }, { label: 'Deposito / RDPU', emoji: '🏛️', is_correct: true }, { label: 'Properti', emoji: '🏠', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Mengapa penting menentukan tujuan keuangan sebelum investasi?', explanation: 'Tujuan keuangan menentukan horizon investasi, pilihan instrumen, dan toleransi risiko yang sesuai.', options: [{ label: 'Agar untung besar', emoji: '💰', is_correct: false }, { label: 'Menentukan strategi yang tepat', emoji: '🎯', is_correct: true }, { label: 'Syarat dari bank', emoji: '🏦', is_correct: false }, { label: 'Supaya keren', emoji: '😎', is_correct: false }] },
      ]
    },
  ]
}

export const level2 = {
  id: 2, title: 'Kendaraan Investasi', icon: '🚗', display_order: 2,
  color: '#7C4DFF', shadowColor: '#5a35c4', bgColor: '#f3eeff',
  lessons: [
    {
      id: 'l2-1', title: 'Deposito: Aman tapi Pelan', emoji: '🏛️', display_order: 1,
      slides: [
        { tag: 'PRODUK', title: 'Apa Itu Deposito?', body: 'Deposito adalah simpanan di bank dengan jangka waktu tetap (1-12 bulan). Bunganya lebih tinggi dari tabungan biasa, sekitar 4-6% per tahun.', visual_emoji: '🏦', display_order: 1 },
        { tag: 'KEAMANAN', title: 'Dijamin LPS!', body: 'Deposito dijamin LPS (Lembaga Penjamin Simpanan) hingga Rp2 Miliar per nasabah per bank. Instrumen paling aman untuk menyimpan dana darurat.', visual_emoji: '🛡️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'LPS menjamin deposito hingga berapa per nasabah?', explanation: 'LPS (Lembaga Penjamin Simpanan) menjamin simpanan hingga Rp2 Miliar per nasabah per bank.', options: [{ label: 'Rp100 juta', emoji: '💵', is_correct: false }, { label: 'Rp500 juta', emoji: '💴', is_correct: false }, { label: 'Rp2 Miliar', emoji: '🏆', is_correct: true }, { label: 'Tidak terbatas', emoji: '♾️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Kelemahan utama deposito adalah?', explanation: 'Deposito tidak likuid — tidak bisa dicairkan sebelum jatuh tempo tanpa penalty.', options: [{ label: 'Bunganya terlalu tinggi', emoji: '📈', is_correct: false }, { label: 'Tidak likuid (ada jatuh tempo)', emoji: '🔒', is_correct: true }, { label: 'Tidak dijamin pemerintah', emoji: '❌', is_correct: false }, { label: 'Sulit didapat', emoji: '😓', is_correct: false }] },
      ]
    },
    {
      id: 'l2-2', title: 'Reksa Dana Pasar Uang', emoji: '💼', display_order: 2,
      slides: [
        { tag: 'PRODUK', title: 'Apa Itu RDPU?', body: 'Reksa Dana Pasar Uang menempatkan dana ke deposito dan instrumen jangka pendek. Return 4-7%/tahun, risiko sangat rendah, cocok untuk pemula.', visual_emoji: '📊', display_order: 1 },
        { tag: 'KEUNGGULAN', title: 'Modal Kecil, Likuid!', body: 'Bisa mulai dari Rp10.000 saja. Lebih likuid dari deposito — bisa dicairkan kapan saja. Dikelola manajer investasi berlisensi OJK.', visual_emoji: '✅', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Kelebihan RDPU dibanding deposito adalah?', explanation: 'RDPU lebih likuid — bisa dicairkan kapan saja berbeda dengan deposito yang ada jatuh tempo.', options: [{ label: 'Return jauh lebih tinggi', emoji: '📈', is_correct: false }, { label: 'Lebih likuid (cair kapan saja)', emoji: '💧', is_correct: true }, { label: 'Bebas pajak', emoji: '🧾', is_correct: false }, { label: 'Tanpa risiko sama sekali', emoji: '😇', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'RDPU paling cocok untuk?', explanation: 'RDPU cocok untuk pemula karena risiko rendah, likuid, dan bisa mulai dengan modal kecil.', options: [{ label: 'Trader harian', emoji: '💻', is_correct: false }, { label: 'Spekulan kripto', emoji: '₿', is_correct: false }, { label: 'Pemula yang baru mulai', emoji: '🌱', is_correct: true }, { label: 'Investor kakap saja', emoji: '🐳', is_correct: false }] },
      ]
    },
    {
      id: 'l2-3', title: 'Reksa Dana Saham & Obligasi', emoji: '📊', display_order: 3,
      slides: [
        { tag: 'PRODUK', title: 'Dua Jenis Reksa Dana', body: 'Reksa Dana Saham: >80% diinvestasikan ke saham, return 15-20%/tahun, risiko tinggi. Reksa Dana Obligasi: mayoritas ke obligasi, return 7-10%/tahun, lebih stabil.', visual_emoji: '⚖️', display_order: 1 },
        { tag: 'SIAPA YANG KELOLA?', title: 'Manajer Investasi', body: 'Kedua produk dikelola Manajer Investasi (MI) berlisensi OJK. Cocok untuk investor yang mau diversifikasi tanpa harus riset sendiri.', visual_emoji: '👔', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Reksa Dana Saham harus menempatkan minimal berapa % di saham?', explanation: 'Berdasarkan regulasi OJK, Reksa Dana Saham wajib menempatkan minimal 80% di efek saham.', options: [{ label: '40%', emoji: '4️⃣', is_correct: false }, { label: '60%', emoji: '6️⃣', is_correct: false }, { label: '80%', emoji: '8️⃣', is_correct: true }, { label: '100%', emoji: '💯', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Untuk return moderat dengan risiko di bawah saham, pilih?', explanation: 'Reksa Dana Obligasi menawarkan return stabil 7-10% dengan risiko lebih rendah dari reksa dana saham.', options: [{ label: 'RDPU', emoji: '💼', is_correct: false }, { label: 'Reksa Dana Obligasi', emoji: '📋', is_correct: true }, { label: 'Reksa Dana Saham', emoji: '📈', is_correct: false }, { label: 'Kripto', emoji: '₿', is_correct: false }] },
      ]
    },
    {
      id: 'l2-4', title: 'Emas: Si Kebal Krisis', emoji: '🥇', display_order: 4,
      slides: [
        { tag: 'SAFE HAVEN', title: 'Mengapa Emas Spesial?', body: 'Emas adalah aset "safe haven" — nilainya cenderung naik saat krisis ekonomi. Investor berbondong ke emas saat pasar saham jatuh.', visual_emoji: '🛡️', display_order: 1 },
        { tag: 'CARA BELI', title: 'Pilihan Investasi Emas', body: 'Emas fisik (Antam), tabungan emas (Pegadaian), atau digital (aplikasi). Kekurangan: tidak ada dividen/bunga, perlu tempat penyimpanan aman.', visual_emoji: '📱', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Mengapa emas disebut "safe haven" asset?', explanation: 'Emas cenderung naik nilainya saat krisis karena investor beralih ke aset aman yang tahan inflasi.', options: [{ label: 'Return paling tinggi', emoji: '🚀', is_correct: false }, { label: 'Nilainya stabil saat krisis', emoji: '🛡️', is_correct: true }, { label: 'Dijamin pemerintah', emoji: '🏛️', is_correct: false }, { label: 'Bisa dimakan', emoji: '😋', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Kelemahan investasi emas dibanding saham adalah?', explanation: 'Emas tidak menghasilkan passive income seperti dividen saham atau bunga deposito.', options: [{ label: 'Harganya selalu turun', emoji: '📉', is_correct: false }, { label: 'Tidak ada dividen/bunga', emoji: '❌', is_correct: true }, { label: 'Sulit dijual', emoji: '😓', is_correct: false }, { label: 'Ilegal di Indonesia', emoji: '🚫', is_correct: false }] },
      ]
    },
    {
      id: 'l2-5', title: 'Saham: Punya Perusahaan Sendiri', emoji: '📈', display_order: 5,
      slides: [
        { tag: 'KONSEP', title: 'Jadi Pemilik Perusahaan', body: 'Membeli saham = membeli kepemilikan sebagian perusahaan. Jika perusahaan berkembang, harga sahammu naik. Kamu juga bisa dapat dividen!', visual_emoji: '🏢', display_order: 1 },
        { tag: 'RISIKO & REWARD', title: 'Potensi Tertinggi, Risiko Tertinggi', body: 'Saham memiliki potensi return tertinggi di antara instrumen konvensional, tapi juga risiko tertinggi. Butuh analisis dan mental yang kuat.', visual_emoji: '⚡', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Apa yang kamu miliki saat membeli saham perusahaan?', explanation: 'Pemegang saham adalah pemilik sebagian perusahaan secara proporsional sesuai jumlah saham.', options: [{ label: 'Hutang perusahaan', emoji: '💸', is_correct: false }, { label: 'Sebagian kepemilikan', emoji: '🏢', is_correct: true }, { label: 'Seluruh aset perusahaan', emoji: '🏭', is_correct: false }, { label: 'Hak voting saja', emoji: '🗳️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 2, question: 'Manfaat memegang saham selain kenaikan harga adalah?', explanation: 'Pemegang saham berhak mendapatkan dividen — pembagian keuntungan perusahaan.', options: [{ label: 'Gaji dari perusahaan', emoji: '💼', is_correct: false }, { label: 'Dividen', emoji: '💰', is_correct: true }, { label: 'Diskon belanja', emoji: '🛍️', is_correct: false }, { label: 'Gratis produk', emoji: '🎁', is_correct: false }] },
      ]
    },
  ]
}

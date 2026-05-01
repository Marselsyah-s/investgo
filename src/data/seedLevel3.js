export const level3 = {
  id: 3, title: 'Masuk ke Dunia Saham', icon: '📜', display_order: 3,
  color: '#FF6B35', shadowColor: '#cc4e1a', bgColor: '#fff3ee',
  lessons: [
    {
      id: 'l3-1', title: 'Apa itu Saham & Pasar?', emoji: '🏛️', display_order: 1,
      slides: [
        { tag: 'DASAR', title: 'Saham & Cara Kerjanya', body: 'Saham adalah bukti kepemilikan perusahaan. Pasar saham bekerja seperti pasar biasa: ada penjual dan pembeli, harga ditentukan oleh supply & demand.', visual_emoji: '⚖️', display_order: 1 },
        { tag: 'BURSA', title: 'Bursa Efek Indonesia (BEI)', body: 'Di Indonesia, transaksi saham terjadi di BEI (IDX). BEI mempertemukan perusahaan yang butuh modal dengan investor yang ingin menanamkan uangnya.', visual_emoji: '🏢', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Di mana transaksi saham Indonesia berlangsung?', explanation: 'BEI (Bursa Efek Indonesia) adalah tempat resmi jual beli saham perusahaan Indonesia.', options: [{ label: 'Bank Indonesia', emoji: '🏦', is_correct: false }, { label: 'OJK', emoji: '🏛️', is_correct: false }, { label: 'Bursa Efek Indonesia', emoji: '📊', is_correct: true }, { label: 'Kementerian Keuangan', emoji: '🏢', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Apa yang menentukan harga saham di pasar?', explanation: 'Harga saham ditentukan oleh mekanisme pasar — seberapa banyak yang mau beli vs yang mau jual.', options: [{ label: 'Pemerintah', emoji: '🏛️', is_correct: false }, { label: 'Bank Indonesia', emoji: '🏦', is_correct: false }, { label: 'Penawaran & permintaan', emoji: '⚖️', is_correct: true }, { label: 'OJK langsung', emoji: '📋', is_correct: false }] },
      ]
    },
    {
      id: 'l3-2', title: 'Mengenal IHSG', emoji: '📊', display_order: 2,
      slides: [
        { tag: 'INDEKS', title: 'IHSG = Termometer Pasar', body: 'IHSG (Indeks Harga Saham Gabungan) mengukur kinerja rata-rata seluruh saham di BEI. IHSG naik = pasar bergairah, IHSG turun = pasar lesu.', visual_emoji: '🌡️', display_order: 1 },
        { tag: 'FUNGSI', title: 'Mengapa IHSG Penting?', body: 'Investor global memperhatikan IHSG untuk menilai kesehatan ekonomi Indonesia. IHSG juga jadi acuan performa reksa dana saham.', visual_emoji: '🌍', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'IHSG adalah indikator dari?', explanation: 'IHSG merupakan rata-rata tertimbang seluruh saham di BEI, mencerminkan kondisi pasar secara keseluruhan.', options: [{ label: 'Kurs rupiah', emoji: '💱', is_correct: false }, { label: 'Kinerja rata-rata saham BEI', emoji: '📊', is_correct: true }, { label: 'Harga komoditas', emoji: '🛢️', is_correct: false }, { label: 'Suku bunga BI', emoji: '🏦', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Jika IHSG turun signifikan, artinya?', explanation: 'IHSG turun berarti rata-rata harga saham menurun, tapi tidak berarti semua saham pasti turun.', options: [{ label: 'Semua saham pasti turun', emoji: '📉', is_correct: false }, { label: 'Rata-rata saham sedang turun', emoji: '⬇️', is_correct: true }, { label: 'Rupiah menguat', emoji: '💪', is_correct: false }, { label: 'BI naikkan bunga', emoji: '🏦', is_correct: false }] },
      ]
    },
    {
      id: 'l3-3', title: 'Sekuritas/Broker', emoji: '🤝', display_order: 3,
      slides: [
        { tag: 'PERANTARA', title: 'Apa Itu Sekuritas?', body: 'Sekuritas (broker) adalah perantara resmi berlisensi OJK yang memungkinkan investor membeli/menjual saham di BEI. Wajib punya rekening di sekuritas untuk trading.', visual_emoji: '🌉', display_order: 1 },
        { tag: 'PILIHAN', title: 'Sekuritas Populer Indonesia', body: 'BCA Sekuritas, Mandiri Sekuritas, Indo Premier (IPOT), Mirae Asset, Stockbit. Perhatikan biaya komisi (0.1-0.3%) karena mempengaruhi keuntungan bersih.', visual_emoji: '📱', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Mengapa perlu sekuritas untuk membeli saham?', explanation: 'Sekuritas adalah perantara resmi berlisensi OJK yang menjembatani investor dengan pasar saham BEI.', options: [{ label: 'Karena saham itu mahal', emoji: '💰', is_correct: false }, { label: 'Wajib sebagai perantara resmi BEI', emoji: '🌉', is_correct: true }, { label: 'Karena ada pajaknya', emoji: '🧾', is_correct: false }, { label: 'Supaya ada diskon', emoji: '🏷️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Apa yang harus diperhatikan saat memilih sekuritas?', explanation: 'Pastikan sekuritas berlisensi OJK dan perhatikan biaya komisi karena mempengaruhi profit bersih.', options: [{ label: 'Warna aplikasinya', emoji: '🎨', is_correct: false }, { label: 'Lisensi OJK & komisi', emoji: '✅', is_correct: true }, { label: 'Jumlah karyawan', emoji: '👥', is_correct: false }, { label: 'Lokasi kantor', emoji: '📍', is_correct: false }] },
      ]
    },
    {
      id: 'l3-4', title: 'Lot dan Fraksi Harga', emoji: '📐', display_order: 4,
      slides: [
        { tag: 'SATUAN', title: 'Apa Itu LOT?', body: 'Di BEI, saham diperdagangkan dalam satuan LOT. 1 LOT = 100 lembar saham. Harga saham BBCA Rp9.000/lembar → 1 lot = Rp900.000.', visual_emoji: '📦', display_order: 1 },
        { tag: 'FRAKSI', title: 'Aturan Fraksi Harga', body: 'Fraksi = kelipatan minimal perubahan harga. Saham <Rp500 = fraksi Rp1. Rp500-Rp2.000 = fraksi Rp2. Rp2.000-Rp5.000 = fraksi Rp5. >Rp5.000 = fraksi Rp25.', visual_emoji: '🔢', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Berapa lembar saham dalam 1 LOT di BEI?', explanation: 'Di Bursa Efek Indonesia, 1 lot setara dengan 100 lembar saham.', options: [{ label: '10 lembar', emoji: '1️⃣', is_correct: false }, { label: '50 lembar', emoji: '5️⃣', is_correct: false }, { label: '100 lembar', emoji: '💯', is_correct: true }, { label: '1000 lembar', emoji: '🔢', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'Harga saham Rp8.000/lembar. Modal minimum untuk 1 lot?', explanation: '1 lot = 100 lembar. Rp8.000 × 100 = Rp800.000 untuk membeli 1 lot.', options: [{ label: 'Rp80.000', emoji: '💵', is_correct: false }, { label: 'Rp800.000', emoji: '💴', is_correct: true }, { label: 'Rp8.000.000', emoji: '💰', is_correct: false }, { label: 'Rp80.000.000', emoji: '🤑', is_correct: false }] },
      ]
    },
    {
      id: 'l3-5', title: 'Jam Perdagangan BEI', emoji: '🕐', display_order: 5,
      slides: [
        { tag: 'JADWAL', title: 'Kapan BEI Buka?', body: 'BEI buka Senin-Jumat (kecuali libur nasional). Sesi 1: 09:00-12:00 WIB. Sesi 2: 13:30-15:49 WIB. Di luar jam ini order tidak akan dieksekusi.', visual_emoji: '⏰', display_order: 1 },
        { tag: 'PRE-OPENING', title: 'Sesi Pra-Pembukaan', body: 'Pukul 08:45-08:59 WIB adalah sesi pra-pembukaan untuk menemukan harga pembukaan terbaik. Kamu sudah bisa memasukkan order di waktu ini.', visual_emoji: '🌅', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Sesi 1 perdagangan BEI berlangsung pukul berapa?', explanation: 'Sesi 1 perdagangan di BEI: 09:00 - 12:00 WIB setiap Senin sampai Jumat.', options: [{ label: '07:00-10:00', emoji: '🌅', is_correct: false }, { label: '08:00-11:00', emoji: '🌄', is_correct: false }, { label: '09:00-12:00', emoji: '✅', is_correct: true }, { label: '10:00-13:00', emoji: '☀️', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 2, question: 'BEI buka perdagangan pada hari apa?', explanation: 'BEI hanya buka Senin sampai Jumat, kecuali hari libur nasional.', options: [{ label: 'Setiap hari', emoji: '📅', is_correct: false }, { label: 'Senin-Sabtu', emoji: '6️⃣', is_correct: false }, { label: 'Senin-Jumat', emoji: '✅', is_correct: true }, { label: 'Selasa-Sabtu', emoji: '📆', is_correct: false }] },
      ]
    },
  ]
}

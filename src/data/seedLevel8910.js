export const level8 = {
  id: 8, title: 'Makro Ekonomi', icon: '🌍', display_order: 8,
  color: '#22c55e', shadowColor: '#16a34a', bgColor: '#f0fdf4',
  lessons: [
    {
      id: 'l8-1', title: 'Suku Bunga Bank Sentral (BI Rate)', emoji: '🏦', display_order: 1,
      slides: [
        { tag: 'KONSEP', title: 'Suku Bunga & Pasar', body: 'Bank Indonesia (BI) mengatur suku bunga acuan. Jika BI Rate naik, biaya pinjaman mahal, ekonomi melambat, tapi Rupiah menguat. Pasar saham biasanya bereaksi negatif terhadap kenaikan bunga.', visual_emoji: '📈', display_order: 1 },
        { tag: 'DAMPAK', title: 'Efek Suku Bunga', body: 'Bunga naik = Cicilan naik = Konsumsi turun = Laba perusahaan turun. Sebaliknya, jika bunga turun, pasar saham cenderung "pesta" karena biaya modal murah.', visual_emoji: '📉', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#00D166', xp: 20, display_order: 1, question: 'Secara umum, jika BI Rate naik, harga saham cenderung?', explanation: 'Bunga naik meningkatkan biaya modal dan menekan konsumsi, biasanya berdampak negatif pada harga saham.', options: [{ label: 'Naik tajam', emoji: '🚀', is_correct: false }, { label: 'Turun/Tertekan', emoji: '📉', is_correct: true }, { label: 'Tetap saja', emoji: '➡️', is_correct: false }, { label: 'Tidak relevan', emoji: '🤷', is_correct: false }] },
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#00D166', xp: 20, display_order: 2, question: 'Siapa yang mengatur suku bunga acuan di Indonesia?', explanation: 'Bank Indonesia (BI) adalah otoritas moneter yang menetapkan BI Rate.', options: [{ label: 'Bursa Efek Indonesia', emoji: '🏢', is_correct: false }, { label: 'Otoritas Jasa Keuangan', emoji: '🏛️', is_correct: false }, { label: 'Bank Indonesia', emoji: '🏦', is_correct: true }, { label: 'Presiden', emoji: '🇮🇩', is_correct: false }] },
      ]
    },
    {
      id: 'l8-2', title: 'Rupiah vs Dollar (USD/IDR)', emoji: '💱', display_order: 2,
      slides: [
        { tag: 'EKONOMI', title: 'Pengaruh Nilai Tukar', body: 'Pelemahan Rupiah (Depresiasi) menguntungkan Eksportir (seperti Batu Bara) tapi merugikan Importir (seperti Farmasi/BBM) karena biaya bahan baku jadi mahal.', visual_emoji: '💵', display_order: 1 },
        { tag: 'PASAR', title: 'Dollar Menguat, Saham...?', body: 'Jika Dollar terlalu perkasa, investor asing cenderung menarik dana dari pasar negara berkembang (termasuk Indonesia) kembali ke AS.', visual_emoji: '✈️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#00D166', xp: 20, display_order: 1, question: 'Perusahaan mana yang diuntungkan saat Rupiah melemah?', explanation: 'Eksportir diuntungkan karena pendapatan mereka dalam Dollar jadi lebih besar saat ditukar ke Rupiah.', options: [{ label: 'Importir obat-obatan', emoji: '💊', is_correct: false }, { label: 'Perusahaan Eksportir Komoditas', emoji: '🚢', is_correct: true }, { label: 'Perusahaan konstruksi', emoji: '🏗️', is_correct: false }, { label: 'Bank Lokal', emoji: '🏦', is_correct: false }] },
      ]
    },
    {
      id: 'l8-3', title: 'GDP & Pertumbuhan Ekonomi', emoji: '📈', display_order: 3,
      slides: [
        { tag: 'INDIKATOR', title: 'Mengenal GDP', body: 'GDP (Gross Domestic Product) mengukur nilai total barang/jasa suatu negara. GDP naik = Ekonomi ekspansi = Prospek saham bagus.', visual_emoji: '📊', display_order: 1 },
        { tag: 'RESEI', title: 'Apa itu Resesi?', body: 'Resesi adalah kondisi GDP negatif selama 2 kuartal berturut-turut. Saat resesi, daya beli turun drastis dan pasar saham biasanya "crash".', visual_emoji: '⚠️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#00D166', xp: 20, display_order: 1, question: 'Dua kuartal GDP negatif berturut-turut disebut?', explanation: 'Resesi secara teknis didefinisikan sebagai pertumbuhan GDP negatif selama minimal dua kuartal berturut-turut.', options: [{ label: 'Inflasi', emoji: '💸', is_correct: false }, { label: 'Deflasi', emoji: '📉', is_correct: false }, { label: 'Resesi', emoji: '🚨', is_correct: true }, { label: 'Stagflasi', emoji: '🐢', is_correct: false }] },
      ]
    },
    {
      id: 'l8-4', title: 'Harga Komoditas Global', emoji: '🛢️', display_order: 4,
      slides: [
        { tag: 'PENGGERAK', title: 'Batu Bara, Minyak, CPO', body: 'Indonesia adalah eksportir besar komoditas. Jika harga batu bara dunia naik, saham-saham tambang di BEI biasanya ikut terbang tinggi!', visual_emoji: '🔥', display_order: 1 },
        { tag: 'SYARIKAT', title: 'Saham Sektoral', body: 'Selalu pantau harga komoditas global jika kamu berinvestasi di sektor tambang, perkebunan (sawit), atau energi.', visual_emoji: '🌴', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#00D166', xp: 20, display_order: 1, question: 'Sektor apa yang paling dipengaruhi harga minyak dunia?', explanation: 'Harga minyak dunia secara langsung mempengaruhi pendapatan dan beban di sektor Energi dan Transportasi.', options: [{ label: 'Teknologi', emoji: '💻', is_correct: false }, { label: 'Perbankan', emoji: '🏦', is_correct: false }, { label: 'Energi', emoji: '🛢️', is_correct: true }, { label: 'Konsumer', emoji: '🥛', is_correct: false }] },
      ]
    },
    {
      id: 'l8-5', title: 'Berita Politik & Geopolitik', emoji: '🗳️', display_order: 5,
      slides: [
        { tag: 'SENTIMEN', title: 'Pasar Tidak Suka Ketidakpastian', body: 'Pemilu atau konflik perang global (geopolitik) menciptakan ketidakpastian. Investor cenderung "Wait and See" atau memindahkan uang ke aset aman (Emas).', visual_emoji: '🛡️', display_order: 1 },
        { tag: 'STRATEGI', title: 'Menyaring Berita', body: 'Bedakan antara "Noise" (berita harian yang tidak penting) dengan sentimen besar yang benar-benar merubah fundamental ekonomi.', visual_emoji: '🗞️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#00D166', xp: 20, display_order: 1, question: 'Saat terjadi perang besar global, investor biasanya beralih ke?', explanation: 'Saat krisis atau perang, investor mencari keamanan pada aset "Safe Haven" seperti Emas.', options: [{ label: 'Saham Spekulatif', emoji: '🎰', is_correct: false }, { label: 'Aset Aman (Emas)', emoji: '🥇', is_correct: true }, { label: 'Mata uang kripto baru', emoji: '🪙', is_correct: false }, { label: 'Pinjaman online', emoji: '💸', is_correct: false }] },
      ]
    },
  ]
}

export const level9 = {
  id: 9, title: 'Psikologi Trading', icon: '🧠', display_order: 9,
  color: '#f97316', shadowColor: '#ea580c', bgColor: '#fff7ed',
  lessons: [
    {
      id: 'l9-1', title: 'FOMO: Musuh Utama Pemula', emoji: '😱', display_order: 1,
      slides: [
        { tag: 'PSIKOLOGI', title: 'Fear Of Missing Out', body: 'FOMO adalah rasa takut ketinggalan saat melihat harga saham sudah naik tinggi. Ini sering menjebak pemula untuk "beli di pucuk" karena emosi.', visual_emoji: '🕯️', display_order: 1 },
        { tag: 'SOLUSI', title: 'Jangan Kejar Kereta!', body: 'Jika harga sudah naik terlalu tinggi tanpa koreksi, lebih baik abaikan. Selalu akan ada peluang baru di saham lain atau di waktu lain.', visual_emoji: '🚆', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Beli saham hanya karena takut ketinggalan profit disebut?', explanation: 'FOMO (Fear of Missing Out) adalah jebakan psikologis di mana kita membeli karena takut tidak kebagian untung.', options: [{ label: 'Value Investing', emoji: '💎', is_correct: false }, { label: 'FOMO', emoji: '😱', is_correct: true }, { label: 'DCA', emoji: '📅', is_correct: false }, { label: 'Cut Loss', emoji: '✂️', is_correct: false }] },
      ]
    },
    {
      id: 'l9-2', title: 'FUD: Fear, Uncertainty, Doubt', emoji: '🌑', display_order: 2,
      slides: [
        { tag: 'PSIKOLOGI', title: 'Menyebar Ketakutan', body: 'FUD adalah strategi menyebar berita negatif untuk membuat investor panik dan menjual sahamnya (Panic Sell) di harga murah.', visual_emoji: '📣', display_order: 1 },
        { tag: 'SOLUSI', title: 'Cek Data, Bukan Gosip', body: 'Jangan mudah percaya berita yang tidak jelas sumbernya. Selalu cek kembali data fundamental perusahaan sebelum memutuskan menjual.', visual_emoji: '📊', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Menjual saham secara terburu-buru karena panik disebut?', explanation: 'Panic Selling adalah aksi jual yang didasari emosi takut, biasanya dipicu oleh berita negatif atau FUD.', options: [{ label: 'Take Profit', emoji: '💰', is_correct: false }, { label: 'Hold', emoji: '💎', is_correct: false }, { label: 'Panic Selling', emoji: '🏃', is_correct: true }, { label: 'Diversifikasi', emoji: '🥚', is_correct: false }] },
      ]
    },
    {
      id: 'l9-3', title: 'Bias Konfirmasi', emoji: '👓', display_order: 3,
      slides: [
        { tag: 'PSIKOLOGI', title: 'Hanya Melihat Yang Disuka', body: 'Bias konfirmasi adalah kecenderungan mencari informasi yang hanya mendukung opini kita. Kita jadi menutup mata pada berita negatif tentang saham yang kita punya.', visual_emoji: '🚫', display_order: 1 },
        { tag: 'SOLUSI', title: 'Jadilah Objektif', body: 'Cari informasi dari dua sisi. Tanya: "Apa alasan yang membuat saham ini bisa turun?". Jangan jatuh cinta berlebihan pada satu saham.', visual_emoji: '⚖️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Jangan jatuh cinta pada saham artinya?', explanation: 'Investasi harus rasional. Jika fundamental memburuk, kita harus siap menjualnya tanpa ikatan emosional.', options: [{ label: 'Beli saham perusahaan pacar', emoji: '❤️', is_correct: false }, { label: 'Jangan emosional dalam berinvestasi', emoji: '🧠', is_correct: true }, { label: 'Hanya beli saham yang kita suka', emoji: '🛍️', is_correct: false }, { label: 'Gunakan modal sedikit saja', emoji: '🤏', is_correct: false }] },
      ]
    },
    {
      id: 'l9-4', title: 'Cut Loss: Seni Mengikhlaskan', emoji: '✂️', display_order: 4,
      slides: [
        { tag: 'STRATEGI', title: 'Membatasi Kerugian', body: 'Cut Loss adalah menjual saham di harga rendah untuk mencegah kerugian yang lebih besar. Lebih baik rugi 5% daripada rugi 50% karena tidak mau "cut loss".', visual_emoji: '🛑', display_order: 1 },
        { tag: 'MINDSET', title: 'Ego vs Portofolio', body: 'Mengakui kesalahan analisis adalah bagian dari menjadi investor profesional. Cut Loss bukan berarti kalah, tapi melindungi modalmu!', visual_emoji: '🛡️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Tujuan utama melakukan Cut Loss adalah?', explanation: 'Cut Loss bertujuan membatasi kerugian agar modal tidak habis tertelan penurunan yang sangat dalam.', options: [{ label: 'Menambah modal', emoji: '💰', is_correct: false }, { label: 'Membatasi kerugian lebih lanjut', emoji: '✅', is_correct: true }, { label: 'Membayar pajak', emoji: '🧾', is_correct: false }, { label: 'Memamerkan kerugian', emoji: '🤳', is_correct: false }] },
      ]
    },
    {
      id: 'l9-5', title: 'Take Profit: Jangan Serakah!', emoji: '💰', display_order: 5,
      slides: [
        { tag: 'STRATEGI', title: 'Merealisasikan Cuan', body: 'Keuntungan belum nyata jika belum dijual (Floating Profit). Take profit adalah merealisasikan keuntungan sesuai target awal yang sudah dibuat.', visual_emoji: '🏦', display_order: 1 },
        { tag: 'SOLUSI', title: 'Trailing Stop', body: 'Gunakan Trailing Stop: naikkan batas stop-loss mengikuti kenaikan harga. Jadi kalau harga berbalik turun, cuanmu sudah terkunci aman.', visual_emoji: '🔒', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#FF6B35', xp: 20, display_order: 1, question: 'Profit yang belum direalisasikan disebut?', explanation: 'Floating Profit adalah keuntungan yang tampak di layar tapi belum kita realisasikan dengan menjual sahamnya.', options: [{ label: 'Nett Profit', emoji: '✅', is_correct: false }, { label: 'Floating Profit', emoji: '☁️', is_correct: true }, { label: 'Gross Profit', emoji: '📦', is_correct: false }, { label: 'Dividen', emoji: '💸', is_correct: false }] },
      ]
    },
  ]
}

export const level10 = {
  id: 10, title: 'Money Management', icon: '🏆', display_order: 10,
  color: '#71717a', shadowColor: '#3f3f46', bgColor: '#f4f4f5',
  lessons: [
    {
      id: 'l10-1', title: 'Diversifikasi', emoji: '🧺', display_order: 1,
      slides: [
        { tag: 'STRATEGI', title: 'Banyak Keranjang', body: '"Don\'t put all your eggs in one basket." Sebarkan modal ke beberapa saham dari sektor berbeda (misal: Bank, Konsumer, Tambang) untuk meminimalkan risiko.', visual_emoji: '🥚', display_order: 1 },
        { tag: 'LIMIT', title: 'Jangan Terlalu Banyak!', body: 'Idealnya miliki 3-8 saham berkualitas. Terlalu banyak saham (Over-diversification) membuat portofolio sulit dipantau dan profit tidak maksimal.', visual_emoji: '🔎', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Manfaat utama diversifikasi adalah?', explanation: 'Diversifikasi menyebarkan risiko — jika satu sektor turun, portofolio tetap terjaga oleh sektor lainnya.', options: [{ label: 'Pasti untung besar', emoji: '🚀', is_correct: false }, { label: 'Meminimalkan risiko total', emoji: '🛡️', is_correct: true }, { label: 'Bebas pajak', emoji: '🧾', is_correct: false }, { label: 'Mempercepat transaksi', emoji: '⚡', is_correct: false }] },
      ]
    },
    {
      id: 'l10-2', title: 'Dollar Cost Averaging (DCA)', emoji: '📅', display_order: 2,
      slides: [
        { tag: 'STRATEGI', title: 'Nyicil Rutin', body: 'DCA adalah strategi beli secara rutin (misal: tiap tanggal gajian) tanpa mempedulikan harga pasar. Ini cocok bagi yang tidak punya waktu pantau grafik.', visual_emoji: '🕓', display_order: 1 },
        { tag: 'MANFAAT', title: 'Psikologi Tenang', body: 'Dengan DCA, kamu dapat "Harga Rata-rata". Saat harga turun, kamu dapat lembar lebih banyak. Saat naik, asetmu bertumbuh. Fokus pada jumlah lembar saham!', visual_emoji: '🧘', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Strategi DCA sangat cocok bagi investor yang?', explanation: 'DCA (nyicil rutin) sangat cocok bagi investor sibuk/karyawan yang ingin berinvestasi tanpa stres pantau harga.', options: [{ label: 'Mau cepat kaya semalam', emoji: '🤑', is_correct: false }, { label: 'Ingin investasi rutin tanpa ribet', emoji: '✅', is_correct: true }, { label: 'Suka trading harian', emoji: '💻', is_correct: false }, { label: 'Punya modal miliaran sekali beli', emoji: '🐳', is_correct: false }] },
      ]
    },
    {
      id: 'l10-3', title: 'Lump Sum vs Nyicil', emoji: '📦', display_order: 3,
      slides: [
        { tag: 'STRATEGI', title: 'Beli Sekaligus', body: 'Lump Sum adalah membeli dalam jumlah besar di satu waktu. Cocok saat harga sedang murah-murahnya (Undervalued) atau saat awal tren naik.', visual_emoji: '🐘', display_order: 1 },
        { tag: 'RISIKO', title: 'Timing is Key', body: 'Risiko Lump Sum adalah jika ternyata harga lanjut turun setelah kita beli. Pastikan analisis fundamental dan teknikalmu sudah sangat kuat.', visual_emoji: '⏲️', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Beli sekaligus dalam jumlah besar di satu waktu disebut?', explanation: 'Lump Sum adalah memasukkan modal besar sekaligus di satu titik waktu.', options: [{ label: 'DCA', emoji: '📅', is_correct: false }, { label: 'Lump Sum', emoji: '🐘', is_correct: true }, { label: 'Emas', emoji: '🥇', is_correct: false }, { label: 'Hutang', emoji: '💸', is_correct: false }] },
      ]
    },
    {
      id: 'l10-4', title: 'Risk/Reward Ratio', emoji: '⚖️', display_order: 4,
      slides: [
        { tag: 'ANALISIS', title: 'Hitung Untung Rugimu', body: 'Sebelum beli, tentukan Risk/Reward Ratio. Misal 1:2. Jika potensi rugi (Cut Loss) 5%, maka target untung (Take Profit) minimal harus 10%.', visual_emoji: '📊', display_order: 1 },
        { tag: 'PROBABILITAS', title: 'Bertahan Jangka Panjang', body: 'Meski akurasi analisismu hanya 50%, dengan RR Ratio yang baik (misal 1:3), portofoliomu akan tetap untung dalam jangka panjang.', visual_emoji: '📈', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Jika RR Ratio 1:3 dan target profit 15%, maka batas cut loss adalah?', explanation: '1 bagian risiko : 3 bagian reward. Jika 3 bagian = 15%, maka 1 bagian = 15% ÷ 3 = 5%.', options: [{ label: '5%', emoji: '5️⃣', is_correct: true }, { label: '10%', emoji: '🔟', is_correct: false }, { label: '15%', emoji: '📏', is_correct: false }, { label: '20%', emoji: '2️⃣', is_correct: false }] },
      ]
    },
    {
      id: 'l10-5', title: 'Merakit Portofolio Impian', emoji: '🏗️', display_order: 5,
      slides: [
        { tag: 'FINAL', title: 'Selamat Berinvestasi!', body: 'Kini kamu sudah punya bekal: Mindset, Pengetahuan Produk, Analisis, Psikologi, dan Money Management. Saatnya mulai merakit portofoliomu sendiri!', visual_emoji: '🎓', display_order: 1 },
        { tag: 'PESAN', title: 'Terus Belajar', body: 'Pasar saham selalu dinamis. Kunci sukses adalah konsistensi, kesabaran, dan kemauan untuk terus belajar dari kesalahan. Happy Investing!', visual_emoji: '🚀', display_order: 2 },
      ],
      questions: [
        { type: 'choice', tag: 'PILIHAN GANDA', tag_color: '#7C4DFF', xp: 20, display_order: 1, question: 'Faktor paling menentukan kesuksesan jangka panjang adalah?', explanation: 'Disiplin dan konsistensi menjaga strategi jauh lebih penting daripada sekadar menebak arah harga jangka pendek.', options: [{ label: 'Keberuntungan', emoji: '🍀', is_correct: false }, { label: 'Modal miliaran', emoji: '💰', is_correct: false }, { label: 'Disiplin & Konsistensi', emoji: '✅', is_correct: true }, { label: 'Mendengar gosip', emoji: '👂', is_correct: false }] },
      ]
    },
  ]
}

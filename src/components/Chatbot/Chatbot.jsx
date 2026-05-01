import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Halo bosku! Ada yang bisa Bang Cuan bantu hari ini? Mau analisa teknikal, cek fundamental, atau sekalian kita bedah portofolio lu yang merah-merah itu? 😉' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRoasting, setIsRoasting] = useState(false);
    const [pdfContext, setPdfContext] = useState("");
    const [pdfName, setPdfName] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Data base64 untuk dikirim ke API
    const [imagePreview, setImagePreview] = useState(null); // URL untuk menampilkan gambar di UI

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setPdfName(file.name);
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            setPdfContext(data.text);
            alert(`Laporan ${file.name} sukses dibaca!`);
        } catch (error) {
            alert("Gagal upload PDF.");
        } finally {
            setIsUploading(false);
        }
    };

    // Fungsi untuk memproses file gambar ke Base64
    const processImage = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result); // Simpan preview
            setSelectedImage(reader.result.split(',')[1]); // Simpan base64 murni
        };
        reader.readAsDataURL(file);
    };

    // Fungsi untuk menangkap event paste (Ctrl+V)
    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const blob = items[i].getAsFile();
                processImage(blob);
            }
        }
    };

    const sendMessage = async () => {
        // KOREKSI: Gunakan imagePreview (URL untuk UI) sebagai pengecekan
        if (!input.trim() && !imagePreview) return;

        // --- LANGKAH 1: GUNAKAN KONSTANTA ---
        const currentInput = input;
        const currentImageForUI = imagePreview; // Untuk ditampilin di bubble chat
        const currentImageForAPI = selectedImage; // Base64 murni untuk dikirim ke Python

        // Masukkan gambar ke dalam objek pesan agar bisa tampil di bubble chat
        const userMessage = {
            sender: 'user',
            text: currentInput,
            image: currentImageForUI // Simpan DataURL di sini
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        // KOREKSI: Reset semua state form agar gambar hilang dari input area
        setInput('');
        setImagePreview(null);
        setSelectedImage(null);

        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: currentInput,
                    is_roasting: isRoasting,
                    pdf_context: pdfContext,
                    image_data: currentImageForAPI // Kirim Base64 murni ke backend
                })
            });

            const data = await response.json();
            setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] w-full gap-6 p-6 bg-[#F8F9FA]">
            {/* AREA CHAT UTAMA */}
            <div className="flex flex-col w-[70%] bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-50 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#00C853] rounded-full flex items-center justify-center text-white text-xl">🤖</div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">AI Tutor – Bang Cuan</h3>
                        <p className="text-xs text-slate-400">Tanya saham atau minta di-roasting portofolio lu</p>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-[22px] text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${msg.sender === 'user'
                                ? 'bg-[#00C853] text-white rounded-tr-none'
                                : 'bg-[#F1F3F5] text-slate-700 rounded-tl-none'
                                }`}>

                                {/* 1. Render Teks Pesan */}
                                {msg.text && <div>{msg.text}</div>}

                                {/* 2. Render Gambar (Jika Ada di History) */}
                                {msg.image && (
                                    <div className="mt-2">
                                        <img
                                            src={msg.image}
                                            alt="Chat Attachment"
                                            className="max-w-[200px] h-auto rounded-lg border border-white/20 shadow-md"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && <div className="text-xs text-slate-400 animate-pulse ml-2">Bang Cuan lagi ngetik...</div>}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-5 border-t border-slate-50 bg-white">
                    {imagePreview && (
                        <div className="relative mb-2 ml-10 inline-block">
                            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border-2 border-[#00C853]" />
                            <button
                                onClick={() => { setImagePreview(null); setSelectedImage(null); }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px]"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    <div className="flex items-center gap-3 bg-[#F8F9FA] border border-slate-200 rounded-full px-6 py-3">
                        <label className="cursor-pointer text-slate-400 text-xl hover:scale-110 transition-transform">
                            📎
                            <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <input
                            type="text" className="flex-1 bg-transparent outline-none text-sm text-slate-600"
                            placeholder="Tanya Bang Cuan di sini..." value={input}
                            onPaste={handlePaste}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="w-10 h-10 bg-[#004D40] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#00332c] transition-colors">➤</button>
                    </div>
                </div>
            </div>

            {/* PANEL SAMPING (DETAIL SESUAI UI DESIGN) */}
            <div className="w-[30%] flex flex-col gap-6">
                {/* Gaya Asisten */}
                <div className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-4">Gaya Asisten</h4>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setIsRoasting(false)} className={`w-full p-4 rounded-2xl border text-sm font-medium flex items-center justify-between transition-all ${!isRoasting ? 'border-[#00C853] bg-[#F1FBF4] text-[#00C853]' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                            <div className="flex items-center gap-2"><span>🎓</span> Sopan & Edukatif</div>
                            {!isRoasting && <div className="w-3 h-3 bg-[#00C853] rounded-full ring-4 ring-green-100"></div>}
                        </button>
                        <button onClick={() => setIsRoasting(true)} className={`w-full p-4 rounded-2xl border text-sm font-medium flex items-center justify-between transition-all ${isRoasting ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                            <div className="flex items-center gap-2"><span>🔥</span> Roasting Mode</div>
                            {isRoasting && <div className="w-3 h-3 bg-orange-500 rounded-full ring-4 ring-orange-100"></div>}
                        </button>
                    </div>
                </div>

                {/* Analisis PDF */}
                <div className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">Analisis Laporan (PDF)</h4>
                    <p className="text-[12px] text-slate-400 mb-5 leading-relaxed">Minta Bang Cuan baca prospektus atau laporan keuangan biar gak perlu pusing.</p>

                    <label className="w-full h-40 border-2 border-dashed border-slate-200 rounded-[22px] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 hover:border-[#00C853] transition-all group">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-[#F1FBF4] group-hover:text-[#00C853] transition-all">☁️</div>
                        <div className="text-center">
                            <p className="text-[13px] font-bold text-slate-600">Tarik & Lepas laporan keuangan di sini</p>
                            <p className="text-[11px] text-slate-400 mt-1">atau Klik untuk upload</p>
                        </div>
                        <div className="px-3 py-1 bg-slate-100 rounded text-[9px] font-bold text-slate-400 uppercase tracking-wider">SUPPORTED: .PDF (MAX 5MB)</div>
                        <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
                    </label>
                    {pdfName && <p className="mt-3 text-[11px] text-[#00C853] font-bold animate-bounce text-center">✓ {pdfName} Berhasil Dimuat</p>}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
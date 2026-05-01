import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Halo bosku! Ada yang bisa Bang Cuan bantu hari ini? Mau analisa teknikal, cek fundamental, atau sekalian kita bedah portofolio lu yang merah-merah itu? 😉' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRoasting, setIsRoasting] = useState(false);

    // State PDF
    const [pdfContext, setPdfContext] = useState("");
    const [pdfName, setPdfName] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // State Gambar
    const [selectedImage, setSelectedImage] = useState(null); // Base64 murni untuk API Python
    const [imagePreview, setImagePreview] = useState(null); // URL lengkap untuk ditampilkan di UI

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Menangani Upload File (Bisa Gambar atau PDF)
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Jika user upload gambar lewat tombol klip
        if (file.type.startsWith('image/')) {
            processImage(file);
            return;
        }

        // Jika user upload PDF
        if (file.type === 'application/pdf') {
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
        }
    };

    // Fungsi memproses gambar menjadi Base64
    const processImage = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result); // Untuk Tampilan UI
            setSelectedImage(reader.result.split(',')[1]); // Untuk Dikirim ke API Backend
        };
        reader.readAsDataURL(file);
    };

    // Menangkap event Ctrl+V (Paste) dari clipboard
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
        // Jangan kirim jika teks dan gambar kosong
        if (!input.trim() && !imagePreview) return;

        const currentInput = input;
        const currentImageForUI = imagePreview;
        const currentImageForAPI = selectedImage;

        // Masukkan pesan user beserta gambarnya ke history chat
        const userMessage = {
            sender: 'user',
            text: currentInput,
            image: currentImageForUI
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        // Reset Form Input
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
                    image_data: currentImageForAPI
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
        <div className="flex h-[calc(100vh-140px)] w-full gap-6 p-6 bg-slate-50">

            {/* ================= AREA CHAT UTAMA ================= */}
            <div className="flex flex-col w-[70%] bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Header Chat */}
                <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-white z-10">
                    <div className="relative">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl shadow-sm">🤖</div>
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-base">AI Tutor – Bang Cuan</h3>
                        <p className="text-[13px] text-slate-400">Tanya saham atau minta di-roasting portofolio lu</p>
                    </div>
                </div>

                {/* Riwayat Chat */}
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scrollbar-hide bg-white">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex w-full gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                            {/* Avatar Bot */}
                            {msg.sender === 'bot' && (
                                <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm shadow-sm mt-1">🤖</div>
                            )}

                            {/* Gelembung Pesan */}
                            <div className={`max-w-[70%] p-4 text-[14px] leading-relaxed shadow-sm ${msg.sender === 'user'
                                ? 'bg-emerald-500 text-white rounded-2xl rounded-tr-sm'
                                : 'bg-slate-100 text-slate-700 rounded-2xl rounded-tl-sm'
                                }`}>

                                {/* Teks Pesan */}
                                {msg.text && <div>{msg.text}</div>}

                                {/* Gambar Pesan (Muncul di bubble chat) */}
                                {msg.image && (
                                    <div className="mt-3">
                                        <img
                                            src={msg.image}
                                            alt="Attachment"
                                            className="max-w-[250px] h-auto rounded-xl border border-white/20 shadow-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Avatar User */}
                            {msg.sender === 'user' && (
                                <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 text-slate-500 text-sm mt-1">👤</div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex w-full gap-3 justify-start">
                            <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm shadow-sm mt-1">🤖</div>
                            <div className="bg-slate-100 text-slate-400 text-xs p-4 rounded-2xl rounded-tl-sm animate-pulse">Bang Cuan lagi ngetik...</div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Form Input Bawah */}
                <div className="p-6 bg-white border-t border-slate-50">
                    {/* Preview Gambar Sebelum Dikirim */}
                    {imagePreview && (
                        <div className="relative mb-3 ml-4 inline-block">
                            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border-2 border-emerald-500 shadow-sm" />
                            <button
                                onClick={() => { setImagePreview(null); setSelectedImage(null); }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600 shadow-md transition-transform hover:scale-105"
                            >✕</button>
                        </div>
                    )}

                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-5 py-3 focus-within:border-emerald-500 focus-within:bg-white transition-all shadow-sm">
                        <label className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder-slate-400"
                            placeholder="Tanya Bang Cuan di sini..."
                            value={input}
                            onPaste={handlePaste}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center text-white shadow-md hover:bg-emerald-900 transition-transform hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 translate-x-[-1px]" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= PANEL SAMPING (SIDEBAR) ================= */}
            <div className="w-[30%] flex flex-col gap-6">

                {/* Gaya Asisten */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 text-[15px]">Gaya Asisten</h4>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setIsRoasting(false)}
                            className={`w-full p-3.5 rounded-full border text-[14px] font-medium flex items-center justify-between transition-all outline-none ${!isRoasting ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-3"><span className="text-lg">🎓</span> Sopan & Edukatif</div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isRoasting ? 'border-emerald-500' : 'border-slate-300'}`}>
                                {!isRoasting && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                            </div>
                        </button>

                        <button
                            onClick={() => setIsRoasting(true)}
                            className={`w-full p-3.5 rounded-full border text-[14px] font-medium flex items-center justify-between transition-all outline-none ${isRoasting ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-3"><span className="text-lg">🔥</span> Roasting Mode</div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isRoasting ? 'border-orange-500' : 'border-slate-300'}`}>
                                {isRoasting && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Analisis PDF */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-2 text-[15px]">Analisis Laporan (PDF)</h4>
                    <p className="text-[13px] text-slate-500 mb-5 leading-relaxed">Minta Bang Cuan baca prospektus atau laporan keuangan biar gak perlu pusing.</p>

                    <label className="w-full h-36 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-all group">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm group-hover:text-emerald-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <div className="text-center px-4">
                            <p className="text-[13px] font-bold text-slate-700">Tarik & Lepas laporan keuangan di sini</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">atau Klik untuk upload</p>
                        </div>
                        <div className="mt-1 px-3 py-1 bg-slate-200/50 rounded-full text-[10px] font-bold text-slate-500">SUPPORTED: .PDF (MAX 5MB)</div>
                        <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
                    </label>

                    {pdfName && <p className="mt-3 text-[12px] text-emerald-500 font-bold text-center flex items-center justify-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {pdfName} Berhasil Dimuat
                    </p>}
                </div>

            </div>
        </div>
    );
}

export default Chatbot;
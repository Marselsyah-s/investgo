import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, Send, User, Bot, Flame, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Halo bosku! Ada yang bisa Bang Cuan bantu hari ini? Mau analisa teknikal, cek fundamental, atau sekalian kita bedah portofolio lu yang merah-merah itu? 😉' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRoasting, setIsRoasting] = useState(false);
  
  // File upload state
  const [pdfContext, setPdfContext] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const processImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedImage(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

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
    if (!input.trim() && !selectedImage && !pdfContext) return;
    
    // Capture current PDF state before clearing
    const currentPdfName = pdfName;
    const currentPdfContext = pdfContext;
    const currentImageData = selectedImage;

    const userMessage = { 
      sender: 'user', 
      text: input, 
      image: imagePreview,
      pdfFile: currentPdfName || null 
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setImagePreview(null);
    setSelectedImage(null);
    // Clear PDF state after sending so it moves to chat history
    setPdfName('');
    setPdfContext('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      let replyText = "";
      
      if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        
        let promptText = `Kamu adalah Bang Cuan, seorang pakar investasi dan mentor finansial gaul dari InvestGo. Gaya bicara lu santai, asik, pakai bahasa gaul Indonesia (lu, gw, bro, bosku). \n\n`;
        
        if (isRoasting) {
          promptText += `MODE ROASTING AKTIF: Lu harus roasting portofolio atau pertanyaan user dengan pedas, sarkas, tapi tetap ngasih insight edukasi di akhir biar mereka sadar kesalahannya. Jangan ragu buat ngejek gaya investasi mereka yang cupu.\n\n`;
        } else {
          promptText += `MODE EDUKASI AKTIF: Berikan jawaban edukatif, jelas, dan memotivasi tentang investasi atau saham.\n\n`;
        }
        
        if (currentPdfContext) {
          promptText += `Ini ada konteks dokumen PDF dari user:\n"""\n${currentPdfContext}\n"""\n\n`;
        }
        
        promptText += `Pertanyaan User: ${input}`;
        
        const contents = [
          { role: "user", parts: [{ text: promptText }] }
        ];
        
        if (currentImageData) {
           contents[0].parts.push({
             inlineData: {
               data: currentImageData,
               mimeType: "image/jpeg"
             }
           });
        }

        const result = await model.generateContent({ contents });
        replyText = result.response.text();
      } else {
        // Fallback to Pollinations AI
        let systemPrompt = `Kamu adalah Bang Cuan, mentor investasi. ${isRoasting ? 'Roasting dengan pedas tapi edukatif.' : 'Beri jawaban edukatif.'}`;
        let fullPrompt = `${systemPrompt}\nUser: ${input}`;
        if (currentPdfContext) fullPrompt += `\nKonteks: ${currentPdfContext}`;
        
        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}`);
        replyText = await res.text();
      }
      
      setMessages([...newMessages, { sender: 'bot', text: replyText }]);
    } catch (error) {
        console.error("Chat error:", error);
        setMessages([...newMessages, { sender: 'bot', text: 'Waduh, otak Bang Cuan lagi ngadat nih bro. Cek koneksi atau limit API lu ya.' }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="stitch-chatbot-layout">
      <div className="stitch-chat-container">
        <div className="stitch-chat-header">
          <div className="stitch-chat-header-info">
            <h2>Bang Cuan - AI Tutor</h2>
            <p>Tanya saham, bedah fundamental, atau roasting portofolio</p>
          </div>
          <div className="stitch-chat-header-actions">
            <div className="stitch-settings-group-header">
              <button 
                className={`stitch-mode-btn ${!isRoasting ? 'active-edu' : ''}`}
                onClick={() => setIsRoasting(false)}
              >
                <Bot size={16} /> Edukatif
              </button>
              <button 
                className={`stitch-mode-btn ${isRoasting ? 'active-roast' : ''}`}
                onClick={() => setIsRoasting(true)}
              >
                <Flame size={16} /> Roasting
              </button>
            </div>
          </div>
        </div>

        <div className="stitch-messages-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`stitch-message-wrapper ${msg.sender}`}>
              <div className="stitch-avatar">
                {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className="stitch-message-bubble">
                {msg.pdfFile && (
                  <div className="stitch-pdf-attachment">
                    <FileText size={18} />
                    <span>{msg.pdfFile}</span>
                  </div>
                )}
                {msg.image && (
                  <img src={msg.image} alt="User upload" className="stitch-uploaded-image" />
                )}
                {msg.text && (
                  <div className="stitch-message-text">
                    {msg.sender === 'bot' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="stitch-message-wrapper bot">
              <div className="stitch-avatar">
                <Bot size={20} />
              </div>
              <div className="stitch-typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="stitch-input-area">
          {imagePreview && (
            <div className="stitch-image-preview">
              <img src={imagePreview} alt="Preview" />
              <button onClick={() => { setImagePreview(null); setSelectedImage(null); }}>✕</button>
            </div>
          )}
          {pdfName && (
            <div className="stitch-pdf-preview">
              <span className="text-sm">📄 {pdfName} (Loaded)</span>
              <button onClick={() => { setPdfName(""); setPdfContext(""); }}>✕</button>
            </div>
          )}
          
          <div className="stitch-input-wrapper">
            <label className="stitch-attach-btn" title="Upload PDF">
              <Paperclip size={20} />
              <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" style={{display: 'none'}} />
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onPaste={handlePaste}
              placeholder="Ketik atau paste gambar di sini..."
              rows={1}
            />
            <button 
              className={`stitch-send-btn ${(input.trim() || selectedImage || pdfContext) ? 'active' : ''}`}
              onClick={sendMessage}
              disabled={isLoading}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="stitch-input-footer">
            Bang Cuan bisa salah. Pastikan kamu selalu melakukan riset mandiri (DYOR).
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
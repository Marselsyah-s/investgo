import base64
import os
import io
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import PyPDF2
import uvicorn
from typing import Optional

# Setup Environment
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel('models/gemini-2.5-flash')

app = FastAPI(title="API Bang Cuan - InvestGo")

# Middleware CORS agar bisa diakses dari Frontend React (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Satu Schema untuk semua kebutuhan Chat
class ChatInput(BaseModel):
    message: str
    is_roasting: bool = False
    pdf_context: str = ""
    image_data: Optional[str] = None # Support gambar base64

# ==========================================
# ENDPOINT: UPLOAD & BACA PDF
# ==========================================
@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        content = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        extracted_text = ""
        
        for page in pdf_reader.pages:
            extracted_text += page.extract_text() + "\n"
            
        # Batasi panjang teks agar tidak overload token
        return {"text": extracted_text[:15000]} 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal baca PDF: {str(e)}")

# ==========================================
# ENDPOINT: CHAT (Persona + Vision + PDF)
# ==========================================
@app.post("/api/chat")
async def chat_with_bang_cuan(req: ChatInput):
    try:
        # Tentukan Persona berdasarkan toggle roasting
        if req.is_roasting:
            persona = "Gaya bicara lu sarkas, tajam, pedas, dan suka ngeledek (roasting) keputusan investasi user yang boncos. Pakai bahasa tongkrongan Jaksel (lo/gue, fomo, nyangkut, cuan). Jangan sungkan buat ngejek portofolionya."
        else:
            persona = "Gaya bicara lu ramah, sopan, sangat edukatif, dan membimbing pemula. Pakai bahasa yang asyik tapi tetap profesional."

        # Inisialisasi konten untuk Gemini (List Multimodal)
        content_list = []

        # Masukkan Instruksi Sistem (Prompt Utama)
        system_prompt = f"""
        Nama lu adalah "Bang Cuan", AI Tutor saham dari platform InvestaGo.
        {persona}
        
        Konteks dari Laporan Keuangan (PDF) yang diupload user:
        {req.pdf_context if req.pdf_context else "Tidak ada file PDF yang diupload."}
        
        Tugas lu: Jawab pertanyaan user atau analisa gambar yang dikirim berdasarkan persona lu.
        Pertanyaan User: {req.message}
        """
        content_list.append(system_prompt)

        # Jika ada kiriman gambar (Base64)
        if req.image_data:
            try:
                image_bytes = base64.b64decode(req.image_data)
                content_list.append({
                    "mime_type": "image/jpeg", 
                    "data": image_bytes
                })
            except Exception as img_err:
                print(f"Error decode gambar: {img_err}")

        # Eksekusi Generate Content
        response = model.generate_content(content_list)
        
        return {"reply": response.text}

    except Exception as e:
        # Berikan pesan error yang informatif jika terjadi kegagalan API
        error_msg = str(e)
        if "404" in error_msg:
            return {"reply": "Duh, Bang Cuan lagi maintenance atau model gemini-1.5-flash tidak ditemukan. Cek versi library-mu bro!"}
        return {"reply": f"Duh, mata Bang Cuan lagi kelilipan: {error_msg}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
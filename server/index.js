import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Inisialisasi Supabase Client di backend
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint Klaim Misi Harian (Secure API)
app.post('/api/claim-quest', async (req, res) => {
  const { questId, rewardCoins } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Bearer

  if (!token) {
    return res.status(401).json({ error: 'Tidak ada token autentikasi' });
  }

  try {
    // 1. Verifikasi Token User (Anti-Kecurangan 1: Memastikan yang request benar-benar user asli)
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Token tidak valid atau sudah kadaluarsa' });
    }

    const userId = authData.user.id;

    // 2. Cek ke database apakah misi benar-benar belum diklaim (Anti-Kecurangan 2)
    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('coins, claimed_quests')
      .eq('user_id', userId)
      .maybeSingle();

    if (statsError) throw statsError;

    const currentCoins = stats?.coins || 0;
    const claimedQuests = stats?.claimed_quests || [];
    const inventory = stats?.inventory || [];

    // Ubah semua elemen ke string untuk memastikan kecocokan
    if (claimedQuests.map(String).includes(String(questId))) {
      return res.status(400).json({ error: 'Misi ini sudah diklaim sebelumnya!' });
    }

    // 3. Update ke database jika semua valid
    const newCoins = currentCoins + rewardCoins;
    const newClaimedQuests = [...claimedQuests, questId];

    const { data: updateData, error: updateError } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        coins: newCoins,
        claimed_quests: newClaimedQuests,
        inventory: inventory // Pastikan inventory tidak ikut ter-reset
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateError) throw updateError;

    // Kirim respons sukses ke Frontend
    return res.status(200).json({
      message: 'Klaim berhasil!',
      coins: updateData.coins,
      claimed_quests: updateData.claimed_quests
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server Express' });
  }
});

// Endpoint Beli Item Toko (Secure API)
app.post('/api/buy-item', async (req, res) => {
  const { itemId, price } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Tidak ada token autentikasi' });
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Token tidak valid atau sudah kadaluarsa' });
    }

    const userId = authData.user.id;

    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('coins, claimed_quests, inventory')
      .eq('user_id', userId)
      .maybeSingle();

    if (statsError) throw statsError;

    const currentCoins = stats?.coins || 0;
    const inventory = stats?.inventory || [];
    const claimedQuests = stats?.claimed_quests || [];

    if (currentCoins < price) {
      return res.status(400).json({ error: 'Koin tidak mencukupi' });
    }

    if (inventory.includes(String(itemId))) {
      return res.status(400).json({ error: 'Item ini sudah kamu miliki!' });
    }

    const newCoins = currentCoins - price;
    const newInventory = [...inventory, String(itemId)];

    const { data: updateData, error: updateError } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        coins: newCoins,
        claimed_quests: claimedQuests,
        inventory: newInventory
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateError) throw updateError;

    return res.status(200).json({
      message: 'Pembelian berhasil!',
      coins: updateData.coins,
      inventory: updateData.inventory
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server Express' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Express berjalan aman di http://localhost:${PORT}`);
});

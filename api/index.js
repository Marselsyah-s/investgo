import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

app.use(cors());
app.use(express.json());

// Inisialisasi Supabase Client di backend (Service Role untuk bypass RLS)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint Klaim Misi Harian (Secure API)
app.post('/api/claim-quest', async (req, res) => {
  const { questId, rewardCoins } = req.body;
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
    const claimedQuests = stats?.claimed_quests || [];
    const inventory = stats?.inventory || [];

    if (claimedQuests.map(String).includes(String(questId))) {
      return res.status(400).json({ error: 'Misi ini sudah diklaim sebelumnya!' });
    }

    const newCoins = currentCoins + rewardCoins;
    const newClaimedQuests = [...claimedQuests, questId];

    const { data: updateData, error: updateError } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        coins: newCoins,
        claimed_quests: newClaimedQuests,
        inventory: inventory
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateError) throw updateError;

    return res.status(200).json({
      message: 'Klaim berhasil!',
      coins: updateData.coins,
      claimed_quests: updateData.claimed_quests
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
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
    return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Endpoint Kurangi Nyawa (Secure API)
app.post('/api/deduct-heart', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Tidak ada token autentikasi' });
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Token tidak valid' });
    }

    const userId = authData.user.id;

    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('hearts')
      .eq('user_id', userId)
      .maybeSingle();

    if (statsError) throw statsError;

    const currentHearts = stats?.hearts ?? 5;

    if (currentHearts <= 0) {
      return res.status(400).json({ error: 'Nyawa sudah habis!' });
    }

    const newHearts = currentHearts - 1;

    const { data: updateData, error: updateError } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        hearts: newHearts
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateError) throw updateError;

    res.status(200).json({ success: true, hearts: newHearts });
  } catch (err) {
    console.error('Error deduct heart:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint Beli Nyawa (Refill)
app.post('/api/refill-hearts', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) return res.status(401).json({ error: 'Invalid token' });

    const userId = authData.user.id;
    const REFILL_COST = 50;

    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('coins, hearts')
      .eq('user_id', userId)
      .maybeSingle();

    if (statsError) throw statsError;

    if (!stats || stats.coins < REFILL_COST) {
      return res.status(400).json({ error: 'Koin tidak cukup' });
    }

    if (stats.hearts >= 5) {
      return res.status(400).json({ error: 'Nyawa sudah penuh' });
    }

    const { error: updateError } = await supabase
      .from('user_stats')
      .update({
        hearts: 5,
        coins: stats.coins - REFILL_COST
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    res.status(200).json({ success: true, message: 'Nyawa berhasil dipulihkan' });
  } catch (err) {
    console.error('Error refill hearts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;

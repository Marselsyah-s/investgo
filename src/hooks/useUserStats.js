import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useUserStats() {
  const [stats, setStats] = useState({ coins: 0, hearts: 5 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let channel;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      
      if (!user) {
        setLoading(false)
        return
      }

      // 1. Initial Fetch
      const { data, error } = await supabase
        .from('user_stats')
        .select('coins, hearts')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (data) {
        setStats({ 
          coins: data.coins ?? 0, 
          hearts: data.hearts ?? 5 
        })
      }
      setLoading(false)

      // 2. Real-time Subscription
      channel = supabase
        .channel(`user_stats_sync_${user.id}`)
        .on('postgres_changes', {
          event: '*', // Dengarkan SEMUA perubahan (INSERT & UPDATE)
          schema: 'public',
          table: 'user_stats',
          filter: `user_id=eq.${user.id}`
        }, (payload) => {
          console.log('Real-time Update Received:', payload)
          if (payload.new) {
            setStats(prev => ({
              coins: payload.new.coins !== undefined ? payload.new.coins : prev.coins,
              hearts: payload.new.hearts !== undefined ? payload.new.hearts : prev.hearts
            }))
          }
        })
        .subscribe((status) => {
          console.log(`Supabase Real-time Status (${user.id}):`, status)
          if (status === 'CHANNEL_ERROR') {
            console.error('Gagal terhubung ke Real-time. Pastikan Replication sudah aktif di dashboard Supabase.')
          }
        })
    }

    init()
    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  const refresh = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return

    const { data } = await supabase
      .from('user_stats')
      .select('coins, hearts')
      .eq('user_id', session.user.id)
      .maybeSingle()
    
    if (data) {
      setStats({ 
        coins: data.coins ?? 0, 
        hearts: data.hearts ?? 5 
      })
    }
  }

  return { ...stats, loading, refresh }
}

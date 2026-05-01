import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Hook untuk mengelola progres belajar user.
 * - completedLessons: Set berisi lesson_id yang sudah diselesaikan
 * - saveProgress: fungsi untuk menyimpan lesson yang baru saja selesai
 */
export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState(new Set())
  const [totalXp, setTotalXp] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)

  // Ambil data progres saat komponen mount
  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      setUserId(user.id)

      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id, xp_earned')
        .eq('user_id', user.id)

      if (!error && data) {
        const ids = new Set(data.map(row => row.lesson_id))
        const xp = data.reduce((acc, row) => acc + (row.xp_earned || 0), 0)
        setCompletedLessons(ids)
        setTotalXp(xp)
      }
      setLoading(false)
    }

    fetchProgress()
  }, [])

  /**
   * Simpan progres lesson yang baru selesai ke Supabase.
   * @param {string} lessonId - ID lesson yang selesai
   * @param {number} xpEarned - XP yang didapat
   */
  const saveProgress = useCallback(async (lessonId, xpEarned = 0) => {
    if (!userId || completedLessons.has(lessonId)) return // Jangan simpan duplikat

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        xp_earned: xpEarned,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,lesson_id' })

    if (!error) {
      setCompletedLessons(prev => new Set([...prev, lessonId]))
      setTotalXp(prev => prev + xpEarned)
    } else {
      console.error('Gagal menyimpan progres:', error)
    }
  }, [userId, completedLessons])

  return { completedLessons, totalXp, loading, saveProgress }
}

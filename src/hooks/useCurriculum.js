import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useLevels() {
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    async function fetchLevels() {
      // Fetch levels and lessons together
      const { data, error } = await supabase
        .from('levels')
        .select(`
          *,
          lessons (*)
        `)
        .order('display_order', { ascending: true })

      if (error) {
        console.error('Error fetching levels:', error)
        setFetchError(error.message || 'Gagal mengambil data dari Supabase')
      } else {
        // Sort lessons within each level
        const sortedData = data.map(lvl => ({
          ...lvl,
          lessons: (lvl.lessons || []).sort((a, b) => a.display_order - b.display_order)
        }))
        setLevels(sortedData)
      }
      setLoading(false)
    }

    fetchLevels()
  }, [])

  return { levels, loading, error: fetchError }
}

export function useLesson(lessonId) {
  const [lesson, setLesson] = useState(null)
  const [slides, setSlides] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!lessonId) return

    async function fetchLessonData() {
      const [lessonRes, slidesRes, questionsRes] = await Promise.all([
        supabase.from('lessons').select('*').eq('id', lessonId).single(),
        supabase.from('slides').select('*').eq('lesson_id', lessonId).order('display_order', { ascending: true }),
        supabase.from('questions').select('*, options(*), match_pairs(*)').eq('lesson_id', lessonId).order('display_order', { ascending: true })
      ])

      if (lessonRes.data) setLesson(lessonRes.data)
      if (slidesRes.data) setSlides(slidesRes.data)
      if (questionsRes.data) setQuestions(questionsRes.data)
      
      setLoading(false)
    }

    fetchLessonData()
  }, [lessonId])

  return { lesson, slides, questions, loading }
}

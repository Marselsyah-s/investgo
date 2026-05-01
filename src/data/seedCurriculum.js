import { supabase } from '../lib/supabase'
import { level1 } from './seedLevel1'
import { level2 } from './seedLevel2'
import { level3 } from './seedLevel3'
import { level4, level5 } from './seedLevel45'
import { level6, level7 } from './seedLevel67'
import { level8, level9, level10 } from './seedLevel8910'

const ALL_LEVELS = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10]

export async function seedCurriculum() {
  console.log('🚀 Memulai seeding kurikulum...')

  for (const levelData of ALL_LEVELS) {
    console.log(`\n📦 Seeding Level ${levelData.id}: ${levelData.title}...`)

    // 1. Insert Level
    const { error: levelErr } = await supabase.from('levels').upsert({
      id: levelData.id,
      title: levelData.title,
      icon: levelData.icon,
      color: levelData.color,
      shadow_color: levelData.shadowColor,
      bg_color: levelData.bgColor,
      display_order: levelData.display_order
    })

    if (levelErr) { console.error('Error Level:', levelErr); continue }

    for (const lessonData of levelData.lessons) {
      console.log(`  📄 Lesson: ${lessonData.title}`)

      // 2. Insert Lesson
      const { error: lessonErr } = await supabase.from('lessons').upsert({
        id: lessonData.id,
        level_id: levelData.id,
        title: lessonData.title,
        emoji: lessonData.emoji,
        display_order: lessonData.display_order
      })

      if (lessonErr) { console.error('Error Lesson:', lessonErr); continue }

      // 2.5 Clear old slides & questions for this lesson to avoid duplicates
      await supabase.from('slides').delete().eq('lesson_id', lessonData.id)
      await supabase.from('questions').delete().eq('lesson_id', lessonData.id)

      // 3. Insert Slides
      if (lessonData.slides) {
        const slidesToInsert = lessonData.slides.map(s => ({
          lesson_id: lessonData.id,
          tag: s.tag,
          title: s.title,
          body: s.body,
          visual_emoji: s.visual_emoji,
          display_order: s.display_order
        }))
        const { error: slideErr } = await supabase.from('slides').insert(slidesToInsert)
        if (slideErr) console.error('Error Slides:', slideErr)
      }

      // 4. Insert Questions & Options
      if (lessonData.questions) {
        for (const qData of lessonData.questions) {
          const { data: qResult, error: qErr } = await supabase.from('questions').insert({
            lesson_id: lessonData.id,
            type: qData.type,
            tag: qData.tag,
            tag_color: qData.tag_color,
            xp: qData.xp,
            question: qData.question,
            explanation: qData.explanation,
            display_order: qData.display_order
          }).select()

          if (qErr) { console.error('Error Question:', qErr); continue }

          const questionId = qResult[0].id

          if (qData.options) {
            const optionsToInsert = qData.options.map(o => ({
              question_id: questionId,
              label: o.label,
              emoji: o.emoji,
              is_correct: o.is_correct
            }))
            const { error: optErr } = await supabase.from('options').insert(optionsToInsert)
            if (optErr) console.error('Error Options:', optErr)
          }

          if (qData.pairs) {
            const pairsToInsert = qData.pairs.map(p => ({
              question_id: questionId,
              term: p.term,
              definition: p.def
            }))
            const { error: pairErr } = await supabase.from('match_pairs').insert(pairsToInsert)
            if (pairErr) console.error('Error Pairs:', pairErr)
          }
        }
      }
    }
  }

  console.log('\n✅ Seeding selesai!')
}

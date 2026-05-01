import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8')

let SUPABASE_URL = ''
let SUPABASE_KEY = ''

envFile.split('\n').forEach(line => {
  if (line.startsWith('VITE_SUPABASE_URL=')) SUPABASE_URL = line.split('=')[1].trim()
  if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) SUPABASE_KEY = line.split('=')[1].trim()
})

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function test() {
  const { data, error } = await supabase.from('levels').select('*, lessons(*)')
  if (error) {
    console.error('Join error:', error)
  } else {
    console.log('Joined levels count:', data ? data.length : 0)
    if (data && data.length > 0) {
      console.log('Lessons in first level:', data[0].lessons ? data[0].lessons.length : 0)
    }
  }
}
test()

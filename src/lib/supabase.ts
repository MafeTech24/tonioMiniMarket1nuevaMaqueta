import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://psejoskxumywnfdbpoha.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZWpvc2t4dW15d25mZGJwb2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyODQ1MTEsImV4cCI6MjA5MTg2MDUxMX0.DywyHZ_thUr3gyR_F6C13nHbVlAnnZhFP3c60wKaYiw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

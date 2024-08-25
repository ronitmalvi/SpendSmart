import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://spdgcclmylqamjecuyrx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZGdjY2xteWxxYW1qZWN1eXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MTg0NTcsImV4cCI6MjAzOTk5NDQ1N30.9tln4V_goIGB4-JLQ0rxk9rFZPkstZJMfWq22Sb9wdY'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
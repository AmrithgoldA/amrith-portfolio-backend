const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Your Supabase URL and Anon key from the Supabase project settings
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;

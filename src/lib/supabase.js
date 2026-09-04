import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL_KEY = 'sahakar_supabase_url';
const SUPABASE_ANON_KEY = 'sahakar_supabase_anon_key';

// Default / fallback keys from environment if provided
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

function isValidSupabaseUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.includes('your-project-id') || !trimmed.startsWith('https://')) return false;
  return true;
}

function isValidAnonKey(key) {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (trimmed.includes('your-anon-public-key') || trimmed.length < 20) return false;
  return true;
}

export function getStoredSupabaseConfig() {
  const url = localStorage.getItem(SUPABASE_URL_KEY) || envUrl;
  const anonKey = localStorage.getItem(SUPABASE_ANON_KEY) || envAnonKey;
  return { url, anonKey };
}

export function saveSupabaseConfig(url, anonKey) {
  if (url) localStorage.setItem(SUPABASE_URL_KEY, url);
  else localStorage.removeItem(SUPABASE_URL_KEY);

  if (anonKey) localStorage.setItem(SUPABASE_ANON_KEY, anonKey);
  else localStorage.removeItem(SUPABASE_ANON_KEY);

  initSupabaseClient();
}

let supabaseInstance = null;

export function initSupabaseClient() {
  const { url, anonKey } = getStoredSupabaseConfig();
  if (isValidSupabaseUrl(url) && isValidAnonKey(anonKey)) {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      });
      return supabaseInstance;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      supabaseInstance = null;
      return null;
    }
  }
  supabaseInstance = null;
  return null;
}

export function getSupabase() {
  if (!supabaseInstance) {
    initSupabaseClient();
  }
  return supabaseInstance;
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getStoredSupabaseConfig();
  return isValidSupabaseUrl(url) && isValidAnonKey(anonKey);
}

/**
 * Initiates Google OAuth using Supabase Auth
 */
export async function signInWithGoogleSupabase({ role = 'Customer', redirectTo } = {}) {
  const client = getSupabase();
  
  // Store intended role before redirecting to Google
  localStorage.setItem('sahakar_intended_role', role);

  const redirectUrl = redirectTo || (window.location.origin + window.location.pathname + '#/auth/callback');

  if (!client) {
    console.info('Supabase live credentials pending. Proceeding with simulated verified Google authentication.');
    return { data: null, error: new Error('SUPABASE_NOT_CONFIGURED') };
  }

  try {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

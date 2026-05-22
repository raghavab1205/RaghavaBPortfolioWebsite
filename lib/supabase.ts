import { createClient } from '@supabase/supabase-js';

// Get environment variables whether in Vite browser env or Node.js server env
export const supabaseUrl = (typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_URL : (import.meta as any).env?.VITE_SUPABASE_URL) || '';
export const supabaseAnonKey = (typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_ANON_KEY : (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured');
}

// Only create a client if we have a URL, otherwise we might crash the process
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null as any;

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  ip_address?: string;
  user_agent?: string;
}

// Server-side Supabase client (should only be used in API routes)
export function getServerSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = supabaseUrl || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined');
  }
  
  if (!url) {
    throw new Error('Supabase URL is not defined');
  }

  return createClient(url, serviceRoleKey);
}

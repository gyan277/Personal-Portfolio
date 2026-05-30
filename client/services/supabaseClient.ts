import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Fallback to prevent crash when env vars are missing
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(url, key);

export type UserRole = 'citizen' | 'assembly' | 'minister';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  district: string;
  region: string;
  ghana_card_verified: boolean;
  avatar_url?: string;
  created_at: string;
}

export interface Policy {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  full_text: string;
  category: string;
  region: string;
  district?: string;
  status: 'draft' | 'active' | 'passed' | 'rejected';
  votes_for: number;
  votes_against: number;
  votes_abstain: number;
  created_by: string;
  created_at: string;
  expires_at?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  district?: string;
  region: string;
  is_national: boolean;
  likes: number;
  replies_count: number;
  created_at: string;
}

export interface Vote {
  id: string;
  policy_id: string;
  user_id: string;
  vote_type: 'for' | 'against' | 'abstain';
  created_at: string;
}

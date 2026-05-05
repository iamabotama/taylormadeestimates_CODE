import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkslnxjjezptyfbissah.supabase.co';
const supabaseKey = 'sb_publishable_ZWIvI52uxhnNocozVSFMYg_T9mHNSPv';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UploadRecord = {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  uploaded_at: string;
};

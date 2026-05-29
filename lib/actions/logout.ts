'use server';

import { supabase } from '@/lib/supabase/client';

export async function logout() {
  await supabase.auth.signOut();

  return {
    success: true,
  };
}
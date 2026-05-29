'use server';

import { supabase } from '@/lib/supabase/client';

export async function updateProfile(
  id: string,
  data: any,
) {
  const { error } =
    await supabase
      .from('profiles')
      .update(data)
      .eq('id', id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
  };
}
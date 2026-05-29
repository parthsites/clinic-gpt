'use server';

import { supabase } from '@/lib/supabase/client';

export async function updateDoctor(
  id: string,
  data: {
    name: string;
    specialty: string;
    experience: number;
    image_url: string;
  },
) {
  const { error } =
    await supabase
      .from('doctors')
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
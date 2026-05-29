'use server';

import { supabase } from '@/lib/supabase/client';

export async function createDoctor(
  name: string,
  specialty: string,
  experience: number,
  imageUrl: string,
  availableDays: string[],
  startTime: string,
  endTime: string,
) {
  try {
    const { error } =
      await supabase
        .from('doctors')
        .insert({
          name,
          specialty,
          experience,
          image_url: imageUrl,
          available_days: availableDays,
          start_time: startTime,
          end_time: endTime,
        });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        err?.message ||
        'Failed to create doctor',
    };
  }
}

export async function deleteDoctor(
  id: string,
) {
  try {
    const { error } =
      await supabase
        .from('doctors')
        .delete()
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
  } catch (err: any) {
    return {
      success: false,
      message:
        err?.message ||
        'Failed to delete doctor',
    };
  }
}
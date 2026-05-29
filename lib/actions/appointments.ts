'use server';

import { supabase } from '@/lib/supabase/client';

export async function updateAppointmentStatus(
  id: string,
  status: string,
) {
  const { error } =
    await supabase
      .from('appointments')
      .update({
        status,
      })
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

export async function cancelAppointment(
  id: string,
) {
  const { error } =
    await supabase
      .from('appointments')
      .update({
        status: 'Cancelled',
      })
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
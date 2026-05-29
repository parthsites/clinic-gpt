'use server';

import { supabase } from '@/lib/supabase/client';

export async function createMedicalRecord(
  patientId: string,
  doctorId: string,
  diagnosis: string,
  prescription: string,
  notes: string,
) {
  const { error } =
    await supabase
      .from('medical_records')
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        diagnosis,
        prescription,
        notes,
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
}

export async function updateMedicalRecord(
  id: string,
  diagnosis: string,
  prescription: string,
  notes: string,
) {
  const { error } =
    await supabase
      .from('medical_records')
      .update({
        diagnosis,
        prescription,
        notes,
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

export async function deleteMedicalRecord(
  id: string,
) {
  const { error } =
    await supabase
      .from('medical_records')
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
}
'use server';

import { supabase } from '@/lib/supabase/client';

export async function signUp(
  fullName: string,
  email: string,
  password: string,
) {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    user: data.user,
  };
}

export async function signIn(
  email: string,
  password: string,
) {
  try {
    console.log('Starting login...');

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log('Login response:', {
      data,
      error,
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
    console.error(err);

    return {
      success: false,
      message:
        err?.message ||
        'Unknown login error',
    };
  }
}
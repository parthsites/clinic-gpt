'use server';

import { createClient } from '@/lib/supabase/server';

export async function getCurrentUserRole() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log('USER:', user);
  console.log('USER ERROR:', userError);

  if (!user) {
    return null;
  }

  const { data: profile, error: profileError } =
    await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

  console.log('PROFILE:', profile);
  console.log('PROFILE ERROR:', profileError);

  return profile?.role || null;
}
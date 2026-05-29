'use client';

import { useRouter } from 'next/navigation';

import { supabase } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push('/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-2xl border border-red-500/20 px-5 py-4 text-red-400 transition hover:bg-red-500/10"
    >
      Logout
    </button>
  );
}
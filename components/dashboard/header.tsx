'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase/client';

export function DashboardHeader() {
  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const { data } =
        await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

      setProfile(data);
    }

    loadProfile();
  }, []);

  const today =
    new Date().toLocaleDateString(
      'en-US',
      {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      },
    );

  return (
    <div className="flex items-center justify-between rounded-[32px] border border-white/10 bg-white/5 p-8">
      <div>
        <p className="text-slate-400">
          Welcome Back
        </p>

        <h1 className="mt-2 text-5xl font-black text-white">
          {profile?.full_name ||
            'Patient'}
        </h1>

        <p className="mt-3 text-slate-400">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="font-bold text-cyan-400">
            MediCore Health
          </p>

          <p className="text-sm text-slate-400">
            Patient Portal
          </p>
        </div>

        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="h-16 w-16 rounded-full border-2 border-cyan-400 object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl font-black text-black">
            {profile?.full_name?.charAt(
              0,
            ) || 'P'}
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import {
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  LogOut,
  Shield,
} from 'lucide-react';

import { supabase } from '@/lib/supabase/client';

import LogoutButton from '@/components/dashboard/logout-button';

export function Sidebar() {
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

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-[#020617] p-6">
      <div>
        <h1 className="text-3xl font-black text-cyan-400">
          MediCore
        </h1>

        <p className="mt-2 text-slate-400">
          Patient Portal
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-xl font-black text-black">
            {profile?.full_name?.charAt(
              0,
            ) || 'P'}
          </div>
        )}

        <div>
          <h3 className="font-bold text-white">
            {profile?.full_name ||
              'Patient'}
          </h3>

          <p className="text-sm text-slate-400">
            {profile?.role === 'admin'
              ? 'Administrator'
              : 'Patient Account'}
          </p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 text-slate-300 transition hover:bg-white/10"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/dashboard/book"
          className="flex items-center gap-3 rounded-2xl px-5 py-4 text-slate-300 transition hover:bg-white/10"
        >
          <Calendar size={20} />
          Book Appointment
        </Link>

        <Link
          href="/dashboard/appointments"
          className="flex items-center gap-3 rounded-2xl px-5 py-4 text-slate-300 transition hover:bg-white/10"
        >
          <Calendar size={20} />
          My Appointments
        </Link>

        <Link
          href="/dashboard/records"
          className="flex items-center gap-3 rounded-2xl px-5 py-4 text-slate-300 transition hover:bg-white/10"
        >
          <FileText size={20} />
          Medical Records
        </Link>

        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-2xl px-5 py-4 text-slate-300 transition hover:bg-white/10"
        >
          <User size={20} />
          Profile
        </Link>

        {profile?.role === 'admin' && (
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 font-semibold text-cyan-400 transition hover:bg-cyan-400/20"
          >
            <Shield size={20} />
            Admin Dashboard
          </Link>
        )}
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}
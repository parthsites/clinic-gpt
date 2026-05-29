'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { supabase } from '@/lib/supabase/client';

export function QuickActions() {
  const [role, setRole] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadRole() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const { data } =
        await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

      setRole(data?.role || null);
    }

    loadRole();
  }, []);

  return (
    <div
      className={`mt-10 grid gap-6 ${
        role === 'admin'
          ? 'md:grid-cols-4'
          : 'md:grid-cols-3'
      }`}
    >
      <Link
        href="/dashboard/book"
        className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-white transition hover:border-cyan-400"
      >
        <h3 className="text-2xl font-black">
          Book Appointment
        </h3>

        <p className="mt-3 text-slate-400">
          Schedule a new consultation.
        </p>
      </Link>

      <Link
        href="/dashboard/appointments"
        className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-white transition hover:border-cyan-400"
      >
        <h3 className="text-2xl font-black">
          My Appointments
        </h3>

        <p className="mt-3 text-slate-400">
          View all appointments.
        </p>
      </Link>

      {role === 'admin' && (
        <Link
          href="/admin"
          className="rounded-[32px] border border-cyan-400 bg-cyan-400/10 p-8 text-white transition hover:bg-cyan-400/20"
        >
          <h3 className="text-2xl font-black">
            Admin Dashboard
          </h3>

          <p className="mt-3 text-slate-400">
            Manage doctors, patients and records.
          </p>
        </Link>
      )}

      <Link
        href="/"
        className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-white transition hover:border-cyan-400"
      >
        <h3 className="text-2xl font-black">
          Back To Website
        </h3>

        <p className="mt-3 text-slate-400">
          Return to landing page.
        </p>
      </Link>
    </div>
  );
}
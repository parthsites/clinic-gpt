import Link from 'next/link';

import { supabase } from '@/lib/supabase/client';

import { AppointmentCard } from '@/components/admin/appointment-card';
import AdminGuard from '@/components/admin/admin-guard';
import StatsChart from '@/components/admin/stats-chart';
import LogoutButton from '@/components/dashboard/logout-button';

export default async function AdminPage() {
  const { data: appointments, error } =
    await supabase
      .from('appointments')
      .select(`
        *,
        doctors (
          name,
          specialty
        )
      `)
      .order('created_at', {
        ascending: false,
      });

  const { data: doctors } =
    await supabase
      .from('doctors')
      .select('id');

  const { data: patients } =
    await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'patient');

  const pendingCount =
    appointments?.filter(
      (a) => a.status === 'Pending',
    ).length || 0;

  const completedCount =
    appointments?.filter(
      (a) => a.status === 'Completed',
    ).length || 0;

  const cancelledCount =
    appointments?.filter(
      (a) => a.status === 'Cancelled',
    ).length || 0;

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#020617] p-8 text-white">
        <div>
          <p className="font-semibold text-cyan-400">
            MediCore Health
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            Manage appointments, doctors, patients and records
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/admin/doctors"
              className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-[#020617]"
            >
              Manage Doctors
            </Link>

            <Link
              href="/admin/patients"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white"
            >
              Patients
            </Link>

            <Link
              href="/admin/records"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white"
            >
              Medical Records
            </Link>

            <Link
              href="/admin/calendar"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white"
            >
              Calendar
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white"
            >
              Patient Dashboard
            </Link>
          </div>

          <div className="mt-4 max-w-xs">
            <LogoutButton />
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Total Appointments
            </p>

            <h2 className="mt-4 text-5xl font-black text-cyan-400">
              {appointments?.length || 0}
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Active Doctors
            </p>

            <h2 className="mt-4 text-5xl font-black text-cyan-400">
              {doctors?.length || 0}
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Total Patients
            </p>

            <h2 className="mt-4 text-5xl font-black text-cyan-400">
              {patients?.length || 0}
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Pending
            </p>

            <h2 className="mt-4 text-5xl font-black text-yellow-400">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Completed
            </p>

            <h2 className="mt-4 text-5xl font-black text-green-400">
              {completedCount}
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Cancelled
            </p>

            <h2 className="mt-4 text-5xl font-black text-red-400">
              {cancelledCount}
            </h2>
          </div>
        </div>

        <div className="mt-10">
          <StatsChart
            pending={pendingCount}
            completed={completedCount}
            cancelled={cancelledCount}
          />
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-black">
            Appointment Management
          </h2>

          {error ? (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
              {error.message}
            </div>
          ) : appointments?.length ? (
            <div className="space-y-6">
              {appointments.map(
                (appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ),
              )}
            </div>
          ) : (
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
              <h3 className="text-2xl font-bold">
                No Appointments Found
              </h3>

              <p className="mt-3 text-slate-400">
                New patient bookings will appear here.
              </p>
            </div>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}
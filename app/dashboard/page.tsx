import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  return (
    <>
      <Sidebar />

      <main className="min-h-screen bg-[#020617] p-8 pl-72 text-white">
        <DashboardHeader />

        <StatsCards />

        <QuickActions />

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8">
          <h2 className="text-3xl font-black">
            Upcoming Appointments
          </h2>

          <div className="mt-6 rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold">
              Welcome to MediCore
            </h3>

            <p className="mt-2 text-slate-400">
              Your appointments and health records
              will appear here.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
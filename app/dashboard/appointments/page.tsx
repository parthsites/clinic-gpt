import { supabase } from '@/lib/supabase/client';

import { PageHeader } from '@/components/shared/page-header';
import { CancelAppointmentButton } from '@/components/dashboard/cancel-appointment-button';
import { RescheduleAppointmentButton } from '@/components/dashboard/reschedule-appointment-button';

export default async function AppointmentsPage() {
  const { data: appointments } =
    await supabase
      .from('appointments')
      .select(`
        *,
        doctors (
          name,
          specialty
        )
      `)
      .order(
        'appointment_date',
        {
          ascending: false,
        }
      );

  function getStatusColor(
    status: string,
  ) {
    switch (status) {
      case 'Confirmed':
        return 'bg-cyan-500/20 text-cyan-400';

      case 'Completed':
        return 'bg-green-500/20 text-green-400';

      case 'Cancelled':
        return 'bg-red-500/20 text-red-400';

      default:
        return 'bg-yellow-500/20 text-yellow-400';
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/dashboard"
        homeLabel="Patient Dashboard"
        title="My Appointments"
        breadcrumb="Patient Dashboard > My Appointments"
      />

      <div className="mt-10 space-y-6">
        {appointments?.map(
          (appointment) => (
            <div
              key={appointment.id}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black">
                    {appointment.doctors?.name}
                  </h3>

                  <p className="mt-2 text-cyan-400">
                    {appointment.doctors?.specialty}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${getStatusColor(
                    appointment.status ||
                      'Pending'
                  )}`}
                >
                  {appointment.status ||
                    'Pending'}
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-slate-400">
                  Date:{' '}
                  {appointment.appointment_date}
                </p>

                <p className="text-slate-400">
                  Time:{' '}
                  {appointment.appointment_time}
                </p>
              </div>

              {appointment.status !==
                'Cancelled' &&
                appointment.status !==
                  'Completed' && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <RescheduleAppointmentButton
                      id={appointment.id}
                    />

                    <CancelAppointmentButton
                      id={appointment.id}
                    />
                  </div>
                )}
            </div>
          )
        )}

        {!appointments?.length && (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            <h3 className="text-2xl font-bold">
              No Appointments
            </h3>

            <p className="mt-3 text-slate-400">
              Book your first appointment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
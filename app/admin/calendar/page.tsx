import { supabase } from '@/lib/supabase/client';

import { PageHeader } from '@/components/shared/page-header';

export default async function CalendarPage() {
  const { data: appointments } =
    await supabase
      .from('appointments')
      .select(`
        *,
        doctors (
          name
        )
      `)
      .order(
        'appointment_date',
        {
          ascending: true,
        },
      );

  const grouped =
    appointments?.reduce(
      (acc: any, appt: any) => {
        const date =
          appt.appointment_date;

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(appt);

        return acc;
      },
      {},
    ) || {};

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/admin"
        homeLabel="Admin Dashboard"
        title="Appointment Calendar"
        breadcrumb="Admin Dashboard > Calendar"
      />

      <div className="mt-10 space-y-8">
        {Object.entries(
          grouped,
        ).map(
          ([date, list]: any) => (
            <div
              key={date}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-3xl font-black text-cyan-400">
                {date}
              </h2>

              <div className="mt-6 space-y-3">
                {list.map(
                  (
                    appointment: any,
                  ) => (
                    <div
                      key={
                        appointment.id
                      }
                      className="rounded-2xl border border-white/10 p-4"
                    >
                      <p>
                        Time:{' '}
                        {
                          appointment.appointment_time
                        }
                      </p>

                      <p>
                        Doctor:{' '}
                        {
                          appointment
                            .doctors
                            ?.name
                        }
                      </p>

                      <p>
                        Status:{' '}
                        {
                          appointment.status
                        }
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          ),
        )}

        {!appointments?.length && (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            <h3 className="text-2xl font-bold">
              No Appointments Scheduled
            </h3>

            <p className="mt-3 text-slate-400">
              Upcoming appointments will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
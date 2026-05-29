'use client';

import Link from 'next/link';

import { updateAppointmentStatus } from '@/lib/actions/appointments';

export function AppointmentCard({
  appointment,
}: {
  appointment: any;
}) {
  async function handleStatus(
    status: string,
  ) {
    const result =
      await updateAppointmentStatus(
        appointment.id,
        status,
      );

    if (!result.success) {
      alert(result.message);
      return;
    }

    window.location.reload();
  }

  function getStatusColor() {
    switch (
      appointment.status
    ) {
      case 'Confirmed':
        return 'text-cyan-400';

      case 'Completed':
        return 'text-green-400';

      case 'Cancelled':
        return 'text-red-400';

      default:
        return 'text-yellow-400';
    }
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-black text-white">
            {
              appointment
                .doctors?.name
            }
          </h3>

          <p className="mt-2 text-cyan-400">
            {
              appointment
                .doctors
                ?.specialty
            }
          </p>
        </div>

        <span
          className={`font-bold ${getStatusColor()}`}
        >
          {appointment.status ||
            'Pending'}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-slate-400">
          Date:{' '}
          {
            appointment.appointment_date
          }
        </p>

        <p className="text-slate-400">
          Time:{' '}
          {
            appointment.appointment_time
          }
        </p>

        <p className="text-slate-400">
          Appointment ID:{' '}
          {appointment.id}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() =>
            handleStatus(
              'Confirmed',
            )
          }
          className="rounded-full bg-cyan-400 px-4 py-2 font-bold text-black"
        >
          Confirm
        </button>

        <button
          onClick={() =>
            handleStatus(
              'Completed',
            )
          }
          className="rounded-full bg-green-500 px-4 py-2 font-bold text-white"
        >
          Complete
        </button>

        <button
          onClick={() =>
            handleStatus(
              'Cancelled',
            )
          }
          className="rounded-full bg-red-500 px-4 py-2 font-bold text-white"
        >
          Cancel
        </button>

        <Link
          href={`/admin/records/new?appointmentId=${appointment.id}`}
          className="rounded-full bg-purple-500 px-4 py-2 font-bold text-white"
        >
          Create Record
        </Link>
      </div>
    </div>
  );
}
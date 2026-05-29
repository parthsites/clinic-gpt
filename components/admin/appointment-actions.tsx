'use client';

import { useRouter } from 'next/navigation';

import { updateAppointmentStatus } from '@/lib/actions/appointments';

export function AppointmentActions({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function updateStatus(
    status: string,
  ) {
    const result =
      await updateAppointmentStatus(
        id,
        status,
      );

    if (result.success) {
      router.refresh();
      return;
    }

    alert(result.message);
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button
        onClick={() =>
          updateStatus(
            'Confirmed',
          )
        }
        className="rounded-full bg-cyan-400 px-4 py-2 font-bold text-black"
      >
        Confirm
      </button>

      <button
        onClick={() =>
          updateStatus(
            'Completed',
          )
        }
        className="rounded-full bg-green-500 px-4 py-2 font-bold text-white"
      >
        Complete
      </button>

      <button
        onClick={() =>
          updateStatus(
            'Cancelled',
          )
        }
        className="rounded-full bg-red-500 px-4 py-2 font-bold text-white"
      >
        Cancel
      </button>
    </div>
  );
}
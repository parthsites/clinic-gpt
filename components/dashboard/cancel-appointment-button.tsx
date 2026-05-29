'use client';

import { useRouter } from 'next/navigation';

import { cancelAppointment } from '@/lib/actions/appointments';

export function CancelAppointmentButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleCancel() {
    const confirmed =
      window.confirm(
        'Cancel this appointment?'
      );

    if (!confirmed) return;

    const result =
      await cancelAppointment(id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleCancel}
      className="mt-4 rounded-full bg-red-500 px-4 py-2 font-bold text-white"
    >
      Cancel Appointment
    </button>
  );
}
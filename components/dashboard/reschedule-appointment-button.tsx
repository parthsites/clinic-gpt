'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

const slots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

export function RescheduleAppointmentButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [date, setDate] =
    useState('');

  const [time, setTime] =
    useState('');

  async function handleReschedule() {
    const { error } =
      await supabase
        .from('appointments')
        .update({
          appointment_date: date,
          appointment_time: time,
          status: 'Pending',
        })
        .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="mt-4 rounded-full bg-cyan-400 px-4 py-2 font-bold text-black"
      >
        Reschedule
      </button>

      {open && (
        <div className="mt-4 rounded-2xl border border-white/10 p-4">
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="mb-4 w-full rounded-xl bg-white/10 p-3"
          />

          <select
            value={time}
            onChange={(e) =>
              setTime(
                e.target.value
              )
            }
            className="w-full rounded-xl bg-white/10 p-3"
          >
            <option value="">
              Select Time
            </option>

            {slots.map(
              (slot) => (
                <option
                  key={slot}
                  value={slot}
                >
                  {slot}
                </option>
              )
            )}
          </select>

          <button
            onClick={
              handleReschedule
            }
            className="mt-4 rounded-full bg-green-500 px-4 py-2 font-bold text-white"
          >
            Save Changes
          </button>
        </div>
      )}
    </>
  );
}
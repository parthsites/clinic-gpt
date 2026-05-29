'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase/client';
import { DoctorCard } from '@/components/dashboard/doctor-card';
import { PageHeader } from '@/components/shared/page-header';

const slots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
];

export default function BookPage() {
  const [doctors, setDoctors] =
    useState<any[]>([]);

  const [selectedDoctor, setSelectedDoctor] =
    useState<any>(null);

  const [date, setDate] =
    useState('');

  const [time, setTime] =
    useState('');

  useEffect(() => {
    async function loadDoctors() {
      const { data } =
        await supabase
          .from('doctors')
          .select('*');

      setDoctors(data || []);
    }

    loadDoctors();
  }, []);

  async function bookAppointment() {
    const {
      data: { session },
    } =
      await supabase.auth.getSession();

    if (!session) {
      alert('Please login');
      return;
    }

    if (!selectedDoctor) {
      alert(
        'Please select a doctor',
      );
      return;
    }

    if (!date || !time) {
      alert(
        'Please select date and time',
      );
      return;
    }

    const selectedDay =
      new Date(date)
        .toLocaleDateString(
          'en-US',
          {
            weekday: 'long',
          },
        );

    if (
      !selectedDoctor.available_days?.includes(
        selectedDay,
      )
    ) {
      alert(
        `${selectedDoctor.name} is unavailable on ${selectedDay}`,
      );

      return;
    }

    const {
      data: existingAppointment,
    } =
      await supabase
        .from('appointments')
        .select('id')
        .eq(
          'doctor_id',
          selectedDoctor.id,
        )
        .eq(
          'appointment_date',
          date,
        )
        .eq(
          'appointment_time',
          time,
        )
        .neq(
          'status',
          'Cancelled',
        )
        .maybeSingle();

    if (
      existingAppointment
    ) {
      alert(
        'This slot is already booked. Choose another time.'
      );

      return;
    }

    const { error } =
      await supabase
        .from('appointments')
        .insert({
          patient_id:
            session.user.id,
          doctor_id:
            selectedDoctor.id,
          appointment_date:
            date,
          appointment_time:
            time,
          status: 'Pending',
        });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      'Appointment Booked Successfully'
    );

    setDate('');
    setTime('');
    setSelectedDoctor(null);
  }

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/dashboard"
        homeLabel="Patient Dashboard"
        title="Book Appointment"
        breadcrumb="Patient Dashboard > Book Appointment"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {doctors.map(
          (doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              selected={
                selectedDoctor?.id ===
                doctor.id
              }
              onSelect={() =>
                setSelectedDoctor(
                  doctor
                )
              }
            />
          )
        )}
      </div>

      <div className="mt-10">
        <label className="mb-3 block text-xl font-bold">
          Appointment Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        />
      </div>

      <div className="mt-10">
        <h2 className="mb-5 text-2xl font-black">
          Time Slots
        </h2>

        <div className="flex flex-wrap gap-4">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() =>
                setTime(slot)
              }
              className={`rounded-full px-5 py-3 font-bold ${
                time === slot
                  ? 'bg-cyan-400 text-black'
                  : 'border border-white/10 bg-white/5 text-white'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-8">
        <h2 className="text-3xl font-black">
          Appointment Summary
        </h2>

        <p className="mt-4 text-slate-400">
          Doctor:{' '}
          {selectedDoctor?.name ||
            'Not Selected'}
        </p>

        <p className="text-slate-400">
          Specialty:{' '}
          {selectedDoctor?.specialty ||
            'Not Selected'}
        </p>

        <p className="text-slate-400">
          Date:{' '}
          {date ||
            'Not Selected'}
        </p>

        <p className="text-slate-400">
          Time:{' '}
          {time ||
            'Not Selected'}
        </p>

        <button
          onClick={bookAppointment}
          className="mt-8 rounded-full bg-cyan-400 px-8 py-4 font-black text-black"
        >
          Confirm Booking
        </button>
      </div>
    </main>
  );
}
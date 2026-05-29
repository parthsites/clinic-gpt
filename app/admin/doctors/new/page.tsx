'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createDoctor } from '@/lib/actions/doctors';

import ImageUpload from '@/components/admin/image-upload';
import { PageHeader } from '@/components/shared/page-header';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function NewDoctorPage() {
  const router = useRouter();

  const [name, setName] =
    useState('');

  const [specialty, setSpecialty] =
    useState('');

  const [experience, setExperience] =
    useState('');

  const [imageUrl, setImageUrl] =
    useState('');

  const [availableDays, setAvailableDays] =
    useState<string[]>([]);

  const [startTime, setStartTime] =
    useState('09:00');

  const [endTime, setEndTime] =
    useState('17:00');

  const [loading, setLoading] =
    useState(false);

  function toggleDay(day: string) {
    if (
      availableDays.includes(day)
    ) {
      setAvailableDays(
        availableDays.filter(
          (d) => d !== day,
        ),
      );
    } else {
      setAvailableDays([
        ...availableDays,
        day,
      ]);
    }
  }

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    setLoading(true);

    const result =
      await createDoctor(
        name,
        specialty,
        Number(experience),
        imageUrl,
        availableDays,
        startTime,
        endTime,
      );

    if (result.success) {
      router.push(
        '/admin/doctors',
      );

      router.refresh();
      return;
    }

    alert(result.message);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/admin"
        homeLabel="Admin Dashboard"
        title="Add Doctor"
        breadcrumb="Admin Dashboard > Doctors > Add Doctor"
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-3xl space-y-6"
      >
        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value,
            )
          }
          placeholder="Doctor Name"
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <input
          value={specialty}
          onChange={(e) =>
            setSpecialty(
              e.target.value,
            )
          }
          placeholder="Specialty"
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <input
          type="number"
          value={experience}
          onChange={(e) =>
            setExperience(
              e.target.value,
            )
          }
          placeholder="Years of Experience"
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <ImageUpload
          onUpload={(url) =>
            setImageUrl(url)
          }
        />

        {imageUrl && (
          <div className="rounded-2xl border border-white/10 p-4">
            <img
              src={imageUrl}
              alt="Doctor Preview"
              className="h-40 w-40 rounded-2xl object-cover"
            />
          </div>
        )}

        <div>
          <h3 className="mb-4 text-xl font-bold">
            Available Days
          </h3>

          <div className="flex flex-wrap gap-3">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() =>
                  toggleDay(day)
                }
                className={`rounded-full px-4 py-2 font-bold ${
                  availableDays.includes(
                    day,
                  )
                    ? 'bg-cyan-400 text-black'
                    : 'border border-white/10 bg-white/5'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-bold">
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="rounded-full bg-cyan-400 px-8 py-4 font-black text-black"
        >
          {loading
            ? 'Adding Doctor...'
            : 'Add Doctor'}
        </button>
      </form>
    </main>
  );
}
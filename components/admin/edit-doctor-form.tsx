'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { updateDoctor } from '@/lib/actions/update-doctor';

export default function EditDoctorForm({
  doctor,
}: {
  doctor: any;
}) {
  const router = useRouter();

  const [name, setName] =
    useState(doctor.name || '');

  const [specialty, setSpecialty] =
    useState(
      doctor.specialty || '',
    );

  const [experience, setExperience] =
    useState(
      doctor.experience || 0,
    );

  const [imageUrl, setImageUrl] =
    useState(
      doctor.image_url || '',
    );

  const [loading, setLoading] =
    useState(false);

  async function handleSave() {
    setLoading(true);

    const result =
      await updateDoctor(
        doctor.id,
        {
          name,
          specialty,
          experience:
            Number(
              experience,
            ),
          image_url:
            imageUrl,
        },
      );

    if (!result.success) {
      alert(result.message);
      setLoading(false);
      return;
    }

    alert(
      'Doctor Updated Successfully',
    );

    router.push(
      '/admin/doctors',
    );

    router.refresh();
  }

  return (
    <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8">
      <div className="space-y-6">
        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value,
            )
          }
          placeholder="Doctor Name"
          className="w-full rounded-2xl bg-white/10 p-4"
        />

        <input
          value={specialty}
          onChange={(e) =>
            setSpecialty(
              e.target.value,
            )
          }
          placeholder="Specialty"
          className="w-full rounded-2xl bg-white/10 p-4"
        />

        <input
          type="number"
          value={experience}
          onChange={(e) =>
            setExperience(
              Number(
                e.target.value,
              ),
            )
          }
          placeholder="Experience"
          className="w-full rounded-2xl bg-white/10 p-4"
        />

        <input
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(
              e.target.value,
            )
          }
          placeholder="Image URL"
          className="w-full rounded-2xl bg-white/10 p-4"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-full bg-cyan-400 px-8 py-4 font-black text-black"
        >
          {loading
            ? 'Saving...'
            : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
'use client';

import { useRouter } from 'next/navigation';

import { deleteDoctor } from '@/lib/actions/doctors';

export function DeleteDoctorButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed =
      window.confirm(
        'Delete this doctor?',
      );

    if (!confirmed) return;

    const result =
      await deleteDoctor(id);

    if (result.success) {
      router.refresh();
      return;
    }

    alert(result.message);
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-full border border-red-500/20 px-4 py-2 text-sm font-bold text-red-400"
    >
      Delete
    </button>
  );
}
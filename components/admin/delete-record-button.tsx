'use client';

import { useRouter } from 'next/navigation';

import { deleteMedicalRecord } from '@/lib/actions/medical-records';

export default function DeleteRecordButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed =
      confirm(
        'Delete this medical record?',
      );

    if (!confirmed) return;

    const result =
      await deleteMedicalRecord(id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white"
    >
      Delete
    </button>
  );
}
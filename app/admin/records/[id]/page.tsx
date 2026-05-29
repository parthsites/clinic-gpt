'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { supabase } from '@/lib/supabase/client';
import { updateMedicalRecord } from '@/lib/actions/medical-records';

import { PageHeader } from '@/components/shared/page-header';

export default function EditRecordPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [diagnosis, setDiagnosis] =
    useState('');

  const [prescription, setPrescription] =
    useState('');

  const [notes, setNotes] =
    useState('');

  useEffect(() => {
    async function loadRecord() {
      const { data } =
        await supabase
          .from('medical_records')
          .select('*')
          .eq('id', params.id)
          .single();

      if (!data) {
        setLoading(false);
        return;
      }

      setDiagnosis(
        data.diagnosis || '',
      );

      setPrescription(
        data.prescription || '',
      );

      setNotes(
        data.notes || '',
      );

      setLoading(false);
    }

    loadRecord();
  }, [params.id]);

  async function handleSave(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    setSaving(true);

    const result =
      await updateMedicalRecord(
        String(params.id),
        diagnosis,
        prescription,
        notes,
      );

    if (!result.success) {
      alert(result.message);
      setSaving(false);
      return;
    }

    alert(
      'Medical Record Updated',
    );

    router.push(
      '/admin/records',
    );

    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] p-8 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/admin/records"
        homeLabel="Medical Records"
        title="Edit Medical Record"
        breadcrumb="Admin Dashboard > Medical Records > Edit Record"
      />

      <form
        onSubmit={handleSave}
        className="mt-10 max-w-4xl space-y-6"
      >
        <textarea
          rows={4}
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) =>
            setDiagnosis(
              e.target.value,
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <textarea
          rows={4}
          placeholder="Prescription"
          value={prescription}
          onChange={(e) =>
            setPrescription(
              e.target.value,
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <textarea
          rows={5}
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value,
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <button
          disabled={saving}
          className="rounded-full bg-cyan-400 px-8 py-4 font-black text-black"
        >
          {saving
            ? 'Saving...'
            : 'Update Record'}
        </button>
      </form>
    </main>
  );
}
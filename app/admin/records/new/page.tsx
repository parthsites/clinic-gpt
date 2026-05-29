'use client';

import { useState } from 'react';

import { createMedicalRecord } from '@/lib/actions/medical-records';

import { PageHeader } from '@/components/shared/page-header';

export default function NewRecordPage() {
  const [patientId, setPatientId] =
    useState('');

  const [doctorId, setDoctorId] =
    useState('');

  const [diagnosis, setDiagnosis] =
    useState('');

  const [prescription, setPrescription] =
    useState('');

  const [notes, setNotes] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    setLoading(true);

    const result =
      await createMedicalRecord(
        patientId,
        doctorId,
        diagnosis,
        prescription,
        notes,
      );

    if (!result.success) {
      alert(result.message);
      setLoading(false);
      return;
    }

    alert(
      'Medical Record Created Successfully',
    );

    setPatientId('');
    setDoctorId('');
    setDiagnosis('');
    setPrescription('');
    setNotes('');

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/admin/records"
        homeLabel="Medical Records"
        title="Create Medical Record"
        breadcrumb="Admin Dashboard > Medical Records > New Record"
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-4xl space-y-6"
      >
        <input
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) =>
            setPatientId(
              e.target.value,
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <input
          placeholder="Doctor ID"
          value={doctorId}
          onChange={(e) =>
            setDoctorId(
              e.target.value,
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

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
          placeholder="Doctor Notes"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value,
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
        />

        <button
          disabled={loading}
          className="rounded-full bg-cyan-400 px-8 py-4 font-black text-black"
        >
          {loading
            ? 'Saving...'
            : 'Save Medical Record'}
        </button>
      </form>
    </main>
  );
}
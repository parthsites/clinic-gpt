'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase/client';
import { PageHeader } from '@/components/shared/page-header';

export default function RecordsPage() {
  const [loading, setLoading] =
    useState(true);

  const [records, setRecords] =
    useState<any[]>([]);

  useEffect(() => {
    async function loadRecords() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } =
        await supabase
          .from('medical_records')
          .select('*')
          .eq(
            'patient_id',
            user.id,
          )
          .order(
            'created_at',
            {
              ascending: false,
            },
          );

      setRecords(data || []);
      setLoading(false);
    }

    loadRecords();
  }, []);

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
        homeHref="/dashboard"
        homeLabel="Patient Dashboard"
        title="Medical Records"
        breadcrumb="Patient Dashboard > Medical Records"
      />

      <div className="mt-10 space-y-6">
        {records.map((record) => (
          <div
            key={record.id}
            className="rounded-[32px] border border-white/10 bg-white/5 p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Medical Record
              </h2>

              <span className="rounded-full bg-cyan-400/20 px-4 py-2 text-sm font-bold text-cyan-400">
                {new Date(
                  record.created_at,
                ).toLocaleDateString()}
              </span>
            </div>

            <h3 className="text-xl font-bold">
              Diagnosis
            </h3>

            <p className="mt-3 text-slate-300">
              {record.diagnosis ||
                'Not Provided'}
            </p>

            <h3 className="mt-6 text-xl font-bold">
              Prescription
            </h3>

            <p className="mt-3 text-slate-300">
              {record.prescription ||
                'Not Provided'}
            </p>

            <h3 className="mt-6 text-xl font-bold">
              Notes
            </h3>

            <p className="mt-3 text-slate-300">
              {record.notes ||
                'Not Provided'}
            </p>
          </div>
        ))}

        {!records.length && (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            <h3 className="text-2xl font-bold">
              No Medical Records Found
            </h3>

            <p className="mt-3 text-slate-400">
              Your medical records will appear here after appointments.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
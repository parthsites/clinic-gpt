import Link from 'next/link';

import { supabase } from '@/lib/supabase/client';

import { PageHeader } from '@/components/shared/page-header';
import DeleteRecordButton from '@/components/admin/delete-record-button';

export default async function RecordsPage() {
  const { data: records, error } =
    await supabase
      .from('medical_records')
      .select('*')
      .order('created_at', {
        ascending: false,
      });

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <div className="flex items-start justify-between">
        <PageHeader
          homeHref="/admin"
          homeLabel="Admin Dashboard"
          title="Medical Records"
          breadcrumb="Admin Dashboard > Medical Records"
        />

        <Link
          href="/admin/records/new"
          className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-black"
        >
          New Record
        </Link>
      </div>

      {error ? (
        <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
          {error.message}
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {records?.map(
            (record: any) => (
              <div
                key={record.id}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">
                    Medical Record
                  </h2>

                  <span className="rounded-full bg-cyan-400/20 px-4 py-2 text-sm font-bold text-cyan-400">
                    {new Date(
                      record.created_at,
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      Patient ID
                    </p>

                    <p className="font-medium break-all">
                      {record.patient_id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Doctor ID
                    </p>

                    <p className="font-medium break-all">
                      {record.doctor_id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Diagnosis
                    </p>

                    <p>
                      {record.diagnosis ||
                        'Not Provided'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Prescription
                    </p>

                    <p>
                      {record.prescription ||
                        'Not Provided'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Notes
                    </p>

                    <p>
                      {record.notes ||
                        'Not Provided'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/admin/records/${record.id}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold"
                  >
                    Edit
                  </Link>

                  <DeleteRecordButton
                    id={record.id}
                  />
                </div>
              </div>
            ),
          )}

          {!records?.length && (
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
              <h3 className="text-2xl font-bold">
                No Medical Records Found
              </h3>

              <p className="mt-3 text-slate-400">
                Create your first medical record to get started.
              </p>

              <Link
                href="/admin/records/new"
                className="mt-6 inline-block rounded-full bg-cyan-400 px-6 py-3 font-bold text-black"
              >
                Create Record
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
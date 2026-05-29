'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export default function PatientSearch({
  patients,
}: {
  patients: any[];
}) {
  const [search, setSearch] =
    useState('');

  const filteredPatients =
    useMemo(() => {
      return patients.filter(
        (patient) =>
          patient.full_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase(),
            ) ||
          patient.email
            ?.toLowerCase()
            .includes(
              search.toLowerCase(),
            ) ||
          patient.phone
            ?.toLowerCase()
            .includes(
              search.toLowerCase(),
            ),
      );
    }, [search, patients]);

  return (
    <>
      <input
        type="text"
        placeholder="Search patients..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value,
          )
        }
        className="mb-8 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white"
      />

      <div className="space-y-4">
        {filteredPatients.map(
          (patient) => (
            <div
              key={patient.id}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6"
            >
              <Link
                href={`/admin/patients/${patient.id}`}
                className="text-2xl font-black text-cyan-400 hover:underline"
              >
                {patient.full_name ||
                  'Unnamed Patient'}
              </Link>

              <p className="mt-2 text-slate-400">
                {patient.email}
              </p>

              <p className="mt-2 text-slate-400">
                {patient.phone ||
                  'No Phone'}
              </p>

              <div className="mt-4">
                <Link
                  href={`/admin/patients/${patient.id}`}
                  className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-black"
                >
                  View Details
                </Link>
              </div>
            </div>
          ),
        )}

        {!filteredPatients.length && (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            No matching patients found
          </div>
        )}
      </div>
    </>
  );
}
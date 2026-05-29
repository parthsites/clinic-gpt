import Link from 'next/link';

import { supabase } from '@/lib/supabase/client';

import { DeleteDoctorButton } from '@/components/admin/delete-doctor-button';
import { PageHeader } from '@/components/shared/page-header';

export default async function DoctorsAdminPage() {
  const { data: doctors, error } =
    await supabase
      .from('doctors')
      .select('*')
      .order('name');

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <div className="flex items-start justify-between">
        <PageHeader
          homeHref="/admin"
          homeLabel="Admin Dashboard"
          title="Doctors Management"
          breadcrumb="Admin Dashboard > Doctors"
        />

        <Link
          href="/admin/doctors/new"
          className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-[#020617]"
        >
          Add Doctor
        </Link>
      </div>

      {error ? (
        <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
          {error.message}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors?.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400"
            >
              <div className="flex items-center gap-4">
                {doctor.image_url ? (
                  <img
                    src={doctor.image_url}
                    alt={doctor.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl font-black text-black">
                    {doctor.name?.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black">
                    {doctor.name}
                  </h3>

                  <p className="text-cyan-400">
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-slate-400">
                  Experience:
                  <span className="ml-2 text-white">
                    {doctor.experience || 0} Years
                  </span>
                </p>

                <p className="text-slate-400">
                  Available:
                  <span className="ml-2 text-white">
                    {doctor.available_days?.join(', ') ||
                      'Not Set'}
                  </span>
                </p>

                <p className="text-slate-400">
                  Hours:
                  <span className="ml-2 text-white">
                    {doctor.start_time || '--:--'}
                    {' - '}
                    {doctor.end_time || '--:--'}
                  </span>
                </p>

                <p className="text-slate-400">
                  Status:
                  <span className="ml-2 text-green-400">
                    Active
                  </span>
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/admin/doctors/${doctor.id}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold"
                >
                  Edit
                </Link>

                <DeleteDoctorButton
                  id={doctor.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {!doctors?.length &&
        !error && (
          <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            <h3 className="text-2xl font-bold">
              No Doctors Found
            </h3>

            <p className="mt-3 text-slate-400">
              Add your first doctor to get started.
            </p>
          </div>
        )}
    </main>
  );
}
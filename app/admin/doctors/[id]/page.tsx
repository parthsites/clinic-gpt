import { supabase } from '@/lib/supabase/client';

import EditDoctorForm from '@/components/admin/edit-doctor-form';
import { PageHeader } from '@/components/shared/page-header';

export default async function EditDoctorPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const {
    data: doctor,
    error,
  } =
    await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single();

  if (error || !doctor) {
    return (
      <main className="min-h-screen bg-[#020617] p-8 text-white">
        <PageHeader
          homeHref="/admin/doctors"
          homeLabel="Doctors"
          title="Doctor Not Found"
          breadcrumb="Admin Dashboard > Doctors > Error"
        />

        <div className="mt-8 rounded-[32px] border border-red-500/20 bg-red-500/10 p-8">
          <h2 className="text-3xl font-black text-red-400">
            Doctor Not Found
          </h2>

          <p className="mt-3">
            {error?.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/admin/doctors"
        homeLabel="Doctors"
        title="Edit Doctor"
        breadcrumb="Admin Dashboard > Doctors > Edit Doctor"
      />

      <EditDoctorForm
        doctor={doctor}
      />
    </main>
  );
}
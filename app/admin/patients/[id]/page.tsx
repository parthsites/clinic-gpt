import { supabase } from '@/lib/supabase/client';

import { PageHeader } from '@/components/shared/page-header';

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const {
    data: patient,
    error,
  } =
    await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

  if (error || !patient) {
    return (
      <main className="min-h-screen bg-[#020617] p-8 text-white">
        <PageHeader
          homeHref="/admin/patients"
          homeLabel="Patients"
          title="Patient Not Found"
          breadcrumb="Admin Dashboard > Patients > Error"
        />

        <div className="mt-8 rounded-[32px] border border-red-500/20 bg-red-500/10 p-8">
          <h2 className="text-3xl font-black text-red-400">
            Patient Not Found
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
        homeHref="/admin/patients"
        homeLabel="Patients"
        title={
          patient.full_name ||
          'Patient Details'
        }
        breadcrumb="Admin Dashboard > Patients > Details"
      />

      <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-400">
              Full Name
            </p>

            <p className="text-xl font-bold">
              {patient.full_name ||
                'Not Provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Email
            </p>

            <p>
              {patient.email ||
                'Not Provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Phone
            </p>

            <p>
              {patient.phone ||
                'Not Provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Age
            </p>

            <p>
              {patient.age ||
                'Not Provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Blood Group
            </p>

            <p>
              {patient.blood_group ||
                'Not Provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Emergency Contact
            </p>

            <p>
              {patient.emergency_contact ||
                'Not Provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Address
            </p>

            <p>
              {patient.address ||
                'Not Provided'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
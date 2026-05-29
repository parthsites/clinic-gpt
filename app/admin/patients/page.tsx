import { supabase } from '@/lib/supabase/client';

import PatientSearch from '@/components/admin/patient-search';
import { PageHeader } from '@/components/shared/page-header';

export default async function PatientsPage() {
  const { data: patients } =
    await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'patient')
      .order('created_at', {
        ascending: false,
      });

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/admin"
        homeLabel="Admin Dashboard"
        title="Patients"
        breadcrumb="Admin Dashboard > Patients"
      />

      <div className="mt-10">
        <PatientSearch
          patients={patients || []}
        />
      </div>
    </main>
  );
}
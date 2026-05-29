import { supabase } from '@/lib/supabase/client';

export default async function TestDBPage() {
  const { data, error } = await supabase
    .from('doctors')
    .select('*');

  if (error) {
    return (
      <div className="p-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="mb-10 text-4xl font-bold">
        Doctors
      </h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
export function StatsCards() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
        <p className="text-slate-400">Appointments</p>
        <h2 className="mt-4 text-5xl font-black text-cyan-400">
          12
        </h2>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
        <p className="text-slate-400">Doctors</p>
        <h2 className="mt-4 text-5xl font-black text-cyan-400">
          50+
        </h2>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
        <p className="text-slate-400">Health Score</p>
        <h2 className="mt-4 text-5xl font-black text-cyan-400">
          98%
        </h2>
      </div>
    </div>
  );
}
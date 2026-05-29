'use client';

export function DoctorCard({
  doctor,
  selected,
  onSelect,
}: {
  doctor: any;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`rounded-[32px] border p-6 text-left transition ${
        selected
          ? 'border-cyan-400 bg-cyan-400/10'
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-black text-white">
            {doctor.name}
          </h3>

          <p className="mt-2 text-cyan-400">
            {doctor.specialty}
          </p>
        </div>

        {selected && (
          <div className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-black text-black">
            Selected
          </div>
        )}
      </div>

      <p className="mt-3 text-slate-400">
        {doctor.experience} Years Experience
      </p>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-sm font-bold text-white">
          Available Days
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {doctor.available_days?.length ? (
            doctor.available_days.map(
              (day: string) => (
                <span
                  key={day}
                  className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400"
                >
                  {day.slice(0, 3)}
                </span>
              )
            )
          ) : (
            <span className="text-xs text-slate-500">
              Not Set
            </span>
          )}
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Working Hours
        </p>

        <p className="font-bold text-white">
          {doctor.start_time || '--:--'}
          {'  '}
          to
          {'  '}
          {doctor.end_time || '--:--'}
        </p>
      </div>
    </button>
  );
}
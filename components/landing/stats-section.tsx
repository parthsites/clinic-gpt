import {
  Users,
  Calendar,
  Award,
  Activity,
} from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '12,000+',
    label: 'Patients Served',
  },
  {
    icon: Calendar,
    value: '35,000+',
    label: 'Appointments Completed',
  },
  {
    icon: Award,
    value: '50+',
    label: 'Medical Specialists',
  },
  {
    icon: Activity,
    value: '99%',
    label: 'Patient Satisfaction',
  },
];

export function StatsSection() {
  return (
    <section className="bg-[#020617] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <item.icon className="h-10 w-10 text-cyan-400" />

              <h3 className="mt-6 text-5xl font-black text-white">
                {item.value}
              </h3>

              <p className="mt-3 text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
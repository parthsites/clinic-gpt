'use client';

import {
  HeartPulse,
  Brain,
  Stethoscope,
} from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiology',
    experience: '12 Years',
    icon: HeartPulse,
  },

  {
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    experience: '10 Years',
    icon: Brain,
  },

  {
    name: 'Dr. Emily Carter',
    specialty: 'General Medicine',
    experience: '8 Years',
    icon: Stethoscope,
  },
];

export function DoctorsSection() {
  return (
    <section
      id="doctors"
      className="bg-[#020617] px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
            OUR SPECIALISTS
          </p>

          <h2 className="mt-6 text-5xl font-black text-white md:text-7xl">
            Meet Our
            <span className="block text-cyan-400">
              Medical Experts
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-400">
            Experienced specialists dedicated to delivering
            exceptional healthcare.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:-translate-y-2"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-cyan-400">
                <doctor.icon
                  size={42}
                  className="text-[#020617]"
                />
              </div>

              <h3 className="mt-8 text-3xl font-black text-white">
                {doctor.name}
              </h3>

              <p className="mt-3 text-cyan-400">
                {doctor.specialty}
              </p>

              <p className="mt-4 text-slate-400">
                {doctor.experience} Experience
              </p>

              <button className="mt-8 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-6 py-3 font-bold text-cyan-400">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
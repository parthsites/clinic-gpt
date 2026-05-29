'use client';

import { motion } from 'framer-motion';

import {
  ShieldCheck,
  Clock3,
  Users,
  HeartHandshake,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Trusted Medical Expertise',
    description:
      'Highly qualified specialists delivering evidence-based treatment with years of experience.',
  },

  {
    icon: Clock3,
    title: 'Quick Appointments',
    description:
      'Book appointments online in minutes and reduce waiting times significantly.',
  },

  {
    icon: Users,
    title: 'Multi-Speciality Care',
    description:
      'Access a wide network of specialists across multiple medical disciplines.',
  },

  {
    icon: HeartHandshake,
    title: 'Patient-Centered Approach',
    description:
      'Every treatment plan is tailored to the unique needs and wellbeing of each patient.',
  },
];

export function WhyUsSection() {
  return (
    <section className="relative bg-[#020617] px-6 py-32 overflow-hidden">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
              WHY CHOOSE US
            </p>

            <h2 className="mt-6 text-5xl font-black tracking-[-0.06em] text-white md:text-7xl">
              Healthcare Built
              <span className="block text-cyan-400">
                Around Patients
              </span>
            </h2>

            <p className="mt-8 text-xl leading-relaxed text-slate-400">
              Combining world-class medical expertise, advanced healthcare
              technology, and compassionate care to deliver an exceptional
              patient experience.
            </p>

            <div className="mt-12 flex gap-10">
              <div>
                <h3 className="text-5xl font-black text-cyan-400">
                  15+
                </h3>

                <p className="mt-2 text-slate-400">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-cyan-400">
                  24/7
                </h3>

                <p className="mt-2 text-slate-400">
                  Patient Support
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400">
                    <feature.icon
                      size={30}
                      className="text-[#020617]"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-lg leading-relaxed text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
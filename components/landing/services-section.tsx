'use client';

import { motion } from 'framer-motion';

import {
  HeartPulse,
  Brain,
  Stethoscope,
  Bone,
  Baby,
  ShieldPlus,
} from 'lucide-react';

const services = [
  {
    title: 'Cardiology',
    description:
      'Advanced heart care with modern diagnostics, preventive screening, and specialist consultations.',

    icon: HeartPulse,
  },

  {
    title: 'Neurology',
    description:
      'Comprehensive neurological care for brain, spine, and nervous system conditions.',

    icon: Brain,
  },

  {
    title: 'General Medicine',
    description:
      'Expert primary healthcare, health checkups, disease prevention, and ongoing treatment.',

    icon: Stethoscope,
  },

  {
    title: 'Orthopedics',
    description:
      'Specialized bone, joint, ligament, and musculoskeletal treatments for all ages.',

    icon: Bone,
  },

  {
    title: 'Pediatrics',
    description:
      'Dedicated child healthcare focused on growth, wellness, and preventive care.',

    icon: Baby,
  },

  {
    title: 'Preventive Care',
    description:
      'Routine screenings and proactive healthcare programs designed for long-term wellbeing.',

    icon: ShieldPlus,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#020617] px-6 py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
            SERVICES
          </p>

          <h2 className="mt-6 text-5xl font-black tracking-[-0.06em] text-white md:text-7xl">
            Comprehensive
            <span className="block text-cyan-400">
              Medical Excellence
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-400">
            Delivering world-class healthcare through advanced medical expertise,
            modern technology, and patient-centered care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/10"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-400">
                <service.icon
                  size={38}
                  className="text-[#020617]"
                />
              </div>

              <h3 className="mt-8 text-3xl font-black text-white">
                {service.title}
              </h3>

              <p className="mt-5 text-lg leading-relaxed text-slate-400">
                {service.description}
              </p>

              <button className="mt-8 font-bold text-cyan-400 transition group-hover:translate-x-2">
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
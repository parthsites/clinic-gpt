'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Calendar, HeartPulse } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617]">
      {/* Glow Effects */}
      <div className="absolute left-20 top-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute right-20 top-64 h-96 w-96 rounded-full bg-blue-500/20 blur-[150px]" />

      <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300">
              <Shield size={16} />
              Trusted Multi-Speciality Healthcare
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-6xl font-black leading-none tracking-[-0.08em] text-white md:text-8xl">
              Healthcare
              <br />
              Reimagined
              <br />
              For The
              <span className="block text-cyan-400">
                Digital Age
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-300">
              Experience premium healthcare with expert doctors,
              seamless online appointments, digital medical records,
              and world-class patient care — all in one platform.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/signup"
                className="group flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-5 text-lg font-black text-[#020617] transition hover:scale-105"
              >
                Book Appointment

                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-5 text-lg font-bold text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                Patient Login
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap gap-10">
              <div>
                <h3 className="text-5xl font-black text-cyan-400">
                  12K+
                </h3>

                <p className="mt-2 text-slate-400">
                  Happy Patients
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-cyan-400">
                  50+
                </h3>

                <p className="mt-2 text-slate-400">
                  Specialists
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-cyan-400">
                  99%
                </h3>

                <p className="mt-2 text-slate-400">
                  Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
            }}
            className="relative"
          >
            {/* Main Card */}
            <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <div className="overflow-hidden rounded-[30px]">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop"
                  alt="Doctor"
                  className="h-[600px] w-full object-cover"
                />
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute -left-10 top-20 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <Calendar className="text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">
                    Appointments
                  </p>

                  <h4 className="text-xl font-black">
                    1,250+
                  </h4>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -bottom-8 right-0 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <HeartPulse className="text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">
                    Care Rating
                  </p>

                  <h4 className="text-xl font-black">
                    4.9 / 5
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
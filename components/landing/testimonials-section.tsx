'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'Outstanding healthcare service with exceptional doctors and seamless booking.',
  },
  {
    name: 'Michael Chen',
    text: 'The online experience was smooth and professional from start to finish.',
  },
  {
    name: 'Emma Williams',
    text: 'One of the most modern and patient-focused healthcare platforms I have used.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#020617] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
            TESTIMONIALS
          </p>

          <h2 className="mt-6 text-5xl font-black text-white md:text-7xl">
            Trusted By
            <span className="block text-cyan-400">
              Thousands Of Patients
            </span>
          </h2>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-cyan-400 text-cyan-400"
                  />
                ))}
              </div>

              <p className="mt-8 text-lg leading-relaxed text-slate-300">
                "{item.text}"
              </p>

              <h3 className="mt-8 text-xl font-black text-white">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
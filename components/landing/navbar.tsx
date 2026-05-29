'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-8 py-4 backdrop-blur-2xl">
        <Link
          href="/"
          className="text-2xl font-black text-cyan-400"
        >
          MediCore
        </Link>

        <nav className="hidden gap-8 md:flex">
          <a
            href="#services"
            className="text-slate-300 hover:text-white"
          >
            Services
          </a>

          <a
            href="#doctors"
            className="text-slate-300 hover:text-white"
          >
            Doctors
          </a>

          <a
            href="#testimonials"
            className="text-slate-300 hover:text-white"
          >
            Reviews
          </a>
        </nav>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-slate-300"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-cyan-400 px-5 py-2 font-bold text-[#020617]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
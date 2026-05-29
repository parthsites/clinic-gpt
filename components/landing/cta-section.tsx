import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="bg-[#020617] px-6 py-32">
      <div className="mx-auto max-w-6xl rounded-[48px] border border-white/10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-16 text-center backdrop-blur-2xl">
        <h2 className="text-5xl font-black text-white md:text-7xl">
          Ready To Take
          <span className="block text-cyan-400">
            Control Of Your Health?
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-300">
          Schedule appointments, connect with specialists,
          and experience healthcare redesigned for the future.
        </p>

        <Link
          href="/signup"
          className="mt-12 inline-block rounded-full bg-cyan-400 px-10 py-5 text-xl font-black text-[#020617]"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
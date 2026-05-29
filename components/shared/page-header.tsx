import Link from 'next/link';

export function PageHeader({
  homeHref,
  homeLabel,
  title,
  breadcrumb,
}: {
  homeHref: string;
  homeLabel: string;
  title: string;
  breadcrumb: string;
}) {
  return (
    <div className="mb-8">
      <Link
        href={homeHref}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-300 transition hover:bg-white/10"
      >
        ← {homeLabel}
      </Link>

      <p className="mt-5 text-sm text-slate-500">
        {breadcrumb}
      </p>

      <h1 className="mt-2 text-5xl font-black text-white">
        {title}
      </h1>
    </div>
  );
}
interface ProgressCardProps {
  current: number;

  total: number;
}

export default function ProgressCard({ current, total }: ProgressCardProps) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <section
      aria-label="Quest Progress"
      className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lg shadow-cyan-950/10 backdrop-blur-md"
    >
      <header className="flex items-center justify-between gap-3">
        <section>
          <p className="text-xs font-black uppercase tracking-widest text-cyan-700">
            Quest Progress
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950">
            {current} / {total}
          </h2>
        </section>

        <p className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-800">
          Stage {current}
        </p>
      </header>

      <section
        aria-hidden="true"
        className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 shadow-inner"
      >
        <section
          className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </section>

      <progress value={current} max={total} className="sr-only" />
    </section>
  );
}

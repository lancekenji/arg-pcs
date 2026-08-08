interface ProgressCardProps {
  current: number;
  total: number;
}

export default function ProgressCard({ current, total }: ProgressCardProps) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <section
      aria-label="Quest Progress"
      className="rounded-xl border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md"
    >
      <header className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-cyan-700 m-0">
          Quest Progress
        </h2>
        <p className="m-0 text-xs font-black text-slate-500">
          Stage {current} of {total}
        </p>
      </header>

      <nav
        aria-label="Progress Steps"
        className="flex items-center justify-center gap-2"
      >
        {steps.map((step, index) => {
          const isDone = step < current;
          const isActive = step === current;

          return (
            <span key={step} className="flex items-center gap-2">
              <span
                className={`h-7 w-7 rounded-full inline-flex items-center justify-center text-xs font-black transition-all ${
                  isDone
                    ? "bg-cyan-600 text-white shadow-sm"
                    : isActive
                      ? "bg-cyan-100 text-cyan-800 border-2 border-cyan-600 shadow-sm"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {isDone ? "✓" : step}
              </span>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`w-8 h-1 rounded-full inline-block transition-all ${
                    step < current ? "bg-cyan-600" : "bg-slate-200"
                  }`}
                />
              )}
            </span>
          );
        })}
      </nav>
    </section>
  );
}

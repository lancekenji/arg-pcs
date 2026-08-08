import type { ReactNode } from "react";
import {
  Binary,
  Network,
  Workflow,
  Command,
  Code,
  Terminal,
  Cpu,
  Shield,
  Database,
  CpuIcon,
  Braces,
} from "lucide-react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export default function AnimatedBackground({
  children,
  className = "",
}: AnimatedBackgroundProps) {
  return (
    <main
      className={`min-h-dvh w-full overflow-x-hidden bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient text-slate-950 relative box-border ${className}`}
    >
      {/* Floating & Corner-Traveling Tech Icons Animation Layer */}
      <aside
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 box-border"
      >
        <span className="absolute animate-[travelTopLeft_12s_ease-in-out_infinite] text-white">
          <Binary className="w-10 h-10" />
        </span>
        <span className="absolute animate-[travelTopRight_15s_ease-in-out_infinite] text-white">
          <Network className="w-12 h-12" />
        </span>
        <span className="absolute animate-[travelBottomLeft_14s_ease-in-out_infinite] text-white">
          <Workflow className="w-10 h-10" />
        </span>
        <span className="absolute animate-[travelBottomRight_16s_ease-in-out_infinite] text-white">
          <Command className="w-12 h-12" />
        </span>
        <span className="absolute top-[15%] left-[20%] animate-bounce duration-1000 text-white">
          <Code className="w-10 h-10" />
        </span>
        <span className="absolute top-[25%] right-[22%] animate-pulse text-white">
          <Terminal className="w-14 h-14" />
        </span>
        <span className="absolute bottom-[20%] left-[30%] animate-bounce text-white duration-700">
          <Cpu className="w-16 h-16" />
        </span>
        <span className="absolute bottom-[25%] right-[18%] animate-pulse text-white">
          <Shield className="w-12 h-12" />
        </span>
        <span className="absolute top-[45%] left-[8%] animate-bounce text-white duration-1000">
          <Database className="w-10 h-10" />
        </span>
        <span className="absolute top-[55%] right-[10%] animate-pulse text-white">
          <CpuIcon className="w-14 h-14" />
        </span>
        <span className="absolute top-[80%] left-[45%] animate-bounce text-white duration-900">
          <Braces className="w-10 h-10" />
        </span>
      </aside>

      {children}
    </main>
  );
}

export function AnimatedResourceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatedBackground>
      <section className="min-h-dvh w-full flex items-center justify-center box-border overflow-x-hidden">
        {children}
      </section>
    </AnimatedBackground>
  );
}

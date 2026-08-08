import { createFileRoute } from "@tanstack/react-router";
import { useSessionStore } from "../stores/session.store";
import { Award, Check, Sparkles } from "lucide-react";
import { requirePhase } from "../lib/router-guard";

export const Route = createFileRoute("/completed")({
  beforeLoad() {
    requirePhase("completed");
  },

  component: CompletedPage,
});

function CompletedPage() {
  const session = useSessionStore((state) => state.session);
  return (
    <main className="relative min-h-dvh overflow-hidden bg-linear-to-br from-cyan-50 via-white to-blue-50 px-4 py-8 text-slate-950">
      {" "}
      {/* Ambient background */}{" "}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {" "}
        <section className="absolute -left-24 top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />{" "}
        <section className="absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />{" "}
        <Sparkles className="absolute left-[12%] top-[16%] h-5 w-5 animate-pulse text-cyan-400/70" />{" "}
        <Sparkles className="absolute right-[15%] top-[28%] h-4 w-4 animate-pulse text-blue-400/70 [animation-delay:400ms]" />{" "}
        <Sparkles className="absolute left-[20%] bottom-[25%] h-4 w-4 animate-pulse text-cyan-500/60 [animation-delay:800ms]" />{" "}
        <Sparkles className="absolute right-[20%] bottom-[18%] h-5 w-5 animate-pulse text-blue-500/60 [animation-delay:1200ms]" />{" "}
      </aside>{" "}
      <section className="relative mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-md items-center justify-center">
        {" "}
        <article className="relative w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-cyan-950/15 backdrop-blur-xl">
          {" "}
          {/* Top celebration glow */}{" "}
          <aside
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl"
          />{" "}
          {/* Trophy */}{" "}
          <header className="relative flex flex-col items-center text-center">
            {" "}
            <section className="relative">
              {" "}
              <section className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20" />{" "}
              <figure className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-linear-to-br from-cyan-400 to-blue-600 shadow-xl shadow-cyan-900/20">
                {" "}
                <img src="/pcs-logo.png" className="h-full w-full" />{" "}
              </figure>{" "}
              <Sparkles className="absolute -right-3 -top-2 h-6 w-6 animate-bounce text-cyan-500" />{" "}
              <Sparkles className="absolute -bottom-1 -left-4 h-5 w-5 animate-pulse text-blue-500" />{" "}
            </section>{" "}
            <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-cyan-700">
              {" "}
              Expedition Complete{" "}
            </p>{" "}
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              {" "}
              Quest Complete!{" "}
            </h1>{" "}
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {" "}
              You made it through the entire journey.{" "}
            </p>{" "}
          </header>{" "}
          {/* Player */}{" "}
          <section className="mt-7 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-center">
            {" "}
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
              {" "}
              Explorer{" "}
            </p>{" "}
            <p className="mt-1 text-lg font-black text-slate-900">
              {" "}
              {session?.name ?? "Explorer"}{" "}
            </p>{" "}
          </section>{" "}
          {/* Completion badge */}{" "}
          <section className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            {" "}
            <figure className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-900/15">
              {" "}
              <Award className="h-5 w-5 text-white" />{" "}
            </figure>{" "}
            <section>
              {" "}
              <p className="text-sm font-black text-slate-900">
                {" "}
                Morning Walk Explorer{" "}
              </p>{" "}
              <p className="mt-0.5 text-xs leading-5 text-slate-600">
                {" "}
                You successfully completed all three quests.{" "}
              </p>{" "}
            </section>{" "}
            <Check className="ml-auto h-5 w-5 shrink-0 text-emerald-500" />{" "}
          </section>{" "}
          {/* Booth instruction */}{" "}
          <section className="mt-5 rounded-2xl border-2 border-dashed border-cyan-300 bg-white p-5 text-center shadow-sm">
            {" "}
            <p className="text-xs font-black uppercase tracking-widest text-cyan-700">
              {" "}
              Final Step{" "}
            </p>{" "}
            <h2 className="mt-2 text-xl font-black text-slate-950">
              {" "}
              Return to the Booth{" "}
            </h2>{" "}
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {" "}
              Show this completion screen to our team and receive your
              stamp.{" "}
            </p>{" "}
          </section>{" "}
          {/* Footer */}{" "}
          <footer className="mt-6 border-t border-slate-200/70 pt-4 text-center">
            {" "}
            <p className="text-xs font-medium text-slate-500">
              {" "}
              Thank you for joining the Morning Walk Quest.{" "}
            </p>{" "}
            <p className="pixel-text mt-3 text-sm font-black uppercase tracking-wider text-slate-950 animate-slide-reveal whitespace-nowrap">
              CCT &#8212; Pixel & Code Society
            </p>
          </footer>{" "}
        </article>{" "}
      </section>{" "}
    </main>
  );
}

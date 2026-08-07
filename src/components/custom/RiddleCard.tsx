import type { Quest } from "../../types/story";

interface Props {
  quest: Quest;
  storyTitle: string;
}

export default function RiddleCard({ quest, storyTitle }: Props) {
  return (
    <article className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-cyan-950/10 backdrop-blur-md">
      <header>
        <p className="text-xs font-black uppercase tracking-widest text-cyan-700">
          {storyTitle}
        </p>

        <h2 className="mt-2 text-lg font-black tracking-tight text-slate-950">
          Current Riddle
        </h2>
      </header>

      <section className="mt-5">
        <p className="text-2xl font-bold leading-9 text-slate-800">
          {quest.riddle}
        </p>
      </section>
    </article>
  );
}

import { useState, type FormEvent } from "react";

interface AnswerInputProps {
  answer: string;
  onSubmit(answer: string): void;
  disabled?: boolean;
}

export default function AnswerInput({
  answer,
  onSubmit,
  disabled = false,
}: AnswerInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim()) {
      return;
    }

    onSubmit(value);

    setValue("");
  }

  return (
    <article className="animate-in fade-in-0 slide-in-from-bottom-3 rounded-3xl border border-cyan-200 bg-white p-6 shadow-xl shadow-cyan-950/10 space-y-6">
      <header>
        <h2 className="text-xs font-black uppercase tracking-widest text-cyan-700">
          Discovered Answer
        </h2>
        <p className="mt-3 rounded-2xl bg-cyan-50 px-4 py-3 text-3xl font-black text-cyan-700 ring-1 ring-cyan-100">
          {answer}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset disabled={disabled} className="space-y-4 border-0 p-0 m-0">
          <legend className="text-sm font-semibold text-slate-700">
            Enter the discovered answer
          </legend>

          <input
            aria-label="Discovered answer"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Type answer here"
            className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-black font-semibold outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            className="min-h-12 w-full rounded-2xl bg-cyan-600 px-5 py-3 font-black text-white shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:translate-y-0 cursor-pointer"
          >
            Submit Answer
          </button>
        </fieldset>
      </form>
    </article>
  );
}

import { type FormEvent, useState } from "react";

interface Props {
  answer: string;

  onSubmit: (value: string) => void;
}

export default function AnswerModal({
  answer,

  onSubmit,
}: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit(value);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-100">
        <h2 className="text-xl font-bold">Hidden Clue</h2>

        <p className="mt-4 text-3xl font-bold text-cyan-600">{answer}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type the answer"
            className="w-full border rounded-lg px-4 py-3"
          />

          <button className="w-full bg-cyan-600 text-white rounded-lg py-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

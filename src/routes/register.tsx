import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { User, BookOpen } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useSessionStore } from "../stores/session.store";
import { requireRegistration } from "../lib/router-guard";

export const Route = createFileRoute("/register")({
  beforeLoad() {
    requireRegistration();
  },

  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  const startSession = useSessionStore((state) => state.startSession);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    startSession(name, course);

    navigate({
      to: "/quest",
    });
  };

  return (
    <main className="min-h-screen w-screen bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient flex items-center justify-center p-4 relative">
      <article className="w-full max-w-md bg-white/90 backdrop-blur-md px-8 pt-12 pb-8 rounded-2xl shadow-2xl border border-white/50 relative mt-10">
        <figure className="absolute -top-12 left-1/2 transform -translate-x-1/2 m-0">
          <span className="w-20 h-20 bg-white rounded-full shadow-lg border-4 border-white items-center justify-center overflow-hidden inline-flex">
            <img
              src="/pcs-logo.png"
              alt="PCS Logo"
              className="w-14 h-14 object-contain"
            />
          </span>
        </figure>

        <header className="mt-4 mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Register
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your details to proceed with the quest
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="border-0 p-0 m-0 space-y-4">
            <section>
              <label
                htmlFor="name-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1"
              >
                Name
              </label>
              <span className="relative flex items-center">
                <span className="absolute left-3 text-slate-400 pointer-events-none inline-flex items-center">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white text-slate-800 placeholder-slate-400 text-sm transition-all"
                />
              </span>
            </section>

            <section>
              <label
                htmlFor="course-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1"
              >
                Course
              </label>
              <span className="relative flex items-center">
                <span className="absolute left-3 text-slate-400 pointer-events-none inline-flex items-center">
                  <BookOpen className="w-4 h-4" />
                </span>
                <input
                  id="course-input"
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="Enter your course / program"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white text-slate-800 placeholder-slate-400 text-sm transition-all"
                />
              </span>
            </section>

            <nav className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Start Journey
              </button>
            </nav>
          </fieldset>
        </form>

        <footer className="mt-5 text-center text-xs leading-5 text-slate-500">
          Find a QR marker after each riddle. Every marker reveals a clue for
          your current quest.
        </footer>
      </article>
    </main>
  );
}

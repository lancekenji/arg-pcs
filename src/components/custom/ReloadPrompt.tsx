import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw, X } from "lucide-react";

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      console.log("Service worker registered:", swUrl);

      if (registration) {
        setInterval(
          () => {
            registration.update();
          },
          60 * 60 * 1000,
        );
      }
    },

    onRegisterError(error) {
      console.error("Service worker registration error:", error);
    },
  });

  if (!needRefresh && !offlineReady) {
    return null;
  }

  function close() {
    // We only need to hide the notification.
    // The service worker will remain available.
    window.location.reload();
  }

  async function update() {
    await updateServiceWorker(true);
  }

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[9999] mx-auto max-w-md"
    >
      <article className="rounded-3xl border border-cyan-200 bg-white p-4 shadow-2xl shadow-cyan-950/20">
        {needRefresh ? (
          <header className="flex items-start gap-3">
            <figure className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <RefreshCw className="h-5 w-5" />
            </figure>

            <section className="min-w-0 flex-1">
              <h2 className="text-sm font-black text-slate-950">
                New version available
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                A newer version of the quest is ready. Update before continuing.
              </p>
            </section>

            <button
              type="button"
              onClick={close}
              aria-label="Dismiss update notification"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </header>
        ) : (
          <header>
            <h2 className="text-sm font-black text-slate-950">
              App ready for offline use
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              The quest has been cached and is ready to run offline.
            </p>
          </header>
        )}

        {needRefresh && (
          <nav className="mt-4">
            <button
              type="button"
              onClick={update}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-700 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              Update App
            </button>
          </nav>
        )}
      </article>
    </aside>
  );
}

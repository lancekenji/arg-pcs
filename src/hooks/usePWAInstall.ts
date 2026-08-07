import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;

  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();

      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => {
      setInstalled(true);
    };

    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);

      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  async function install() {
    if (!deferredPrompt) {
      return false;
    }

    await deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    setDeferredPrompt(null);

    return result.outcome === "accepted";
  }

  return {
    canInstall: Boolean(deferredPrompt),

    install,

    installed,
  };
}

export function isStandalone() {
  if (typeof window === "undefined") {
    return false;
  }

  const navigatorWithStandalone = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

export function isIOS() {
  if (typeof window === "undefined") {
    return false;
  }

  const navigatorWithStandalone = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
    (navigatorWithStandalone.standalone === true &&
      window.navigator.maxTouchPoints > 1 &&
      /Macintosh/.test(window.navigator.userAgent))
  );
}

export type MobileBrowser =
  | "safari"
  | "chrome"
  | "edge"
  | "firefox"
  | "samsung"
  | "other";

export function getMobileBrowser(): MobileBrowser {
  if (typeof window === "undefined") {
    return "other";
  }

  const userAgent = window.navigator.userAgent;

  if (/FxiOS|Firefox/i.test(userAgent)) return "firefox";
  if (/EdgiOS|EdgA|Edg\//i.test(userAgent)) return "edge";
  if (/SamsungBrowser/i.test(userAgent)) return "samsung";
  if (/CriOS|Chrome|Chromium/i.test(userAgent)) return "chrome";
  if (/Safari/i.test(userAgent)) return "safari";

  return "other";
}

export function isMobileDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent) ||
    window.navigator.maxTouchPoints > 1
  );
}

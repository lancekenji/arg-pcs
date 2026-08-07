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

export function isMobileDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent) ||
    window.navigator.maxTouchPoints > 1
  );
}

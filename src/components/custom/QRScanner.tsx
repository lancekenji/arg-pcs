import {
  Scanner,
  type IScannerError,
  type IScannerHandle,
} from "@yudiel/react-qr-scanner";

import { useCallback, useEffect, useRef } from "react";

interface QRScannerProps {
  onScan(value: string): void;
  onError(error: IScannerError): void;
  onReady(): void;
  paused?: boolean;
}

export default function QRScanner({
  onScan,
  onError,
  onReady,
  paused = false,
}: QRScannerProps) {
  const locked = useRef(false);
  const scannerRef = useRef<IScannerHandle>(null);
  const lastScan = useRef<{
    value: string;
    at: number;
  } | null>(null);
  const stopActiveStream = useCallback(() => {
    const stream = scannerRef.current?.getStream();

    if (!stream) {
      return;
    }

    stream.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    const readyTimer = window.setTimeout(onReady, 1000);

    return () => {
      window.clearTimeout(readyTimer);
      stopActiveStream();
    };
  }, [onReady, stopActiveStream]);

  return (
    <Scanner
      ref={scannerRef}
      constraints={{
        facingMode: "environment",
      }}
      paused={paused}
      scanDelay={900}
      allowMultiple={false}
      onError={onError}
      onScan={(codes) => {
        const result = codes[0]?.rawValue.trim();

        if (!result) {
          return;
        }

        const now = Date.now();
        const isRapidDuplicate =
          lastScan.current?.value === result &&
          now - lastScan.current.at < 1200;

        if (locked.current || isRapidDuplicate) {
          return;
        }

        locked.current = true;
        lastScan.current = {
          value: result,
          at: now,
        };

        onScan(result);

        window.setTimeout(() => {
          locked.current = false;
        }, 1200);
      }}
      styles={{
        container: {
          width: "100%",
          height: "100%",
          borderRadius: "1.5rem",
          overflow: "hidden",
        },
        video: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      }}
    />
  );
}

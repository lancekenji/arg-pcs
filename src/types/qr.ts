export interface QRPayload {
  game: string;
  marker: string;
}

export type QRScanResult =
  | {
      success: true;
      markerId: string;
    }
  | {
      success: false;
      reason: "invalid" | "already-used" | "no-session" | "not-quest";
    };

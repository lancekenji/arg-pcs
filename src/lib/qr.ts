import { qrMarkers, QR_GAME_CODE } from "@/data/qrs";

import type { QRPayload, QRScanResult } from "@/types/qr";

export function parseQR(value: string): QRPayload | null {
  try {
    const payload = JSON.parse(value);

    if (
      typeof payload.game !== "string" ||
      typeof payload.marker !== "string"
    ) {
      return null;
    }

    return {
      game: payload.game.trim(),

      marker: payload.marker.trim(),
    };
  } catch {
    return null;
  }
}

export function validateQR(value: string): QRScanResult {
  const payload = parseQR(value);

  if (!payload) {
    return {
      success: false,
      reason: "invalid",
    };
  }

  if (payload.game !== QR_GAME_CODE) {
    return {
      success: false,
      reason: "invalid",
    };
  }

  const exists = qrMarkers.some((marker) => marker.id === payload.marker);

  if (!exists) {
    return {
      success: false,
      reason: "invalid",
    };
  }

  return {
    success: true,
    markerId: payload.marker,
  };
}

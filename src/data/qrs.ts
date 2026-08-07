export interface QRMarker {
  id: string;
  label: string;
}

export const qrMarkers = [
  {
    id: "K7F9X2",
    label: "Marker 1",
  },

  {
    id: "P4M8ZT",
    label: "Marker 2",
  },

  {
    id: "V9Q3LK",
    label: "Marker 3",
  },

  {
    id: "H6R2WD",
    label: "Marker 4",
  },

  {
    id: "N8C5YA",
    label: "Marker 5",
  },
] as const;

export const QR_GAME_CODE = "MWQ";

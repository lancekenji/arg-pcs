import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

import { qrMarkers, QR_GAME_CODE } from "../src/data/qrs";

const outputDirectory = path.resolve("public/qrs");

await fs.mkdir(outputDirectory, {
  recursive: true,
});

for (const [index, marker] of qrMarkers.entries()) {
  const payload = JSON.stringify({
    game: QR_GAME_CODE,
    marker: marker.id,
  });

  const outputFile = path.join(outputDirectory, `marker-${index + 1}.png`);

  await QRCode.toFile(outputFile, payload, {
    width: 600,
    margin: 2,
    errorCorrectionLevel: "H",
  });

  console.log(`Generated ${outputFile}`);
}

console.log("Finished generating QR codes.");

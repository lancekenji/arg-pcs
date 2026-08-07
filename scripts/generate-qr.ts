import QRCode from "qrcode";
import fs from "fs/promises";

const codes = [
  "ARG-QR-001",
  "ARG-QR-002",
  "ARG-QR-003",
  "ARG-QR-004",
  "ARG-QR-005",
];

async function generate() {
  await fs.mkdir("./public/qrs", {
    recursive: true,
  });

  for (const code of codes) {
    await QRCode.toFile(`./public/qrs/${code}.png`, code, {
      width: 600,
      margin: 4,
    });
  }
}

generate();

import jsQR from "jsqr";
import { PNG } from "pngjs";

/** Reads the text encoded in a QR code PNG, or null if no code can be found in it. */
export function decodeQrFromPng(image: Buffer): string | null {
  const png = PNG.sync.read(image);
  const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  return decoded?.data ?? null;
}

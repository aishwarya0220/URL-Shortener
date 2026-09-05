const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function encoded(bytes: Buffer): string{
    let result = "";

  for (const byte of bytes) {
    if (byte >= 248) continue; // Avoid modulo bias

    result += alphabet[byte % 62];
  }

  return result;
}
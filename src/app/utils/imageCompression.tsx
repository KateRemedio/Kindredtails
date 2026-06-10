const TARGET_BYTES = 50 * 1024; // 50KB target

export async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      canvas.width = 150;
      canvas.height = 150;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));

      // Center-crop to square
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 150, 150);

      // Reduce quality until under target size (~1.37x base64 overhead)
      let quality = 0.85;
      let dataUrl = canvas.toDataURL("image/webp", quality);
      const targetB64 = TARGET_BYTES * 1.4;

      while (dataUrl.length > targetB64 && quality > 0.1) {
        quality = parseFloat((quality - 0.1).toFixed(1));
        dataUrl = canvas.toDataURL("image/webp", quality);
      }

      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image. HEIC may not be supported in your browser."));
    };

    img.src = objectUrl;
  });
}

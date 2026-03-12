const imageModules = import.meta.glob("../assets/MosqueImage/**/*.{jpg,jpeg,png,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function getImgSrc(file: string) {
  // If you store full public paths like "/MosqueImage/xxx.jpg"
  if (file.startsWith("/")) return file;

  const normalized = file.replace(/^\.?\//, "");
  const match = Object.keys(imageModules).find((key) =>
    key.endsWith(`/MosqueImage/${normalized}`),
  );

  if (match) return imageModules[match];

  // Fallback for any edge cases
  return new URL(`../assets/MosqueImage/${file}`, import.meta.url).href;
}

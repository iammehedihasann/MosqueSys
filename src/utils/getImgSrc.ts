export function getImgSrc(file: string) {
  // If you store full public paths like "/MosqueImage/xxx.jpg"
  if (file.startsWith("/")) return file;

  // Supports filenames or subpaths like "programs/program_1.jpg"
  return new URL(`../assets/MosqueImage/${file}`, import.meta.url).href;
}

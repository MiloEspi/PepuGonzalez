import fs from "node:fs";
import path from "node:path";

export interface PublicAssetSlot {
  src: string;
  filename: string;
  exists: boolean;
}

/**
 * Chequea si un archivo ya fue subido a /public (server-side, en build/request).
 * Se usa para las imágenes que Pepu sube directo por GitHub Desktop en vez de
 * por Sanity — mientras el archivo no exista, la UI muestra un placeholder
 * con el nombre exacto que espera.
 */
export function publicAssetSlot(relativePath: string): PublicAssetSlot {
  const absolute = path.join(process.cwd(), "public", relativePath);
  return {
    src: `/${relativePath}`,
    filename: relativePath.split("/").pop() ?? relativePath,
    exists: fs.existsSync(absolute),
  };
}

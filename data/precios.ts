export const PRECIOS = {
  recetario: 9999,
  rutina: 19999,
  pack: 24999,
};

export function formatPrecio(valor: number): string {
  return `$${valor.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}

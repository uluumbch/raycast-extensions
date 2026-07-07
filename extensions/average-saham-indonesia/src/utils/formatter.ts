/**
 * Formats a whole number using Indonesian thousands separators.
 * Example: 240455 -> "240.455"
 */
const groupThousands = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
}).format;

/**
 * Formats a value as Rupiah currency, rounded to the nearest whole number.
 * Example: 240455 -> "Rp240.455"
 */
export function formatCurrency(value: number): string {
  return `Rp${groupThousands(Math.round(value))}`;
}

/**
 * Formats a share price as Rupiah with up to 2 decimal places.
 *
 * Note: thousands are grouped with "." (Indonesian style), and the decimal
 * point is intentionally also kept as "." (instead of the locale's ",") to
 * match how the price should read, e.g. "Rp96.18".
 * Examples: 96.18 -> "Rp96.18", 100 -> "Rp100"
 */
export function formatPrice(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  const integerPart = groupThousands(Math.trunc(rounded));

  if (Number.isInteger(rounded)) {
    return `Rp${integerPart}`;
  }

  const decimalPart = Math.round(Math.abs(rounded - Math.trunc(rounded)) * 100)
    .toString()
    .padStart(2, "0");

  return `Rp${integerPart}.${decimalPart}`;
}

/**
 * Formats a lot amount, e.g. 25 -> "25 Lot"
 */
export function formatLot(value: number): string {
  return `${groupThousands(Math.round(value))} Lot`;
}

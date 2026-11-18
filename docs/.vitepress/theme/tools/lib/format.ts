const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** 19285 -> "19,285". Rounds to whole numbers unless you ask for decimals. */
export function formatNumber(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return '-';
  if (!fractionDigits) return integer.format(value);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
}

/** 6 -> "+6", -2 -> "-2", 0 -> "0". For stat modifiers. */
export function formatSigned(value: number): string {
  return value > 0 ? `+${formatNumber(value)}` : formatNumber(value);
}

/** 1 -> "1 diamond", 19285 -> "19,285 diamonds". */
export function formatCount(value: number, singular: string, plural = `${singular}s`): string {
  return `${formatNumber(value)} ${value === 1 ? singular : plural}`;
}

/** [1, 5] -> "1-5", [10001, Infinity] -> "10,001+", [0, 0] -> "0". */
export function formatRange(min: number, max: number): string {
  if (max === Infinity) return `${formatNumber(min)}+`;
  if (min === max) return formatNumber(min);
  return `${formatNumber(min)}-${formatNumber(max)}`;
}

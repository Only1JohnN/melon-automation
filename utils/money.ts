/** "₦5,000.00" / "+2,500.00" / "₦2,433,500" -> 5000 / 2500 / 2433500 */
export function parseNaira(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, "");
  return Number(cleaned);
}

/** 5000 -> "₦5,000.00" (how the UI renders amounts) */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

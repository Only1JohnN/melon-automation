/**
 * Melon Coins rules. 100 coins = ₦1 is the documented rule; the 0.5% rate and the
 * ₦500 cap are what the product currently does (observed from real payments:
 * ₦5,000 -> ₦25, ₦25,000 -> ₦125, ₦2,400,000 -> ₦500). Update here if pricing changes.
 */
export const COINS_PER_NAIRA = 100;
export const REWARD_RATE = 0.005;
export const MAX_REWARD_NAIRA = 500;

export function expectedRewardNaira(paymentAmount: number): number {
  return Math.min(paymentAmount * REWARD_RATE, MAX_REWARD_NAIRA);
}

export function expectedCoins(paymentAmount: number): number {
  return Math.round(expectedRewardNaira(paymentAmount) * COINS_PER_NAIRA);
}

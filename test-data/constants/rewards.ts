/**
 * Melon Coins rules. 100 coins = ₦1 is the documented rule; the 0.5% rate and the
 * ₦500 cap are what the product currently does (observed from real payments:
 * ₦5,000 -> ₦25, ₦25,000 -> ₦125, ₦2,400,000 -> ₦500). Update here if pricing changes.
 */
export const COINS_PER_NAIRA = 100;
export const REWARD_RATE = 0.005;
export const MAX_REWARD_NAIRA = 500;

/** The reward before any rounding, e.g. 61.725 for ₦12,345. */
function exactRewardNaira(paymentAmount: number): number {
  return Math.min(paymentAmount * REWARD_RATE, MAX_REWARD_NAIRA);
}

/** The reward to the nearest kobo (a float like 9.450000000000001 is really 9.45). */
export function expectedRewardNaira(paymentAmount: number): number {
  return Math.round(exactRewardNaira(paymentAmount) * 100 + 1e-6) / 100;
}

export function expectedCoins(paymentAmount: number): number {
  return Math.round(expectedRewardNaira(paymentAmount) * COINS_PER_NAIRA);
}

/**
 * True when the exact reward is a whole number of coins plus half a coin (odd amounts, e.g. ₦12,345 -> 6,172.5 coins).
 * The product rounds those two ways at once (the reward in naira up, the coins down), so the rule can't be asserted
 * to the coin there; it is written down for a decision instead.
 */
export function rewardIsHalfCoin(paymentAmount: number): boolean {
  const coins = exactRewardNaira(paymentAmount) * COINS_PER_NAIRA;
  return Math.abs((coins % 1) - 0.5) < 1e-6;
}

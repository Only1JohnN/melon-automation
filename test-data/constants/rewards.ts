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

/**
 * Observed: for some whole-coin rewards the product credits one coin too few (₦1,740 -> reward ₦8.70, 869 coins instead
 * of 870). That is what rounding DOWN a floating-point product gives: 8.7 * 100 = 869.9999999999999. This predicts
 * which amounts are hit (about 7% of ₦1,000-₦9,990). It is a model of the symptom, not the product's code; the
 * pending "coins credited equal 100 x the reward" test tracks the bug itself.
 */
export function losesACoinToFloatRounding(paymentAmount: number): boolean {
  const reward = Math.round(Math.min(paymentAmount * REWARD_RATE, MAX_REWARD_NAIRA) * 100) / 100;
  return Math.floor(reward * COINS_PER_NAIRA) !== Math.round(reward * COINS_PER_NAIRA);
}

/** A random amount (a multiple of `step`) that isn't one of the amounts hit by the coin-loss bug above. */
export function randomAmountWithoutCoinLoss(min: number, max: number, step = 10): number {
  const steps = Math.floor((max - min) / step) + 1;

  for (;;) {
    const amount = min + Math.floor(Math.random() * steps) * step;
    if (!losesACoinToFloatRounding(amount)) return amount;
  }
}

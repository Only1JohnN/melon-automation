/**
 * The QA merchant's business details as they are meant to be. The business settings tests edit these and restore
 * them afterwards; restoring to this fixed baseline (and healing the account first) means a run that was cut off
 * halfway can't leave a test value behind for the next run to mistake for the original.
 */
export const QA_BUSINESS_BASELINE = {
  phone_number: "+2348123456789",
  business_email: "melonqabot-1785749135479@yopmail.com",
  industry: "manufacturing",
} as const;

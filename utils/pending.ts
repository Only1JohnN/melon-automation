/**
 * Details for a test that is written but waiting on the product (a bug to fix or a feature to finish).
 * The reason travels with the result, so the report and the results dashboard show WHY the test is skipped:
 * say what was observed, what was expected, and what has to change before the test can be switched on.
 *
 *   test.fixme("should do X", pending("Observed A; expected B."), async ({ page }) => { ... });
 */
export const pending = (reason: string) => ({
  annotation: { type: "pending", description: reason },
});

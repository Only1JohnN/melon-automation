/**
 * The applications the results dashboard reports on. A test belongs to an application when it is
 * tagged with the name (e.g. `@partners`).
 */
export const APPLICATIONS = ["partners", "storefront"] as const;

/**
 * Switched off until the app is built. To bring it back, move it into APPLICATIONS above (and
 * re-enable its section in config/applications.ts in the automation project).
 *
 *   admin - the admin panel isn't done yet, so it has no tests to report.
 */
export const DISABLED_APPLICATIONS = ["admin"] as const;

export function isEnabledApplication(name: string) {
  return (APPLICATIONS as readonly string[]).includes(name);
}

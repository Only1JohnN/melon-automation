import type { Layout } from "../utils/responsive";

/**
 * Layout problems the developers know about (or that were found and are waiting to be fixed). The responsive audit
 * records these as annotations instead of failing, so anything NEW still fails the run. When one is fixed, delete
 * its line: the audit then holds the fix in place.
 *
 * `match` is tested against "<kind>: <detail>" exactly as the audit prints it.
 */
export interface KnownLayoutIssue {
  app: "partners" | "storefront";
  match: RegExp;
  /** Limit to these screen sizes; omit for all. */
  layouts?: Layout[];
  note: string;
}

const TOUCH = ["tablet", "mobile"] as const;

export const KNOWN_LAYOUT_ISSUES: KnownLayoutIssue[] = [
  {
    app: "partners",
    match: /small-target: <button> "View all" is only 68x20px/,
    layouts: [...TOUCH],
    note: 'TODO(dev): the "View all" link on Recent Transactions is 20px tall; give it at least 24px (44px is the mobile guideline).',
  },
  {
    app: "partners",
    match: /small-target: <button> "Edit" is only 49x20px/,
    layouts: [...TOUCH],
    note: 'TODO(dev): the "Edit" buttons in Settings are 20px tall; give them at least 24px (44px is the mobile guideline).',
  },
  {
    app: "partners",
    match: /small-target: <button> "Show the QR code instead" is only \d+x(16|20)px/,
    layouts: [...TOUCH],
    note: 'TODO(dev): "Show the QR code instead" in the share modal is 16-20px tall; give it at least 24px.',
  },
  {
    app: "partners",
    match: /small-target: <button> is only 16x16px/,
    layouts: [...TOUCH],
    note: "TODO(dev): icon-only buttons (payment link copy, opening-hours controls in the location form) are 16x16px; give them at least 24x24px.",
  },
  {
    app: "partners",
    match: /broken-image: image .*\/public\/images\/melon-icon\.png did not load/,
    note: 'TODO(dev): /public/images/melon-icon.png does not exist (the app answers with an HTML page), so the Melon icon in the QR code modal is broken. See the pending "Melon icon in the QR code modal" test.',
  },
  {
    app: "storefront",
    match: /small-target: <button> "← Back" is only 48x1[78]px/,
    layouts: [...TOUCH],
    note: 'TODO(dev): the "← Back" button on the customer pay flow is 48x18px; give it at least 24px of height (44px is the mobile guideline).',
  },
  {
    app: "partners",
    match: /clipped-text: <p> "Daily: 11am - 10pm" needs 78px but is 74px wide/,
    note: 'TODO(dev): the opening-hours text in the location form is cut off by 4px ("Daily: 11am - 10pm" needs 78px, the box is 74px).',
  },
];

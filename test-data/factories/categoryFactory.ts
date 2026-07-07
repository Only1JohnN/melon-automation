// test-data/factories/categoryFactory.ts

export interface CategoryData {
  name: string;
  description?: string;
}

/**
 * Generate a unique category name with timestamp for traceability.
 */
export function createCategory(overrides?: Partial<CategoryData>): CategoryData {
  const timestamp = Date.now();
  const baseName = `AUTO-CAT-${timestamp}`;
  return {
    name: overrides?.name ?? baseName,
    description: overrides?.description ?? `Automation description ${timestamp}`,
  };
}

/**
 * Generate a category with a very long name (for max length tests).
 */
export function createLongNameCategory(): CategoryData {
  return {
    name: 'A'.repeat(256),
    description: 'Long name test',
  };
}

/**
 * Generate a category with a very long description.
 */
export function createLongDescriptionCategory(): CategoryData {
  return {
    name: `LongDesc-${Date.now()}`,
    description: 'A'.repeat(5001),
  };
}
import { faker } from "@faker-js/faker";

export function createSimpleProduct() {
  const costPrice =
    faker.number.int({
      min: 1000,
      max: 5000,
    });

  const sellingPrice =
    costPrice +
    faker.number.int({
      min: 500,
      max: 3000,
    });

  const promoPrice =
    costPrice +
    faker.number.int({
      min: 100,
      max:
        sellingPrice -
        costPrice -
        1,
    });

  return {
    name: `QA Single Product ${Date.now()}`,

    description:
      faker.commerce.productDescription(),

    category: "Fashion",

    sellingPrice,

    promoPrice,
    
    costPrice,

    stockQuantity: 10,

    lowStockThreshold: 3,
  };
}
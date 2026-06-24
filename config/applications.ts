import { env } from "./environment";

export const Applications = {
  admin: {
    name: "admin",
    url: env.adminUrl,
  },

  partners: {
    name: "partners",
    url: env.partnerUrl,
  },

  storefront: {
    name: "storefront",
    url: env.storefrontUrl,
  },

  stack: {
    name: "stack",
    url: env.stackUrl,
  },
};
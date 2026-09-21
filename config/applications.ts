import { env } from "./environment";

export const Applications = {
  // Admin isn't built yet, so it's switched off. Un-comment (and restore adminUrl in
  // config/environment.ts) once it has tests.
  // admin: {
  //   name: "admin",
  //   url: env.adminUrl,
  // },

  partners: {
    name: "partners",
    url: env.partnerUrl,
  },

  storefront: {
    name: "storefront",
    url: env.storefrontUrl,
  },
};

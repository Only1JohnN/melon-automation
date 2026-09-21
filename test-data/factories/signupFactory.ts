// test-data/factories/signupFactory.ts

export interface SignupAccount {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

/**
 * Generate a unique yopmail-backed test account for sign-up flows.
 */
export function createSignupAccount(overrides?: Partial<SignupAccount>): SignupAccount {
  const timestamp = Date.now();

  return {
    email: overrides?.email ?? `melon.qa.signup.${timestamp}@yopmail.com`,
    password: overrides?.password ?? "Password@12345",
    firstName: overrides?.firstName ?? "Melon",
    lastName: overrides?.lastName ?? "Tester",
    phone: overrides?.phone ?? "",
  };
}

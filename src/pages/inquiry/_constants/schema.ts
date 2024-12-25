import { z } from "zod";

export const zipCodeSchema = z.object({
  zipCode: z.string().regex(/^\d{5}$/, "Zip Code must be exactly 5 digits."),
});

export type TZipCodeForm = z.infer<typeof zipCodeSchema>;

export const addressSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required."),
  aptSuite: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().length(2, "State must be exactly 2 characters."), // State code should be 2 characters (e.g., "NY")
  zipCode: z.string().regex(/^\d{5}$/, "ZIP code must be exactly 5 digits."), // Ensure 5-digit ZIP code
});

export type TAddressForm = z.infer<typeof addressSchema>;

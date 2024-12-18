import { z } from "zod";

export const zipCodeSchema = z.object({
  zipCode: z.string().regex(/^\d{5}$/, "Zip Code must be exactly 5 digits."),
});

export type TZipCodeForm = z.infer<typeof zipCodeSchema>;

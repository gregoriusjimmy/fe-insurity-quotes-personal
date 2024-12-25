import { z } from "zod";

export const insuranceRatesSchema = z.object({
  age: z.string({ message: "Please input age" }),
  zipCode: z.string().regex(/^\d{5}$/, "Zip Code must be exactly 5 digits."),
  homeOwner: z.boolean().default(false),
  currentlyInsured: z.boolean().default(false),
  multipleVec: z.boolean().default(false),
});

export type TInsuranceRatesForm = z.infer<typeof insuranceRatesSchema>;

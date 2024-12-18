import { z } from "zod";

export const insuranceRatesSchema = z.object({
  age: z.string({ message: "Please input age" }),
  zipCode: z.string().regex(/^\d{5}$/, "Zip Code must be exactly 5 digits."),
  // numberOfVehicles: z
  //   .number()
  //   .min(1, "You must have at least one vehicle.")
  //   .max(10, "Number of vehicles cannot exceed 10.")
  //   .default(1),
  homeOwner: z.boolean().default(false),
  currentlyInsured: z.boolean().default(false),
  multipleVec: z.boolean().default(false),
});

export type TInsuranceRatesForm = z.infer<typeof insuranceRatesSchema>;

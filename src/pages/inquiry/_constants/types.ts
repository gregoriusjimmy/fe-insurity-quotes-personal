import type { TTicketForm } from "../_components/TicketQuestion";
import type { TAddressForm } from "./schema";

export type TUserCar = {
  vehicleYear: string;
  makeBrand: string;
  model: string;
  trim: string;
  ownerShip: string;
  primaryUse: string;
  avgMileagePerYear: string;
};

export type TCarDriverAddress = TAddressForm & {
  hasLivedAtAddressFor60Days: boolean;
};

export type TDriver = {
  firstName: string;
  lastName: string;
  gender: string;
  homeOwnership: string;
  hasAccident: boolean;
  tickets?: TTicketForm;
  needSR22Form: boolean;
  education: string;
  occupation: string;
  creditScore: string;
  hasFamilyInMilitary: boolean;
  isMarried: boolean;
  birthday: string;
  address: TCarDriverAddress;
  previousAddress?: TAddressForm;
};

export type TAnswerData = {
  isHaveCarInsurance: boolean;
  isInMilitary: boolean;
  zipCode: string;
  currentInsurer: string;
  durationWithInsurer: string;
  userCars: TUserCar[];
  drivers: TDriver[];
};

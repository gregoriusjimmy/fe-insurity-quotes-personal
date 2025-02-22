import type { TOption } from "@components/react/SelectField";
import type {
  TUserCar,
  TDriver,
  TAnswerData,
  TCarDriverAddress,
} from "./types";

export const USER_CAR_FACTORY: TUserCar = {
  vehicleYear: "",
  makeBrand: "",
  model: "",
  trim: "",
  ownerShip: "",
  primaryUse: "",
  avgMileagePerYear: "",
};

export const DRIVER_CAR_FACTORY: TCarDriverAddress = {
  city: "",
  state: "",
  streetAddress: "",
  zipCode: "",
  hasLivedAtAddressFor60Days: false,
};

export const DRIVER_FACTORY: TDriver = {
  firstName: "",
  lastName: "",
  gender: "",
  homeOwnership: "",
  hasAccident: false,
  needSR22Form: false,
  education: "",
  creditScore: "",
  hasFamilyInMilitary: false,
  occupation: "",
  isMarried: false,
  birthday: "",
  address: DRIVER_CAR_FACTORY,
};

export const ANSWER_DATA_FACTORY: TAnswerData = {
  isHaveCarInsurance: false,
  isInMilitary: false,
  zipCode: "",
  currentInsurer: "",
  durationWithInsurer: "",
  userCars: [USER_CAR_FACTORY],
  drivers: [DRIVER_FACTORY],
};

export const START_START_AT_STEP = 1;
export const CAR_START_AT_STEP = 3;
export const CAR_END_AT_STEP = 10;
export const DRIVER_START_AT_STEP = 12;
export const FULL_NAME_STEP = DRIVER_START_AT_STEP;
export const DRIVER_END_AT_STEP = 23;
export const ZIP_CODE_STEP = 2;
export const BIRTHDAY_STEP = 21;
export const CAR_ADDRESS_STEP = 22;

export const STEPS_INFO = {
  GETTING_STARTED: {
    STEP_ORDER: 1,
    TOTAL_STEP: 3,
    START_STEP: START_START_AT_STEP,
    END_STEP: ZIP_CODE_STEP,
  },
  CAR: {
    STEP_ORDER: 2,
    TOTAL_STEP: 8,
    START_STEP: CAR_START_AT_STEP,
    END_STEP: CAR_END_AT_STEP,
  },
  DRIVER: {
    STEP_ORDER: 3,
    TOTAL_STEP: 12,
    START_STEP: DRIVER_START_AT_STEP,
    END_STEP: DRIVER_END_AT_STEP,
  },
};

const generateYearOptions = (
  startYear: number,
  endYear: number,
): TOption<string>[] => {
  const years = [];
  for (let year = startYear; year >= endYear; year--) {
    years.push({
      label: `${year}`,
      value: `${year}`,
    });
  }
  return years;
};

export const YEAR_OPTIONS = generateYearOptions(
  new Date().getFullYear() + 1, // Start from next year
  new Date().getFullYear() - 13,
);

export const YEAR_OPTIONS_2 = generateYearOptions(
  new Date().getFullYear() - 14, // Start from next year
  new Date().getFullYear() - 42,
);

export const INSURANCE_DURATION_OPTIONS: TOption[] = [
  { label: "Less than a year", value: "Less than a year" },
  { label: "1-2 years", value: "1-2 years" },
  { label: "2-3 years", value: "2-3 years" },
  { label: "3 years or more", value: "3 years or more" },
];

export const INSURER_OPTIONS: TOption[] = [
  { label: "AAA/Auto Club", value: "AAA/Auto Club" },
  { label: "Allstate", value: "Allstate" },
  { label: "Esurance", value: "Esurance" },
  { label: "Farmers", value: "Farmers" },
  { label: "GEICO", value: "GEICO" },
  { label: "Liberty Mutual", value: "Liberty Mutual" },
  { label: "Nationwide", value: "Nationwide" },
  { label: "Progressive", value: "Progressive" },
  { label: "Root", value: "Root" },
  { label: "State Farm", value: "State Farm" },
  { label: "The General", value: "The General" },
  { label: "USAA", value: "USAA" },
  { label: "Other", value: "Other" },
  { label: "None", value: "None" },
];

export const INSURER_OPTIONS2: TOption[] = [
  { label: "Select Insurer", value: "Select Insurer" },
  { label: "American Family", value: "American Family" },
  { label: "Farm Bureau", value: "Farm Bureau" },
  { label: "Kemper", value: "Kemper" },
  { label: "Mercury", value: "Mercury" },
  { label: "MetLife", value: "MetLife" },
  { label: "National General", value: "National General" },
  { label: "Safeco", value: "Safeco" },
  { label: "The Hartford", value: "The Hartford" },
  { label: "Travelers", value: "Travelers" },
];

export const CAR_BRANDS_OPTIONS: TOption[] = [
  { label: "Buick", value: "Buick" },
  { label: "Chevrolet", value: "Chevrolet" },
  { label: "Chrysler", value: "Chrysler" },
  { label: "Dodge", value: "Dodge" },
  { label: "Ford", value: "Ford" },
  { label: "GMC", value: "GMC" },
  { label: "Honda", value: "Honda" },
  { label: "Hyundai", value: "Hyundai" },
  { label: "Jeep", value: "Jeep" },
  { label: "Kia", value: "Kia" },
  { label: "Nissan", value: "Nissan" },
  { label: "Toyota", value: "Toyota" },
];

export const CAR_MODELS: TOption<string>[] = [
  { label: "Model S", value: "Model S" },
  { label: "Model 3", value: "Model 3" },
  { label: "Model X", value: "Model X" },
  { label: "Model Y", value: "Model Y" },
];

export const CAR_TRIMS: TOption[] = [
  {
    label: "EX",
    value: "EX:",
  },
  {
    label: "EXL",
    value: "EXL:",
  },
  {
    label: "LX",
    value: "LX",
  },
  {
    label: "SPORT",
    value: "SPORT",
  },
];

export const CAR_BRANDS_OPTIONS2: TOption[] = [
  { label: "Acura", value: "Acura" },
  { label: "Alfa Romeo", value: "Alfa Romeo" },
  { label: "Aston Martin", value: "Aston Martin" },
  { label: "Audi", value: "Audi" },
  { label: "Autocar LLC", value: "Autocar LLC" },
  { label: "Automobili Pininfarina", value: "Automobili Pininfarina" },
  { label: "Battle Motors", value: "Battle Motors" },
  { label: "Bentley", value: "Bentley" },
  { label: "Blue Bird", value: "Blue Bird" },
  { label: "BMW", value: "BMW" },
  { label: "BrightDrop", value: "BrightDrop" },
  { label: "Bugatti", value: "Bugatti" },
  { label: "BYD Coach and Bus LLC", value: "BYD Coach and Bus LLC" },
  { label: "Cadillac", value: "Cadillac" },
  { label: "Capacity of Texas", value: "Capacity of Texas" },
  { label: "Crane Carrier", value: "Crane Carrier" },
  { label: "Cruise", value: "Cruise" },
  { label: "Dennis Eagle", value: "Dennis Eagle" },
  { label: "El Dorado", value: "El Dorado" },
  { label: "Emergency One", value: "Emergency One" },
  { label: "Evobus GmbH", value: "Evobus GmbH" },
  { label: "Ferrara Fire Apparatus", value: "Ferrara Fire Apparatus" },
  { label: "Ferrari", value: "Ferrari" },
  { label: "Fiat", value: "Fiat" },
  { label: "Freightliner", value: "Freightliner" },
  { label: "Genesis", value: "Genesis" },
  { label: "Gillig", value: "Gillig" },
  { label: "Global Electric Motors", value: "Global Electric Motors" },
  {
    label: "Global Environmental Products",
    value: "Global Environmental Products",
  },
  { label: "Grande West", value: "Grande West" },
  { label: "GreenPower Motors", value: "GreenPower Motors" },
  { label: "Hendrickson", value: "Hendrickson" },
  { label: "Hino", value: "Hino" },
  { label: "IC Corporation", value: "IC Corporation" },
  { label: "Infiniti", value: "Infiniti" },
  { label: "International", value: "International" },
  { label: "Irizar", value: "Irizar" },
  { label: "Isuzu", value: "Isuzu" },
  { label: "Jaguar", value: "Jaguar" },
  { label: "Kalmar", value: "Kalmar" },
  { label: "Karma Automotive", value: "Karma Automotive" },
  { label: "Kenworth", value: "Kenworth" },
  { label: "Kovatch", value: "Kovatch" },
  { label: "Lamborghini", value: "Lamborghini" },
  { label: "Land Rover", value: "Land Rover" },
  { label: "Lexus", value: "Lexus" },
  { label: "Lincoln", value: "Lincoln" },
  { label: "Lion", value: "Lion" },
  {
    label: "Lonestar Speciality Vehicles",
    value: "Lonestar Speciality Vehicles",
  },
  { label: "Lotus", value: "Lotus" },
  { label: "Lucid Motors", value: "Lucid Motors" },
  { label: "Mack", value: "Mack" },
  { label: "Maserati", value: "Maserati" },
  { label: "Mazda", value: "Mazda" },
  { label: "McLaren Automotive", value: "McLaren Automotive" },
  { label: "Mercedes-Benz", value: "Mercedes-Benz" },
  { label: "Mini", value: "Mini" },
  { label: "Mitsubishi", value: "Mitsubishi" },
  { label: "Motor Coach Industries", value: "Motor Coach Industries" },
  { label: "New Flyer", value: "New Flyer" },
  { label: "Nikola", value: "Nikola" },
  { label: "Nova Bus Corporation", value: "Nova Bus Corporation" },
  { label: "Orange EV", value: "Orange EV" },
  { label: "Oshkosh Motor Truck Co.", value: "Oshkosh Motor Truck Co." },
  { label: "Peterbilt", value: "Peterbilt" },
  { label: "Pierce Mfg. Inc.", value: "Pierce Mfg. Inc." },
  { label: "Polestar", value: "Polestar" },
  { label: "Porsche", value: "Porsche" },
  { label: "Prevost", value: "Prevost" },
  { label: "Proterra", value: "Proterra" },
  { label: "Ram", value: "Ram" },
  { label: "Rivian", value: "Rivian" },
  { label: "Rolls-Royce", value: "Rolls-Royce" },
  { label: "Rosenbauer America", value: "Rosenbauer America" },
  { label: "Sea Electric LLC", value: "Sea Electric LLC" },
  { label: "Spartan Motors", value: "Spartan Motors" },
  { label: "Subaru", value: "Subaru" },
  { label: "Sutphen Corp.", value: "Sutphen Corp." },
  { label: "Temsa Bus", value: "Temsa Bus" },
  { label: "Terberg Benschop", value: "Terberg Benschop" },
  { label: "Terex / Terex Advance", value: "Terex / Terex Advance" },
  { label: "Terminal Investment Corp", value: "Terminal Investment Corp" },
  { label: "Tesla", value: "Tesla" },
  { label: "Thomas", value: "Thomas" },
  { label: "Tiffin Motorhomes Inc", value: "Tiffin Motorhomes Inc" },
  { label: "Van Hool", value: "Van Hool" },
  {
    label: "Vinfast Trading and Production LLC",
    value: "Vinfast Trading and Production LLC",
  },
  { label: "Volkswagen", value: "Volkswagen" },
  { label: "Volvo", value: "Volvo" },
  { label: "Western Star/Auto Car", value: "Western Star/Auto Car" },
  { label: "Xos", value: "Xos" },
];

export const AVERAGE_MILEAGE: TOption<string>[] = [
  { label: "Less than 5,000", value: "Less than 5,000" },
  { label: "5,000 - 10,000", value: "5,000 - 10,000" },
  { label: "10,000 - 15,000", value: "10,000 - 15,000" },
  { label: "15,000 - 20,000", value: "15,000 - 20,000" },
  { label: "More than 20,000", value: "More than 20,000" },
];

type TCarModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};
type TCarMake = { name: string; id: number };

// const MAKES_OPTIONS: TOption<TCarMake>[] = allMakes.Results.map((item) => ({
//   label: item.Make_Name,
//   value: { name: item.Make_Name, id: item.Make_ID },
// }));

export const GENDER_OPTIONS: TOption[] = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Non-binary",
    value: "Non-binary",
  },
];

export const HOME_OWNERSHIP_OPTIONS: TOption[] = [
  {
    label: "Own",
    value: "Own",
  },
  {
    label: "Rent",
    value: "Rent",
  },
  {
    label: "Live with family",
    value: "Live with family",
  },
];

export const EDUCATION_OPTIONS: TOption[] = [
  { label: "Some High School", value: "Some High School" },
  { label: "High School Diploma", value: "High School Diploma" },
  { label: "GED", value: "GED" },
  { label: "Some College", value: "Some College" },
  { label: "Associate Degree", value: "Associate Degree" },
  { label: "Bachelor's Degree", value: "Bachelor's Degree" },
];

export const EDUCATION_OPTIONS_2 = [
  { label: "Master's Degree", value: "Master's Degree" },
  { label: "Doctorate", value: "Doctorate" },
  { label: "Other Professional Degree", value: "Other Professional Degree" },
  { label: "Other Non-Prof. Degree", value: "Other Non-Prof. Degree" },
  { label: "Trade/Vocational School", value: "Trade/Vocational School" },
];

export const OCCUPATION_OPTIONS = [
  { label: "Administrative Clerical", value: "Administrative Clerical" },
  { label: "Construction Trades", value: "Construction Trades" },
  { label: "Disabled", value: "Disabled" },
  { label: "Manager/Supervisor", value: "Manager/Supervisor" },
  { label: "Other Non-technical", value: "Other Non-technical" },
  { label: "Other Technical", value: "Other Technical" },
  { label: "Retail", value: "Retail" },
  { label: "Retired", value: "Retired" },
  { label: "Self-employed", value: "Self-employed" },
  { label: "Skilled/Semi-skilled", value: "Skilled/Semi-skilled" },
  { label: "Student", value: "Student" },
  { label: "Unemployed", value: "Unemployed" },
];

export const OCCUPATION_OPTIONS_2 = [
  { label: "Select Occupation", value: "Select Occupation" },
  { label: "Artist", value: "Artist" },
  { label: "Architect", value: "Architect" },
  { label: "Business Owner", value: "Business Owner" },
  {
    label: "Certified Public Accountant",
    value: "Certified Public Accountant",
  },
  { label: "Clergy", value: "Clergy" },
  { label: "Dentist", value: "Dentist" },
  { label: "Engineer", value: "Engineer" },
  { label: "Homemaker", value: "Homemaker" },
  { label: "Lawyer", value: "Lawyer" },
  { label: "Military Officer", value: "Military Officer" },
  { label: "Military Enlisted", value: "Military Enlisted" },
  { label: "Minor/NA", value: "Minor/NA" },
  { label: "Physician", value: "Physician" },
  { label: "Professional Salaried", value: "Professional Salaried" },
  { label: "Professor", value: "Professor" },
  { label: "Sales Inside", value: "Sales Inside" },
  { label: "Sales Outside", value: "Sales Outside" },
  { label: "School Teacher", value: "School Teacher" },
  { label: "Scientist", value: "Scientist" },
];

export const SCORE_OPTIONS = [
  { label: "Excellent (740+)", value: "Excellent (740+)" },
  { label: "Good (670-739)", value: "Good (670-739)" },
  { label: "Fair (580-669)", value: "Fair (580-669)" },
  { label: "Poor (<580)", value: "Poor (<580)" },
];

export const STATE_OPTIONS = [
  { label: "Alaska", value: "AK" },
  { label: "Alabama", value: "AL" },
  { label: "Arkansas", value: "AR" },
  { label: "Arizona", value: "AZ" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "District of Columbia", value: "DC" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Iowa", value: "IA" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Massachusetts", value: "MA" },
  { label: "Maryland", value: "MD" },
  { label: "Maine", value: "ME" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Missouri", value: "MO" },
  { label: "Mississippi", value: "MS" },
  { label: "Montana", value: "MT" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Nebraska", value: "NE" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "Nevada", value: "NV" },
  { label: "New York", value: "NY" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Virginia", value: "VA" },
  { label: "Vermont", value: "VT" },
  { label: "Washington", value: "WA" },
  { label: "Wisconsin", value: "WI" },
  { label: "West Virginia", value: "WV" },
  { label: "Wyoming", value: "WY" },
];

import InputField from "@components/react/InputField";
import SelectField, { type TOption } from "@components/react/SelectField";
import { Controller, useForm } from "react-hook-form";
import {
  insuranceRatesSchema,
  type TInsuranceRatesForm,
} from "../_constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckboxField from "@components/react/CheckboxField";
import Button from "@components/react/Button";
import { ArrowRightIcon, MapPin } from "lucide-react";
import dummyInsurances from "./insurances.json";
import InsuranceItem from "./InsuranceItem";

const AGE_OPTIONS: TOption[] = [
  { label: "18-20", value: "18-20" },
  { label: "21-24", value: "21-24" },
  { label: "25-34", value: "25-34" },
  { label: "35-44", value: "35-44" },
  { label: "45-54", value: "45-54" },
  { label: "55-64", value: "55-64" },
  { label: "65+", value: "65+" },
];

type Props = {
  zipCode: string;
};

const RatesFinder = ({ zipCode = "" }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<TInsuranceRatesForm>({
    resolver: zodResolver(insuranceRatesSchema),
    mode: "onChange",
    defaultValues: {
      age: "25-34",
      currentlyInsured: true,
      homeOwner: true,
      multipleVec: true,
      zipCode,
    },
  });

  const isButtonDisabled = !isValid || !isValid;

  const onSubmit = (data: TInsuranceRatesForm) => {
    console.warn(data);
  };

  return (
    <div className="flex flex-col z-30 layout ">
      <div className="pt-3 bg-secondary-500 flex flex-col rounded-[1.25rem] w-full mx-auto">
        <div className="bg-background-1 w-full rounded-[1.25rem] py-7 shadow-[0px_4px_74px_0px_#0F2C4E69]">
          <div className="flex flex-col lg:flex-row px-8 lg:px-8 w-full lg:items-center">
            <div className="flex flex-col space-y-7 lg:w-[50%] lg:space-y-0 lg:space-x-8 w-full lg:flex-row">
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    options={AGE_OPTIONS}
                    errMsgContainerClassName="lg:absolute lg:max-w-[9.5rem]"
                    errorMessage={errors.age?.message}
                    className="w-full "
                    placeholder="Age"
                    containerClassName="w-full lg:w-1/2 shrink-0"
                    onChange={field.onChange}
                  />
                )}
              />
              <InputField
                errMsgContainerClassName="lg:absolute "
                errorMessage={errors.zipCode?.message}
                maxLength={5}
                rightIcon={<MapPin className="text-black w-6 h-6" />}
                className="w-full"
                containerClassName="w-full lg:w-1/2 shrink-0"
                placeholder="Zip code"
                {...register("zipCode")}
              />
            </div>
            <div className="flex flex-col w-full shrink-0 lg:w-[30%] lg:ml-[4rem] lg:mt-0 mt-7 space-y-4 mb-9 lg:mb-0">
              <CheckboxField
                containerClassName="shrink-0"
                label="HOMEOWNER"
                errorMessage={errors.homeOwner?.message}
                {...register("homeOwner")}
              />
              <CheckboxField
                containerClassName="shrink-0"
                label="CURRENTLY INSURED"
                errorMessage={errors.currentlyInsured?.message}
                {...register("currentlyInsured")}
              />
              <CheckboxField
                containerClassName="shrink-0 "
                label="MULTIPLE VEHICLES"
                errorMessage={errors.multipleVec?.message}
                {...register("multipleVec")}
              />
            </div>
            {/* <div className="flex space-x-6 items-center lg:w-fit lg:shrink-0"> */}
            <Button
              disabled={isButtonDisabled}
              onClick={handleSubmit(onSubmit)}
              className="w-fit mb-2 lg:h-fit  lg:my-auto mx-auto lg:ml-auto"
              color="primary-gradient"
            >
              SEARCH <ArrowRightIcon className="text-white ml-2 w-8 h-8 px" />
            </Button>
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-24 lg:mt-[9.93rem] relative">
        <h2 className="text-secondary-500 text-lg text-center mb-5 font-extrabold tracking-[0.3rem]">
          IN YOUR AREAS
        </h2>
        <h1 className="text-gradient-primary text-4xl lg:text-6xl text-center font-black mb-14 lg:mb-24">
          Top Rated Insurance Company
        </h1>
        <img
          src="/images/shady-logo-mobile-2x.png"
          height={96}
          width={134}
          className="h-24 lg:hidden w-auto absolute -left-[1.6rem] -top-[0rem]"
        />
        <img
          src="/images/shady-logo-desktop-2x.png"
          height={603}
          width={439}
          className="h-[27.4375rem] hidden lg:block w-auto absolute -left-[15rem] -top-[5rem]"
        />
        <div className="flex flex-col bg-background-1 space-y-11 flex-wrap lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-y-3">
          {dummyInsurances.data.map((insurance, idx) => (
            <InsuranceItem className="" insurance={insurance} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatesFinder;

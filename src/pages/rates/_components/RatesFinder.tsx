import InputField from "@components/react/InputField";
import SelectField from "@components/react/SelectField";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  insuranceRatesSchema,
  type TInsuranceRatesForm,
} from "../_constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckboxField from "@components/react/CheckboxField";
import Button from "@components/react/Button";
import { MapPin } from "lucide-react";
import dummyInsurances from "./insuraces.json";

const RatesFinder = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInsuranceRatesForm>({
    resolver: zodResolver(insuranceRatesSchema),
    mode: "onSubmit",
  });

  const age = watch("age");
  const zipCode = watch("zipCode");

  const isButtonDisabled = !age || !zipCode;

  const onSubmit = (data: TInsuranceRatesForm) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col">
      <div className="bg-background-1 w-[95%] mx-auto rounded-lg py-6 sm:layout border-b shadow-sm">
        <div className="flex flex-col lg:flex-row px-4 lg:px-6 w-full space-y-4 lg:space-x-6 lg:mx-auto lg:w-fit">
          <div className="flex space-x-6 w-full lg:grow lg:w-auto lg:max-w-[20rem]">
            <InputField
              errMsgContainerClassName="lg:absolute lg:max-w-[9.5rem]"
              errorMessage={errors.age?.message}
              type="number"
              inputMode="numeric"
              maxLength={3}
              max={100}
              className="w-full"
              containerClassName="w-[40%] shrink-0 lg:grow lg:max-w-[40%]"
              label="Age"
              {...register("age", { valueAsNumber: true })}
            />
            <InputField
              errMsgContainerClassName="lg:absolute  lg:max-w-[10rem]"
              errorMessage={errors.zipCode?.message}
              maxLength={5}
              rightIcon={<MapPin className="text-foreground-900 w-5 h-5" />}
              className="w-full"
              containerClassName="w-full lg:grow "
              label="Zip code"
              {...register("zipCode")}
            />
          </div>
          <div className="flex space-x-6 items-center w-full lg:w-fit">
            <CheckboxField
              containerClassName="w-1/2 shrink-0 lg:w-fit"
              label="Homeowner"
              errorMessage={errors.homeOwner?.message}
              {...register("homeOwner")}
            />
            <CheckboxField
              containerClassName="w-1/2  lg:w-fit"
              label="Currently Insured"
              errorMessage={errors.currentlyInsured?.message}
              {...register("currentlyInsured")}
            />
          </div>
          <div className="flex space-x-6 items-center lg:w-fit lg:shrink-0">
            <CheckboxField
              containerClassName="w-1/2 shrink-0  lg:w-fit"
              label="Multiple Vehicles"
              errorMessage={errors.multipleVec?.message}
              {...register("multipleVec")}
            />
            <Button
              disabled={isButtonDisabled}
              onClick={handleSubmit(onSubmit)}
              className="w-1/2  lg:w-fit"
              color="primary"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-background-1 layout space-y-4 lg:space-y-6 mt-10">
        {dummyInsurances.data.map((insurance, idx) => (
          <div
            className="flex flex-col lg:flex-row bg-background-1 shadow-lg rounded-md py-8 px-8 lg:w-full lg:space-x-10 lg:justify-evenly lg:items-center"
            key={idx}
          >
            <img
              className="w-[12rem] h-auto lg:h-auto mx-auto my-auto lg:mx-0 shrink-0 lg:w-[20%]"
              width={192}
              src={insurance.image}
              alt={insurance.name}
            />
            <ol className="text-sm flex max-w-lg flex-col space-y-2 my-5 md:my-7 lg:my-0 sm:mx-auto lg:w-[60%] ml-5 list-disc ">
              {insurance.texts?.map((text, idx) => (
                <li className="" key={idx}>
                  {text}
                </li>
              ))}
            </ol>
            <Button
              size="lg"
              className="max-w-lg mx-auto w-full lg:w-[20%] lg:shrink-0 lg:h-fit lg:my-auto"
            >
              View Rate
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatesFinder;

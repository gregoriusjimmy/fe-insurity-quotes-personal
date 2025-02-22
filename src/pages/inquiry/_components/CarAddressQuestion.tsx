import { useCallback, useState } from "react";
import FormLayout from "./FormLayout";
import Button from "@components/react/Button";
import { addressSchema, type TAddressForm } from "../_constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { STATE_OPTIONS } from "../_constants";
import InputFieldRound from "@components/react/InputFieldRound";
import SelectFieldRound from "@components/react/SelectFieldRound";

type CarAddressQuestionProps = {
  onAnswer: (
    data: TAddressForm & { hasLivedAtAddressFor60Days: boolean },
  ) => void;
  defaultValues?: TAddressForm;
};

const CarAddressQuestion = ({
  defaultValues,
  onAnswer,
}: CarAddressQuestionProps) => {
  const [hasLivedAtAddressFor60Days, setHasLivedAtAddressFor60Days] =
    useState<boolean>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<TAddressForm>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = useCallback(
    (data: TAddressForm) => {
      if (hasLivedAtAddressFor60Days === undefined) return;
      onAnswer({ ...data, hasLivedAtAddressFor60Days });
    },
    [hasLivedAtAddressFor60Days, onAnswer],
  );

  return (
    <FormLayout
      note="We're able to personalize your rate more with the location of your vehicle. You'll be able to compare offers from top carriers that are available in your area."
      question={`Where do you park your car overnight?`}
      answer={
        <div className="flex flex-col">
          <div className="flex flex-col justify-center w-full space-y-5">
            <InputFieldRound
              className="w-full"
              label="Street address"
              placeholder="Enter street address"
              errorMessage={errors.streetAddress?.message}
              {...register("streetAddress")}
            />
            <InputFieldRound
              className="w-full"
              placeholder="Enter unit number"
              label="Apt, suite, etc. (optional)"
              errorMessage={errors.aptSuite?.message}
              {...register("aptSuite")}
            />
            <InputFieldRound
              className="w-full"
              label="City"
              placeholder="City"
              errorMessage={errors.city?.message}
              {...register("city")}
            />
            <div className="flex lg:space-x-5 space-y-5 lg:space-y-0 lg:flex-row  flex-col">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <SelectFieldRound
                    {...field}
                    options={STATE_OPTIONS}
                    errorMessage={errors.state?.message}
                    containerClassName="w-full lg:w-1/2"
                    placeholder="Select state"
                    label="State"
                    onChange={field.onChange}
                  />
                )}
              />
              <InputFieldRound
                errorMessage={errors.zipCode?.message}
                maxLength={5}
                label="Zip code"
                containerClassName="w-full lg:w-1/2"
                {...register("zipCode")}
              />
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <p className="font-bold mb-6 text-primary-500">
              Have you lived at this address for at least 60 days?
            </p>
            <div className="flex space-x-5 mb-10 ">
              <Button
                className=" w-1/2"
                variant="outlined"
                active={hasLivedAtAddressFor60Days}
                onClick={() => {
                  setHasLivedAtAddressFor60Days(true);
                }}
              >
                Yes
              </Button>
              <Button
                className="w-1/2"
                variant="outlined"
                active={hasLivedAtAddressFor60Days === false}
                onClick={() => {
                  setHasLivedAtAddressFor60Days(false);
                }}
              >
                No
              </Button>
            </div>
            <Button
              className=""
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || hasLivedAtAddressFor60Days === undefined}
            >
              CONTINUE
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default CarAddressQuestion;

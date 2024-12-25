import { useCallback, useState } from "react";
import FormLayout from "./FormLayout";
import Button from "@components/react/Button";
import InputField from "@components/react/InputField";
import { addressSchema, type TAddressForm } from "../_constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import SelectField from "@components/react/SelectField";
import { STATE_OPTIONS } from "../_constants";

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
          <div className="flex flex-col justify-center w-full space-y-4">
            <InputField
              className="w-full"
              label="Street address"
              placeholder="Enter street address"
              errorMessage={errors.streetAddress?.message}
              {...register("streetAddress")}
            />
            <InputField
              className="w-full"
              placeholder="Enter unit number"
              label="Apt, suite, etc. (optional)"
              errorMessage={errors.aptSuite?.message}
              {...register("aptSuite")}
            />
            <InputField
              className="w-full"
              label="City"
              placeholder="City"
              errorMessage={errors.city?.message}
              {...register("city")}
            />
            <div className="flex space-x-4">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    options={STATE_OPTIONS}
                    errorMessage={errors.state?.message}
                    containerClassName="w-1/2"
                    placeholder="Select state"
                    label="State"
                    onChange={field.onChange}
                  />
                )}
              />
              <InputField
                errorMessage={errors.zipCode?.message}
                maxLength={5}
                label="Zip code"
                containerClassName="w-fit"
                {...register("zipCode")}
              />
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <p className="font-bold mb-4">
              Have you lived at this address for at least 60 days?
            </p>
            <Button
              className="mb-4"
              variant="outlined"
              active={hasLivedAtAddressFor60Days}
              onClick={() => {
                setHasLivedAtAddressFor60Days(true);
              }}
            >
              Yes
            </Button>
            <Button
              className="mb-8"
              variant="outlined"
              active={hasLivedAtAddressFor60Days === false}
              onClick={() => {
                setHasLivedAtAddressFor60Days(false);
              }}
            >
              No
            </Button>
            <Button
              className=""
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || hasLivedAtAddressFor60Days === undefined}
            >
              Continue
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default CarAddressQuestion;

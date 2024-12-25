import { useCallback } from "react";
import FormLayout from "./FormLayout";
import Button from "@components/react/Button";
import InputField from "@components/react/InputField";
import { addressSchema, type TAddressForm } from "../_constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import SelectField from "@components/react/SelectField";
import { STATE_OPTIONS } from "../_constants";

type PreviousCarAddressQuestionProps = {
  onAnswer: (data: TAddressForm) => void;
  defaultValues?: TAddressForm;
};

const PreviousCarAddressQuestion = ({
  defaultValues,
  onAnswer,
}: PreviousCarAddressQuestionProps) => {
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
      onAnswer(data);
    },
    [onAnswer],
  );

  return (
    <FormLayout
      note="If you've moved in the last 60 days, carriers may need you previous address for verification purposes."
      question="What was your previous address?"
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
                containerClassName="w-1/2"
                {...register("zipCode")}
              />
            </div>
            <Button
              className="!mt-7"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              Continue
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default PreviousCarAddressQuestion;

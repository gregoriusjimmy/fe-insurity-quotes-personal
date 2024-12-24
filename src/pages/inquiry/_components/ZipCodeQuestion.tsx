import Button from "@components/react/Button";
import InputField from "@components/react/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { type TZipCodeForm, zipCodeSchema } from "../_constants/schema";
import FormLayout from "./FormLayout";

const ZipCodeQuestion = ({
  question,
  note,
  onAnswer,
}: {
  question: ReactNode;
  note?: string;
  onAnswer: (val: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TZipCodeForm>({
    resolver: zodResolver(zipCodeSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: TZipCodeForm) => {
    onAnswer(data.zipCode);
  };

  return (
    <FormLayout
      note={note}
      question={question}
      answer={
        <div className="flex flex-col space-y-4">
          <InputField
            maxLength={5}
            className="w-full"
            errorMessage={errors.zipCode?.message}
            label="Zip Code"
            placeholder="Enter ZIP Code"
            {...register("zipCode")}
          />
          <Button
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            size="lg"
          >
            Continue
          </Button>
        </div>
      }
    />
  );
};

export default ZipCodeQuestion;

import Button from "@components/react/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { type TZipCodeForm, zipCodeSchema } from "../_constants/schema";
import FormLayout from "./FormLayout";
import InputFieldRound from "@components/react/InputFieldRound";

const ZipCodeQuestion = ({
  question,
  note,
  defaultValues,
  onAnswer,
}: {
  question: ReactNode;
  note?: string;
  defaultValues?: TZipCodeForm;
  onAnswer: (val: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TZipCodeForm>({
    resolver: zodResolver(zipCodeSchema),
    mode: "onSubmit",
    defaultValues,
  });

  const onSubmit = (data: TZipCodeForm) => {
    onAnswer(data.zipCode);
  };

  return (
    <FormLayout
      note={note}
      question={question}
      answer={
        <div className="flex flex-col space-y-9">
          <InputFieldRound
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
            CONTINUE
          </Button>
        </div>
      }
    />
  );
};

export default ZipCodeQuestion;

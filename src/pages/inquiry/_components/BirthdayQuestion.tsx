import { useCallback, useState } from "react";
import FormLayout from "./FormLayout";
import InputDateField from "@components/react/InputDateField";
import Button from "@components/react/Button";

type TBirthdayForm = {
  birthday: string;
};

type BirthdayQuestionProps = {
  driverFirstName: string;
  isNextDriver: boolean;
  defaultValues?: TBirthdayForm;
  onAnswer: (birthday: string) => void;
};

const BirthdayQuestion = ({
  driverFirstName,
  isNextDriver,
  defaultValues,
  onAnswer,
}: BirthdayQuestionProps) => {
  const [val, setVal] = useState(defaultValues?.birthday || "");
  const [hasErrors, setHasErrors] = useState(false);

  const handleSubmit = useCallback(() => {
    onAnswer(val);
  }, [onAnswer, val]);

  const handleErrorChange = useCallback((hasError: boolean) => {
    setHasErrors(hasError);
  }, []);

  return (
    <FormLayout
      intro="We have to ask"
      note="Age can be a big factor in your rate. We will never share this data with a third party and only use it to get you accurate quotes."
      question={
        isNextDriver
          ? `When's ${driverFirstName}'s birthday?`
          : `${driverFirstName}, when's your birthday?`
      }
      answer={
        <div className="flex flex-col justify-center w-full">
          <InputDateField
            onChange={setVal}
            className="w-full"
            value={val}
            onErrorChange={handleErrorChange}
          />
          <Button
            className="mt-7"
            onClick={handleSubmit}
            disabled={hasErrors || !val}
          >
            CONTINUE
          </Button>
        </div>
      }
    />
  );
};

export default BirthdayQuestion;

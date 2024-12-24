import { useCallback, useState } from "react";
import FormLayout from "./FormLayout";
import InputDateField from "@components/react/InputDateField";
import Button from "@components/react/Button";

type BirthdayQuestionProps = {
  driverFirstName: string;
  onAnswer: (birthday: string) => void;
};

const BirthdayQuestion = ({ driverFirstName, onAnswer }: BirthdayQuestionProps) => {
  const [val, setVal] = useState("");
  const [hasErrors, setHasErrors] = useState(false); // Track error state

  const handleSubmit = useCallback(() => {
    onAnswer(val);
  }, [onAnswer, val]);

  const handleErrorChange = useCallback((hasError: boolean) => {
    setHasErrors(hasError); // Update error state based on InputDateField
  }, []);

  return (
    <FormLayout
      intro="We have to ask"
      note="Age can be a big factor in your rate. We will never share this data with a third party and only use it to get you accurate quotes."
      question={`${driverFirstName}, when's your birthday?`}
      answer={
        <div className="flex flex-col justify-center w-full">
          <InputDateField
            onChange={setVal}
            className="w-full"
            value={val}
            onErrorChange={handleErrorChange} // Pass error change handler
          />
          <Button className="mt-7" onClick={handleSubmit} disabled={hasErrors}>Continue</Button>
        </div>
      }
    />
  );
};

export default BirthdayQuestion;

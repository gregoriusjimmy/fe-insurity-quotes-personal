import Button from "@components/react/Button";
import InputFieldRound from "@components/react/InputFieldRound";
import { useState } from "react";

type TFullNameForm = { firstName: string; lastName: string };
interface FullNameAnswerProps {
  onAnswer: (val: TFullNameForm) => void;
  defaultValues?: TFullNameForm;
}

const FullNameAnswer = ({ defaultValues, onAnswer }: FullNameAnswerProps) => {
  const [firstName, setFirstName] = useState(defaultValues?.firstName || "");
  const [lastName, setLastName] = useState(defaultValues?.lastName || "");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <InputFieldRound
        className="w-full"
        containerClassName="mb-6"
        label="Legal first name"
        placeholder="First name"
        validationRegex={/^[a-zA-Z\s]*$/}
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <InputFieldRound
        className="w-full"
        placeholder="Last name"
        containerClassName="mb-[3rem]"
        label="Last name"
        validationRegex={/^[a-zA-Z\s]*$/}
        value={lastName}
        onChange={handleLastNameChange}
      />
      <Button
        disabled={!firstName || !lastName}
        onClick={() => {
          onAnswer({ firstName, lastName });
        }}
        size="lg"
      >
        CONTINUE
      </Button>
    </div>
  );
};

export default FullNameAnswer;

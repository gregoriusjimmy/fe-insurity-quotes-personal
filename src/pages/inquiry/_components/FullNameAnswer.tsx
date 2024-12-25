import Button from "@components/react/Button";
import InputField from "@components/react/InputField";
import { useState } from "react";

interface FullNameAnswerProps {
  onAnswer: (val: { firstName: string; lastName: string }) => void;
}

const FullNameAnswer = ({ onAnswer }: FullNameAnswerProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <InputField
        className="w-full mb-4"
        label="Legal first name"
        validationRegex={/^[a-zA-Z\s]*$/}
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <InputField
        className="w-full mb-6"
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
        Continue
      </Button>
    </div>
  );
};

export default FullNameAnswer;

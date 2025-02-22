import Button from "@components/react/Button";
import type { ReactNode } from "react";
import FormLayout from "./FormLayout";

const ButtonYesNo = ({
  onClick,
  isYes,
  active,
}: {
  isYes?: boolean;
  active?: boolean;
  onClick: (val: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => onClick(isYes ? true : false)}
      className="w-full "
      active={active}
      size="lg"
      color="primary-gradient"
      variant="outlined"
    >
      {isYes ? "Yes" : "No"}
    </Button>
  );
};

const YesNoHaveQuestion = ({
  question,
  intro,
  note,
  addition,
  isButtonYesActive,
  isButtonNoActive,
  onAnswer,
}: {
  question: string;
  intro?: ReactNode;
  addition?: ReactNode;
  note?: ReactNode;
  isButtonYesActive?: boolean;
  isButtonNoActive?: boolean;
  onAnswer: (val: boolean) => void;
}) => {
  return (
    <FormLayout
      intro={intro}
      note={note}
      question={question}
      answer={
        <div className="flex flex-col">
          <div className="flex flex-col space-y-6 w-full">
            <ButtonYesNo
              active={isButtonYesActive}
              onClick={(val) => onAnswer(val)}
              isYes
            />
            <ButtonYesNo
              active={isButtonNoActive}
              onClick={(val) => onAnswer(val)}
            />
          </div>
          {addition}
        </div>
      }
    />
  );
};

export default YesNoHaveQuestion;

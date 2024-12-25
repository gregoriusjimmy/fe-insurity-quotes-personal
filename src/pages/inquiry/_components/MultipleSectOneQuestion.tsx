import Button from "@components/react/Button";
import SelectField, { type TOption } from "@components/react/SelectField";
import cn from "@lib/cn";
import type { ReactNode } from "react";
import FormLayout from "./FormLayout";

const MultipleSelectOneQuestion = ({
  question,
  note,
  onAnswer,
  options,
  options2,
  placeholder,
  isSmall,
  intro,
}: {
  question: string;
  options: TOption[];
  options2?: TOption[];
  placeholder?: string;
  note?: string;
  isSmall?: boolean;
  intro?: ReactNode;
  onAnswer: (val: any) => void;
}) => {
  return (
    <FormLayout
      note={note}
      intro={intro}
      question={question}
      answer={
        <div className="flex flex-col space-y-8">
          <div
            className={cn(
              "grid grid-cols-2 lg:grid-cols-3 gap-4",
              isSmall && "flex flex-col",
            )}
          >
            {options.map((opt, idx) => (
              <Button
                className="w-full break-normal px-1"
                key={idx}
                onClick={() => onAnswer(opt.value)}
                variant="outlined"
              >
                {opt.label}
              </Button>
            ))}
          </div>
          {options2?.length && (
            <SelectField
              className="whitespace-pre w-fit"
              onChange={(val) => onAnswer(val)}
              placeholder={placeholder}
              containerClassName="w-fit mx-auto"
              options={options2}
            />
          )}
        </div>
      }
    />
  );
};

export default MultipleSelectOneQuestion;

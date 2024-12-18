import Button from "@components/react/Button";
import InputField from "@components/react/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zipCodeSchema, type TZipCodeForm } from "../_constants/_schema";

const questions = [];

const Inquiry = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answeredStep, setAnsweredStep] = useState<number[]>([]);
  const [isHaveCarInsurance, setIsHaveCarInsurance] = useState(false);
  const [isInMilitary, setIsInMIlitary] = useState(false);
  const [zipCode, setZipCode] = useState("");

  const onSetCurrentStep = (step: number) => {
    setAnsweredStep((prev) => [...prev, currentStep]);
    setCurrentStep(step);
  };

  const onNextStep = () => {
    onSetCurrentStep(currentStep + 1);
  };

  const map: Record<number, React.ReactNode> = useMemo(
    () => ({
      1: (
        <YES_NO_HAVE_QUESTION
          question="Do you currently have car insurance?"
          onAnswer={(val) => {
            setIsHaveCarInsurance(val);
            onSetCurrentStep(val ? 20 : 2);
          }}
        />
      ),
      2: (
        <YES_NO_HAVE_QUESTION
          question="Are you currently in the military or have you been deployed overseas?"
          onAnswer={(val) => {
            setIsInMIlitary(val);
            onNextStep();
          }}
        />
      ),
      3: (
        <TEXT_INPUT_QUESTION
        note="We can personalize your rate more with the location of your
                vehicle. You'll be able to compare offers from top carriers that
                are available in your area."
          question={
             "What's your ZIP code?"
          }
          onAnswer={(val) => {
            setZipCode(val);
            onNextStep();
          }}
        />
      ),
    }),
    [],
  );

  return (
    <div className="flex flex-col layout  pt-14 pb-[6.5rem]">
      {map[currentStep]}
    </div>
  );
};

export default Inquiry;

const ButtonYesNo = ({
  onClick,
  isYes,
}: {
  isYes?: boolean;
  onClick: (val: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => onClick(isYes ? true : false)}
      className="w-full"
      size="lg"
      variant="outlined"
    >
      {isYes ? "Yes" : "No"}
    </Button>
  );
};

const YES_NO_HAVE_QUESTION = ({
  question,
  onAnswer,
}: {
  question: string;
  onAnswer: (val: boolean) => void;
}) => {
  return (
    <FormLayout
      question={question}
      answer={
        <div className="flex flex-col space-y-4">
          <ButtonYesNo onClick={(val) => onAnswer(val)} isYes />
          <ButtonYesNo onClick={(val) => onAnswer(val)} />
        </div>
      }
    />
  );
};

const TEXT_INPUT_QUESTION = ({
  question,
  note,
  onAnswer,
}: {
  question: ReactNode;
  note?:string
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

type FormLayoutProps = {
  question: ReactNode;
  answer: ReactNode;
  note?:ReactNode
};

const FormLayout = ({ answer, question,note }: FormLayoutProps) => {
  return (
    <div className="flex flex-col w-full min-h-[58vh] lg:flex-row justify-between ">
      <div className="font-bold text-2xl lg:text-5xl lg:font-extrabold  mb-8 lg:w-[60%] lg:mb-0 lg:mr-8 !leading-[1.2] flex flex-col">
        {question}
      {note  &&  <div className="text-sm text-foreground-600 font-medium max-w-lg mt-4">
           note
              </div>}
      </div>
      <div className="lg:w-[40%] shrink-0 lg:mt-4">{answer}</div>
    </div>
  );
};

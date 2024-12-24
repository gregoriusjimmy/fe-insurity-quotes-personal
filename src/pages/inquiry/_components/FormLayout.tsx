import cn from "@lib/cn";
import type { ReactNode } from "react";

type FormLayoutProps = {
  question: ReactNode;
  answer: ReactNode;
  note?: ReactNode;
  intro?: ReactNode;
  classNameAnswer?: string;
};

const FormLayout = ({
  answer,
  question,
  note,
  classNameAnswer,
  intro,
}: FormLayoutProps) => {
  return (
    <div className="flex flex-col w-full min-h-[58vh] lg:flex-row justify-between ">
      <div className="font-bold text-2xl lg:text-5xl lg:font-extrabold  mb-8 lg:w-[45%] lg:mb-0 lg:mr-8 !leading-[1.2] flex flex-col">
        {intro && (
          <div className="tracking-wider text-primary-500 font-bold text-sm lg:text-base uppercase border-b w-fit mb-4">
            {intro}
          </div>
        )}
        {question}
        {note && (
          <div className="text-sm text-foreground-500 font-medium max-w-lg mt-4">
            {note}
          </div>
        )}
      </div>
      <div
        className={cn(
          "lg:w-[40%] shrink-0 lg:mt-4 items-center",
          !!intro && "lg:mt-8",
          classNameAnswer,
        )}
      >
        {answer}
      </div>
    </div>
  );
};

export default FormLayout;

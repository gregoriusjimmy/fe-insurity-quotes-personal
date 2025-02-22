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
    <div className="flex flex-col w-full min-h-[40vh] lg:flex-row lg:justify-between">
      <div className="mb-14 lg:w-[50%] lg:mb-0 lg:mr-8 !leading-[1.2] flex flex-col">
        {intro && (
          <div className="tracking-[0.3rem] font-extrabold text-lg lg:text-base uppercase w-fit mb-3 lg:mb-6 text-secondary-500">
            {intro}
          </div>
        )}
        <h1 className="font-extrabold text-4xl lg:text-[3.5rem] leading-[1.2] text-primary-500">
          {question}
        </h1>
        {note && (
          <div className="text-lg text-primary-500 font-bold mt-2 lg:text-xl  lg:mt-6">
            {note}
          </div>
        )}
      </div>
      <div
        className={cn(
          "lg:w-[45%] shrink-0 lg:mt-0 items-center",
          // !!intro && "lg:mt-8",
          classNameAnswer,
        )}
      >
        {answer}
      </div>
    </div>
  );
};

export default FormLayout;

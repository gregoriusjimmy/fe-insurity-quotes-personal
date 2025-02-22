import cn from "@lib/cn";
import type { TInsuranceItem } from "../_constants/types";
import Button from "@components/react/Button";
import { ArrowRightIcon } from "@components/react/icons";
import { useState, useEffect } from "react";

type InsuranceItem = {
  insurance: TInsuranceItem;
  className?: string;
};

const InsuranceItem = ({ insurance, className }: InsuranceItem) => {
  const [isGradient, setIsGradient] = useState(false);

  useEffect(() => {
    setIsGradient(Math.random() < 0.5);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col bg-background-1 hover:bg-[#F3FFFF] transition-colors cursor-pointer shadow-[0px_4px_99px_0px_#679DDD54] rounded-tr-[1.875rem] rounded-tl-md  pt-[2.12rem] pb-[4rem] px-6.5 relative",
        className,
      )}
    >
      <div className="absolute flex justify-center inset-x-0 -top-[1.28125rem]">
        <div className="shadow-[0px_4px_16px_0px_#679DDD91] w-[2.5625rem] h-[2.5625rem] rounded-full bg-[#F4F6FF] opacity-60" />
        <div
          className={cn(
            "absolute top-2.5 w-[1.3125rem] h-[1.3125rem] rounded-full",
            isGradient
              ? "bg-[radial-gradient(119.17%_304.47%_at_67.78%_-61.67%,_#679DDD_0%,_#3E4B82_100%)]"
              : "bg-secondary-500",
          )}
        />
      </div>
      <img
        className="w-[10rem] h-20 object-contain shrink-0 mb-8"
        width={161}
        height={78}
        src={insurance.image}
        alt={insurance.name}
      />
      <ol className="text-lg flex flex-col space-y-4.5 text-primary-500 list-disc ml-5 mb-8 lg:h-full">
        {insurance.texts?.map((text, idx) => (
          <li className="" key={idx}>
            {text}
          </li>
        ))}
      </ol>
      <Button size="md" className="w-fit flex items-center">
        <span>VIEW RATE</span>{" "}
        <ArrowRightIcon className="text-white w-4 h-4 ml-11 group-hover:ml-16 transition-all" />
      </Button>
    </div>
  );
};

export default InsuranceItem;

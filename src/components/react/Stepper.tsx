import cn from "@lib/cn";
import { useMemo } from "react";

type StepperProps = {
  currentStep: number;
  steps: string[];
  className?: string;
  currentStepProgression?: number;
};

const Stepper = ({
  currentStep,
  steps,
  className,
  currentStepProgression,
}: StepperProps) => {
  const currentStepIndex = useMemo(() => currentStep - 1, [currentStep]);

  return (
    <div className={cn("w-full mx-auto", className)}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            style={{ width: `${100 / steps.length}%` }}
            className="flex flex-col items-center flex-1 relative"
          >
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center",
                index <= currentStepIndex ? "bg-primary-500" : "bg-gray-300",
              )}
            >
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>
            <p
              className={cn(
                "mt-2 text-lg text-primary-500 tracking-widest font-bold whitespace-nowrap ml-2.5",
                "lg:self-center", // Only centers text on LG screens
                "self-start lg:self-auto", // Adjusts position dynamically
              )}
            >
              <span className="hidden lg:inline">{step}</span>
              <span className="lg:hidden">
                {currentStepIndex === index ? step : "‎"} {/* Empty space */}
              </span>
            </p>
            {index !== steps.length - 1 && (
              <>
                <div
                  style={{
                    width:
                      currentStepProgression === undefined ||
                      index < currentStepIndex
                        ? "100%"
                        : `${currentStepProgression}%`,
                  }}
                  className={cn(
                    "h-1 bg-transparent absolute right-0 left-1/2 -z-[9] top-[1rem]",
                    index <= currentStepIndex && "bg-primary-500",
                  )}
                />
                <div
                  className={cn(
                    "h-1 w-full bg-gray-300 absolute left-1/2 right-0 -z-[10] top-[1rem]",
                  )}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Stepper;

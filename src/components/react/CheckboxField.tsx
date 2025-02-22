import React, { forwardRef } from "react";
import cn from "@lib/cn"; // Optional: If you have a classnames utility
import { CheckmarkIcon } from "./icons";

interface CheckboxFieldProps extends React.ComponentPropsWithRef<"input"> {
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
}

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    { label, errorMessage, containerClassName, className, ...otherProps },
    ref,
  ) => {
    return (
      <label
        className={cn("flex items-center cursor-pointer", containerClassName)}
      >
        <div className="relative flex items-center shrink-0">
          <input
            ref={ref}
            type="checkbox"
            {...otherProps}
            className={cn(
              "appearance-none rounded-full cursor-pointer  shadow-[0px_4px_16px_0px_#679DDD91] shrink-0 w-6.5 h-6.5 border-1 border-[#3535724D] checked:border-none bg-[#F4F6FF] ",
              "peer",
              className,
            )}
          />
          <span className="absolute inset-0 left-0 items-center justify-center  top-0 hidden peer-checked:flex pointer-events-none">
            <CheckmarkIcon className="  w-5 h-5  " />
          </span>
        </div>
        {label && (
          <p className="ml-4 text-primary-500 select-none font-bold">{label}</p>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm ml-2">{errorMessage}</div>
        )}
      </label>
    );
  },
);

export default CheckboxField;

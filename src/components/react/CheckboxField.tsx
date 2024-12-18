import React, { forwardRef } from "react";
import cn from "@lib/cn"; // Optional: If you have a classnames utility

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
              "appearance-none cursor-pointer shrink-0 w-5 h-5 border border-gray-500 rounded bg-foreground-1 checked:bg-primary-500 checked:border-primary-500 focus:ring-primary-400 focus:ring-offset-2 focus:ring",
              "peer", // Used for targeting with pseudo-classes
              className,
            )}
          />
          {/* Checkmark */}
          <svg
            className="absolute top-0 left-0 w-5 h-5 fill-none stroke-white stroke-2 hidden peer-checked:block pointer-events-none"
            viewBox="0 0 24 24"
          >
            <path d="M5 12.5l4 4 10-10" />
          </svg>
        </div>
        {label && (
          <p className="ml-2 text-foreground-900 select-none">{label}</p>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm ml-2">{errorMessage}</div>
        )}
      </label>
    );
  },
);

export default CheckboxField;

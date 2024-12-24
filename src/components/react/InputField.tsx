import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { CircleX } from "lucide-react";

import cn from "@lib/cn";

interface InputFieldProps extends ComponentPropsWithRef<"input"> {
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  errMsgContainerClassName?: string;
  label?: string;
  validationRegex?: RegExp;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      containerClassName,
      className,
      errMsgContainerClassName,
      errorMessage,
      leftIcon,
      rightIcon,
      label,
      maxLength,
      validationRegex,
      ...otherProps
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (validationRegex && !validationRegex.test(value)) {
        e.target.value = value.slice(0, -1);
        return;
      }
      // Enforce max length if specified
      if (maxLength && value.length > maxLength) {
        e.target.value = value.slice(0, maxLength);
      }
    };

    return (
      <div className={cn("rounded-md", containerClassName)}>
        {label && <div className="text-sm font-semibold mb-1">{label}</div>}
        <div className="relative ">
          {!!leftIcon && (
            <div className="absolute left-3.5 inset-y-0 flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={inputRef}
            {...otherProps}
            onInput={handleInput}
            maxLength={maxLength}
            className={cn(
              "transition-colors rounded-md bg-background-1 text-foreground-900 focus:ring-[0.1875rem] focus:ring-primary-400/30",
              "focus:border-primary-400 border border-gray-500  placeholder-foreground-400 focus:outline-none px-3.5 py-3",
              errorMessage &&
                "border-red-500 focus:border-red-500 ring-red-500/30 focus:ring-red-500/30",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className,
            )}
          />
          {!!rightIcon && (
            <div className="absolute right-3.5 inset-y-0 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {!!errorMessage && (
          <div
            className={cn("flex mt-2 items-center", errMsgContainerClassName)}
          >
            <CircleX className="w-4.5 h-4.5 text-red-500  shrink-0 mr-2" />
            <div className="text-red-500 text-sm">{errorMessage}</div>
          </div>
        )}
      </div>
    );
  },
);

export default InputField;

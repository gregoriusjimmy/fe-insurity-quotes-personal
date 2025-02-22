import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { CircleX } from "lucide-react";

import cn from "@lib/cn";

interface InputFieldRoundProps extends ComponentPropsWithRef<"input"> {
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  errMsgContainerClassName?: string;
  label?: string;
  validationRegex?: RegExp;
}

const InputFieldRound = forwardRef<HTMLInputElement, InputFieldRoundProps>(
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
      <div className={cn("rounded-lg", containerClassName)}>
        {label && <div className="text-xl mb-6 text-primary-500">{label}</div>}
        <div className="relative ">
          {!!leftIcon && (
            <div className="absolute left-3.5 inset-y-0 flex items-center">
              {leftIcon}
            </div>
          )}
          <div
            className={cn(
              "absolute -z-10 w-full h-full inset-0 flex -top-[0.4375rem] -left-[0.4375rem] rounded-[2.1875rem] box-content bg-[rgba(103,157,221,0.1)] p-1.75",
            )}
          />
          <input
            ref={inputRef}
            {...otherProps}
            onInput={handleInput}
            maxLength={maxLength}
            className={cn(
              "transition-colors bg-white rounded-[2.1875rem]  text-2xl  text-primary-500 w-full",
              "focus:border-primary-500  placeholder-purple-500 focus:outline-none py-5 px-7 text-xl text-purple-500",
              errorMessage &&
                "border-red-500 focus:border-red-500 ring-red-500/30 focus:ring-red-500/30",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className,
            )}
          />
          {!!rightIcon && (
            <div className="absolute right-9 inset-y-0 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {!!errorMessage && (
          <div
            className={cn("flex mt-2 items-center", errMsgContainerClassName)}
          >
            <CircleX className="w-4.5 h-4.5 text-red-500  shrink-0 mr-2" />
            <div className="text-red-500">{errorMessage}</div>
          </div>
        )}
      </div>
    );
  },
);

export default InputFieldRound;

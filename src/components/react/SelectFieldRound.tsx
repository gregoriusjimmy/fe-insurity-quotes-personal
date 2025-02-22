import React, {
  forwardRef,
  useRef,
  useState,
  type ReactNode,
  type ComponentPropsWithRef,
  useEffect,
} from "react";
import { CircleX } from "lucide-react";
import cn from "@lib/cn";
import { useOutsideClick } from "src/hooks";
import { ChevronUp, ChevronDown } from "lucide-react";

export type TOption<T = string> = {
  label: ReactNode;
  value: T;
};

interface SelectFieldRoundProps
  extends Omit<ComponentPropsWithRef<"div">, "onChange"> {
  options: TOption[];
  containerClassName?: string;
  label?: string;
  errorMessage?: string;
  errMsgContainerClassName?: string;
  leftIcon?: ReactNode;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

const SelectFieldRound = forwardRef<HTMLDivElement, SelectFieldRoundProps>(
  (
    {
      containerClassName,
      label,
      errorMessage,
      className,
      errMsgContainerClassName,
      leftIcon,
      onChange,
      options,
      placeholder = "Select an option",
      value,
      ...otherProps
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      value,
    );

    const handleCloseDropdown = () => {
      setIsOpen(false);
    };

    useOutsideClick(containerRef, handleCloseDropdown);

    const handleToggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };

    const handleSelectOption = (value: string) => {
      setIsOpen(false);
      onChange?.(value);
    };

    useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    return (
      <div
        className={cn("rounded-[2.1875rem]", containerClassName)}
        ref={containerRef}
      >
        {label && <div className="text-xl mb-6 text-primary-500">{label}</div>}
        <div className="relative ">
          {!!leftIcon && (
            <div className="absolute left-3.5 inset-y-0 flex items-center">
              {leftIcon}
            </div>
          )}
          <div
            ref={ref}
            className={cn(
              "transition-colors rounded-[2.1875rem] focus:ring-[0.1875rem] focus:ring-primary-400/30",
              "bg-white placeholder-foreground-400 focus:outline-none px-9 py-5",
              errorMessage &&
                "border-red-500 focus:border-red-500 ring-red-500/30 focus:ring-red-500/30",
              leftIcon && "pl-11",
              "pr-11",
              "cursor-pointer",
              "flex items-center justify-between",
              className,
            )}
            onClick={handleToggleDropdown}
            {...otherProps}
          >
            <div
              className={cn(
                "absolute -z-10 w-full h-full inset-0 flex -top-[0.4375rem] -left-[0.4375rem] rounded-[2.1875rem] box-content bg-[rgba(103,157,221,0.1)] p-1.75",
              )}
            />{" "}
            <span
              className={cn(
                "text-purple-500 text-xl mr-8",
                selectedValue ? "text-purple-500" : "text-purple-500",
              )}
            >
              {selectedValue
                ? options.find((opt) => opt.value === selectedValue)?.label
                : placeholder}
            </span>
          </div>
          <div
            onClick={handleToggleDropdown}
            className="absolute cursor-pointer right-9 inset-y-0 flex items-center"
          >
            {isOpen ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </div>
          {isOpen && (
            <div className="absolute mt-1 left-0 right-0 bg-white border rounded-md shadow-lg z-10 max-h-[15rem] overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "px-4 py-4 font-bold text-lg hover:bg-primary-100 cursor-pointer",
                    selectedValue === option.value && "bg-primary-200",
                  )}
                  onClick={() => handleSelectOption(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {!!errorMessage && (
          <div
            className={cn("flex mt-2 items-center", errMsgContainerClassName)}
          >
            <CircleX className="w-4.5 h-4.5 text-red-500 shrink-0 mr-2" />
            <div className="text-red-500 text-sm">{errorMessage}</div>
          </div>
        )}
      </div>
    );
  },
);

export default SelectFieldRound;

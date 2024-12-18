import cn from "@lib/cn";
import React from "react";

export type TOption = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  options: TOption[];
  label?: string;
  containerClassName?: string;
}

const SelectField = ({
  options,
  label,
  containerClassName,
}: SelectFieldProps) => {
  return (
    <div className={cn("flex flex-col", containerClassName)}>
      {label && (
        <label
          htmlFor="countries"
          className="mb-2 text-sm font-medium text-foreground-900"
        >
          {label}
        </label>
      )}
      <select
        id="countries"
        className="bg-background-50 border border-gray-300 text-foreground-50  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
      >
        {}
      </select>
    </div>
  );
};

export default SelectField;

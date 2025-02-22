import React, { useState, useCallback } from "react";
import dayjs from "dayjs";
import InputFieldRound from "./InputFieldRound";

type TInputDateFieldProps = {
  value: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onErrorChange?: (hasError: boolean) => void;
};

const InputDateField = ({
  value,
  className,
  onChange,
  onBlur,
  onErrorChange,
}: TInputDateFieldProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let cleanValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

      // Initialize formatted value
      let formattedValue = cleanValue;

      // Add "/" after two digits for day, month, and year (when applicable)
      if (formattedValue.length >= 2 && formattedValue.length < 4) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      } else if (formattedValue.length >= 4 && formattedValue.length < 6) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}/${formattedValue.slice(4)}`;
      } else if (formattedValue.length >= 6 && formattedValue.length <= 8) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}/${formattedValue.slice(4, 8)}`;
      }

      // Limit the input to 10 characters
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.slice(0, 10);
      }

      // If the last character is a slash, and we are deleting, remove it
      if (formattedValue.endsWith("/") && cleanValue.length < value.length) {
        formattedValue = formattedValue.slice(0, -1); // Remove the trailing slash during backspace
      }

      onChange(formattedValue);
    },
    [onChange, value],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const [day, month, year] = value.split("/");

      let errorMessage = "";

      // Basic validation for day, month, year
      if (
        !day ||
        !month ||
        !year ||
        day.length !== 2 ||
        month.length !== 2 ||
        year.length !== 4
      ) {
        errorMessage = "Invalid date format. Use DD/MM/YYYY.";
      } else {
        // Validate day and month range
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);

        // Check if the month is valid
        if (monthNum < 1 || monthNum > 12) {
          errorMessage = "Invalid month.";
        }

        // Check if the day is valid for the given month
        if (dayNum < 1 || dayNum > 31) {
          errorMessage = "Invalid day.";
        }

        // Special handling for months with fewer than 31 days
        const daysInMonth = dayjs(`${year}-${month}`, "YYYY-MM").daysInMonth();
        if (dayNum > daysInMonth) {
          errorMessage = `Invalid day for the selected month. ${daysInMonth} days available.`;
        }

        // Further validation using dayjs
        const formattedDate = `${year}-${month}-${day}`;
        const isValidDate = dayjs(formattedDate, "YYYY-MM-DD", true).isValid();

        if (!isValidDate) {
          errorMessage = "Invalid date.";
        } else {
          // Further check if the date is in the future
          const isFutureDate = dayjs(formattedDate).isAfter(dayjs());
          if (isFutureDate) {
            errorMessage = "Date cannot be in the future.";
          }
        }
      }

      setErrorMessage(errorMessage);

      if (onBlur) {
        onBlur(e);
      }

      if (onErrorChange) {
        onErrorChange(!!errorMessage);
      }

      onChange(value);
    },
    [onBlur, onErrorChange, onChange],
  );

  return (
    <InputFieldRound
      className={className}
      label="Date (DD/MM/YYYY)"
      placeholder="DD/MM/YYYY"
      value={value}
      onChange={handleDateChange}
      onBlur={handleBlur}
      errorMessage={errorMessage}
      maxLength={10}
    />
  );
};

export default InputDateField;

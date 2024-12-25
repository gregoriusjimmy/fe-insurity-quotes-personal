import { useCallback, useMemo, useState } from "react";
import YesNoHaveQuestion from "./YesHaveNoQuestion";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import InputField from "@components/react/InputField";
import Button from "@components/react/Button";

type TTicketItem = {
  count: number;
  dates: string[];
};

export type TTicketForm = {
  "At-fault accidents": TTicketItem;
  "Speeding tickets": TTicketItem;
  "Impaired driving (DUI/DWI)": TTicketItem;
  "Driving with revoked/no license": TTicketItem;
  "Other violations": TTicketItem;
};

const TICKET_ITEM_FACTORY = {
  count: 0,
  dates: [],
};

const TICKET_FORM_FACTORY = {
  "At-fault accidents": TICKET_ITEM_FACTORY,
  "Speeding tickets": TICKET_ITEM_FACTORY,
  "Impaired driving (DUI/DWI)": TICKET_ITEM_FACTORY,
  "Driving with revoked/no license": TICKET_ITEM_FACTORY,
  "Other violations": TICKET_ITEM_FACTORY,
};

type TTicketQuestionProps = {
  driverFirstName: string;
  isNextDriver: boolean;
  onNo: () => void;
  onYes: (form: TTicketForm) => void;
};

const TicketQuestion = ({
  driverFirstName,
  isNextDriver,
  onNo,
  onYes,
}: TTicketQuestionProps) => {
  const [hasTickets, setHasTicket] = useState(false);
  const [dateErrors, setDateErrors] = useState<Record<string, string[]>>({});
  const [ticketForm, setTicketForm] =
    useState<TTicketForm>(TICKET_FORM_FACTORY);

  const handleClickPlus = useCallback((key: keyof TTicketForm) => {
    setTicketForm((prev) => ({
      ...prev,
      [key]: {
        count: Math.min(prev[key].count + 1, 3),
        dates: [...prev[key].dates],
      },
    }));
  }, []);

  // Handle Minus button click
  const handleClickMinus = useCallback((key: keyof TTicketForm) => {
    setTicketForm((prev) => {
      const newDates = [...prev[key].dates];
      if (newDates.length > 0) newDates.pop(); // Remove last date
      return {
        ...prev,
        [key]: {
          count: Math.max(prev[key].count - 1, 0),
          dates: newDates,
        },
      };
    });

    setDateErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[key]) {
        newErrors[key] = newErrors[key].slice(0, -1); // Remove last error
      }
      return newErrors;
    });
  }, []);

  // Handle date input change
  const handleDateChange = useCallback(
    (key: keyof TTicketForm, index: number, value: string) => {
      const cleanValue = value.replace(/[^0-9/]/g, "");
      const formattedValue =
        cleanValue.length === 2 && !cleanValue.includes("/")
          ? `${cleanValue}/`
          : cleanValue.slice(0, 7);

      setTicketForm((prev) => {
        const newDates = [...prev[key].dates];
        newDates[index] = formattedValue;
        return {
          ...prev,
          [key]: {
            ...prev[key],
            dates: newDates,
          },
        };
      });
    },
    [],
  );

  // Handle date validation on blur
  const handleBlur = useCallback(
    (key: keyof TTicketForm, index: number, value: string) => {
      let errorMessage = "";

      const [month, year] = value.split("/");
      if (!month || !year || month.length !== 2 || year.length !== 4) {
        errorMessage = "Invalid date format. Use MM/YYYY.";
      } else {
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (monthNum < 1 || monthNum > 12) {
          errorMessage = "Month must be between 01 and 12.";
        } else if (yearNum > currentYear) {
          errorMessage = "Year cannot be in the future.";
        } else {
          const inputDate = new Date(yearNum, monthNum - 1);
          const threeYearsAgo = new Date();
          threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

          if (inputDate < threeYearsAgo) {
            errorMessage = "The date must be within the last 3 years.";
          } else if (yearNum === currentYear && monthNum > currentMonth) {
            errorMessage = "Month cannot be in the future.";
          }
        }
      }

      setDateErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (!newErrors[key]) {
          newErrors[key] = [];
        }
        newErrors[key][index] = errorMessage;
        return newErrors;
      });
    },
    [],
  );

  const hasErrors = useMemo(
    () =>
      Object.values(dateErrors).some((errors) =>
        errors.some((error) => error && error.length > 0),
      ),
    [dateErrors],
  );

  const formIsEmpty = useMemo(
    () =>
      Object.values(ticketForm).every(
        (item) => item.count === 0 || item.dates.every((date) => !date.trim()),
      ),
    [ticketForm],
  );

  return (
    <YesNoHaveQuestion
      isButtonYesActive={hasTickets}
      intro="Let's talk driving history"
      note="Accidents happen, but listing your incident history now ensures a more accurate rate. Insurance companies will verify before purchase."
      question={
        isNextDriver
          ? `Has ${driverFirstName} had any accidents or tickets in the last 3 years?`
          : `${driverFirstName}, any accidents or tickets in the last 3 years?`
      }
      onAnswer={(isYes) => {
        if (!isYes) {
          onNo();
          return;
        }
        setHasTicket(true);
      }}
      addition={
        hasTickets && (
          <div className="flex flex-col justify-center w-full mt-8">
            <div className="text-center text-sm mb-4">
              All good—it happens. How many?
            </div>
            {Object.keys(ticketForm).map((key, idx) => (
              <div
                className="flex flex-col  pb-3 border-b items-center"
                key={idx}
              >
                <div className="flex justify-between pt-3 w-full">
                  <div className="text-foreground-700">{key}</div>
                  <div className="flex items-center space-x-4">
                    <Minus
                      onClick={() => handleClickMinus(key as keyof TTicketForm)}
                      className="text-foreground-700 w-6 h-6 cursor-pointer"
                    />
                    <span className="text-lg font-bold select-none">
                      {ticketForm[key as keyof TTicketForm].count}
                    </span>
                    <Plus
                      onClick={() => handleClickPlus(key as keyof TTicketForm)}
                      className="text-primary-700 w-6 h-6 cursor-pointer"
                    />
                  </div>
                </div>
                {Array.from(
                  { length: ticketForm[key as keyof TTicketForm].count },
                  (_, index) => (
                    <div className="w-full flex flex-col pt-4" key={index}>
                      <div className="mb-1">Accident #{index + 1}</div>
                      <InputField
                        errorMessage={dateErrors[key]?.[index]}
                        maxLength={7}
                        label="Date of incident"
                        placeholder="MM/YYYY"
                        value={
                          ticketForm[key as keyof TTicketForm].dates[index] ||
                          ""
                        }
                        onBlur={(e) =>
                          handleBlur(
                            key as keyof TTicketForm,
                            index,
                            e.target.value,
                          )
                        }
                        onChange={(e) =>
                          handleDateChange(
                            key as keyof TTicketForm,
                            index,
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            ))}
            <Button
              onClick={() => onYes(ticketForm)}
              disabled={hasErrors || (hasTickets && formIsEmpty)}
            >
              Continue
            </Button>
          </div>
        )
      }
    />
  );
};

export default TicketQuestion;

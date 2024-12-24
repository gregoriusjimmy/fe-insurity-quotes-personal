import InputField from "@components/react/InputField";
import type { TOption } from "@components/react/SelectField";
import { useState, useMemo } from "react";
import FormLayout from "./FormLayout";
import { FixedSizeList } from "react-window";

const SearchSelectQuestion = ({
  question,
  note,
  onAnswer,
  options,
  placeholder,
}: {
  question: string;
  options: TOption<any>[];
  placeholder?: string;
  note?: string;
  onAnswer: (val: any) => void;
}) => {
  const [searchVal, setSearchVal] = useState("");

  const items = useMemo(() => {
    if (!searchVal) return options;
    const normalizedSearch = searchVal.trim().toLowerCase();
    return options.filter((opt) =>
      normalizedSearch
        ? opt.label?.toString().toLowerCase().includes(normalizedSearch)
        : true,
    );
  }, [options, searchVal]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div
      className="w-full px-4 py-4 flex items-center hover:bg-primary-100 cursor-pointer transition-colors"
      style={style}
      onClick={() => {
        setSearchVal("");
        onAnswer(items[index].value);
      }}
    >
      {items[index].label}
    </div>
  );

  return (
    <FormLayout
      note={note}
      question={question}
      answer={
        <div className="flex flex-col space-y-8">
          <InputField
            className="w-full"
            placeholder={placeholder}
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
          <div className="flex flex-col overflow-y-auto  bg-white border rounded-md shadow-lg z-10 max-h-[15rem] ">
            <FixedSizeList
              height={340}
              itemCount={items.length}
              itemSize={60}
              width="100%"
            >
              {Row}
            </FixedSizeList>
          </div>
        </div>
      }
    />
  );
};

export default SearchSelectQuestion
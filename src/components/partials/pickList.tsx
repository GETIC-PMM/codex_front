import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

export type LabelValue = {
  label: string;
  value: string;
};

const PickList = ({
  options,
  picked,
  setPicked,
  setOptions,
  disabled,
  onChange,
}: {
  options: {
    value: string;
    label: string;
  }[];
  picked: {
    value: string;
    label: string;
  }[];
  setPicked: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
  setOptions: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
  disabled?: boolean;
  onChange?: (picked: LabelValue[]) => void;
}) => {
  const [selectedField, setSelectedField] = useState<LabelValue | undefined>(
    undefined
  );
  const [filteredOptions, setFilteredOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [filteredPicked, setFilteredPicked] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [searchOptions, setSearchOptions] = useState("");
  const [searchPicked, setSearchPicked] = useState("");

  // useEffect(() => {
  //     if (onChange) onChange(picked)
  // }, [picked])

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchOptions.toLowerCase())
      )
    );

    setFilteredPicked(
      picked.filter((option) =>
        option.label.toLowerCase().includes(searchPicked.toLowerCase())
      )
    );
  }, [searchOptions, searchPicked, options, picked]);

  return (
    <div className="w-full flex justify-between min-h-[200px] gap-2">
      <div className="border w-full rounded-md flex flex-col bg-white">
        <div className="w-full p-2">
          <Input
            type="text"
            placeholder="Pesquisar"
            className=""
            onChange={(e) => setSearchOptions(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto text-sm h-[220px]">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex justify-between items-center px-2 py-1",
                selectedField === option
                  ? "bg-pmmBlue text-white"
                  : "bg-white text-black"
              )}
              onClick={() => setSelectedField(option)}
            >
              <div className="cursor-default">{option.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col text-xs justify-center gap-2">
        <button
          className={cn(
            "bg-pmmBlue rounded-lg flex items-center justify-center p-2 text-white cursor-pointer",
            {
              "opacity-50": disabled,
            }
          )}
          onClick={() => {
            if (selectedField && !picked.includes(selectedField)) {
              const pickedIndex = options.findIndex(
                (option) => option === selectedField
              );
              setPicked([...picked, selectedField]);
              if (onChange) onChange([...picked, selectedField]);
              setOptions(options.filter((option) => option !== selectedField));
              if (pickedIndex === options.length - 1) {
                setSelectedField(options[pickedIndex - 1]);
              } else {
                setSelectedField(options[pickedIndex + 1]);
              }
            }
          }}
          disabled={disabled}
          type="button"
        >
          {">"}
        </button>
        <button
          type="button"
          className={cn(
            "bg-pmmBlue rounded-lg flex items-center justify-center p-2 text-white cursor-pointer",
            {
              "opacity-50": disabled,
            }
          )}
          onClick={() => {
            setPicked([...picked, ...options]);
            if (onChange) onChange([...picked, ...options]);
            setOptions([]);
          }}
          disabled={disabled}
        >
          {">>"}
        </button>
        <button
          type="button"
          className={cn(
            "bg-pmmBlue rounded-lg flex items-center justify-center p-2 text-white cursor-pointer",
            {
              "opacity-50": disabled,
            }
          )}
          onClick={() => {
            if (selectedField && !options.includes(selectedField)) {
              const optionsIndex = picked.findIndex(
                (option) => option === selectedField
              );
              setOptions([...options, selectedField]);
              setPicked(picked.filter((option) => option !== selectedField));
              if (onChange)
                onChange(picked.filter((option) => option !== selectedField));
              if (optionsIndex === picked.length - 1) {
                setSelectedField(picked[optionsIndex - 1]);
              } else {
                setSelectedField(picked[optionsIndex + 1]);
              }
            }
          }}
          disabled={disabled}
        >
          {"<"}
        </button>
        <button
          type="button"
          className={cn(
            "bg-pmmBlue rounded-lg flex items-center justify-center p-2 text-white cursor-pointer",
            {
              "opacity-50": disabled,
            }
          )}
          onClick={() => {
            setPicked([]);
            if (onChange) onChange([]);
            setOptions([...options, ...picked]);
          }}
          disabled={disabled}
        >
          {"<<"}
        </button>
      </div>
      <div className="border w-full rounded-md bg-white">
        <div className="w-full p-2">
          <Input
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => setSearchPicked(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto w-full text-sm h-[220px]">
          {filteredPicked.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex justify-between items-center py-1 px-3 ",
                selectedField === option
                  ? "bg-pmmBlue text-white"
                  : "bg-white text-black"
              )}
              onClick={() => setSelectedField(option)}
            >
              <div className="cursor-default">{option.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PickList;

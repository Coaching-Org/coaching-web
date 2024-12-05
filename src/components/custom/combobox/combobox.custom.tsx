import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

interface ComboboxProps {
  data: Array<{ value: string | number; label: string }>;
  onSelect?: (value: { value: string | number; label: string }) => void;
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  defaultValue?: Item | undefined | null;
}

interface Item {
  value: string | number;
  label: string;
}

export const ComboboxCustom = ({
  data = [],
  onSelect,
  onSearch,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
  loading = false,
  defaultValue,
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleSelect = (value: string | number, label: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect?.({ value, label });
  };

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-gray-400"
        }`}
        disabled={disabled}
      >
        <span className="block truncate">
          {defaultValue
            ? defaultValue.label
            : data.find((item) => item.value === selectedValue)?.label ||
              placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronsUpDown
            className="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg border z-10">
          <div className="px-3 py-2">
            <input
              type="text"
              className="w-full rounded-md border px-3 py-2 text-sm bg-white"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <ul className="mt-2">
            {filteredData.map((item) => (
              <li
                key={item.value}
                className={`relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-gray-100 ${
                  selectedValue === item.value ? "bg-gray-50" : ""
                }`}
                onClick={() => handleSelect(item.value, item.label)}
              >
                <span className="block truncate">{item.label}</span>
                {selectedValue === item.value && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Check
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                )}
              </li>
            ))}
            {filteredData.length === 0 && (
              <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "../language.provider";

interface ComboboxProps {
  data: Array<ItemDetailProps>;
  defaultValue?: ItemDetailProps;
  disabled?: boolean;
  onValueChange?: (value: any) => void;
  onDataChange?: (data: any) => void;
  onSearch?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

interface ItemDetailProps {
  value: string | number;
  label: string | number;
}

function ComboboxMemo({
  data,
  defaultValue,
  disabled = false,
  onValueChange,
  onDataChange,
  onSearch,
  loading = false,
}: ComboboxProps) {
  const { translations } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [label, setLabel] = React.useState<string>("");

  // Reset search when open
  React.useEffect(() => {
    const e = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
    onSearch?.(e);
  }, [open]);

  const ItemList = React.useMemo(() => {
    return data.map((item) => (
      <CommandItem
        key={item.value}
        value={item.value.toString()}
        onSelect={(currentValue) => {
          setValue(currentValue === value ? "" : currentValue);
          setLabel(item.label.toString());
          setOpen(false);
          onValueChange?.(currentValue);
          onDataChange?.(item);
        }}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === item.value ? "opacity-100" : "opacity-0"
          )}
        />
        {item.label}
      </CommandItem>
    ));
  }, [data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          {value && label
            ? label
            : defaultValue?.label
              ? defaultValue?.label
              : translations.components.combobox.select}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search" onChangeCapture={onSearch} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CommandList>
              <CommandEmpty>
                {translations.components.combobox.noData}
              </CommandEmpty>

              <CommandGroup>
                {ItemList}
                {/* {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value.toString()}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setLabel(item.label.toString());
                      setOpen(false);
                      onValueChange?.(currentValue);
                      onDataChange?.(item);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))} */}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const Combobox = React.memo(ComboboxMemo);

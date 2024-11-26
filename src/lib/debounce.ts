import { useEffect, useState } from "react";

export const useDebounce = (
  value: string,
  delay?: number,
  minLengthValue?: number
): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value?.length >= (minLengthValue ?? 3) || value?.length === 0) {
        setDebouncedValue(value);
      }
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

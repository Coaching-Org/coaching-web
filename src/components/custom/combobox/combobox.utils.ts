import { useEffect, useRef } from "react";

interface UseClickOutsideProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useClickOutside = ({
  isOpen,
  setIsOpen,
}: UseClickOutsideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return ref;
};

import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If value changes before the delay, cancel the previous timer
    // This is the cleanup function — runs before the next effect
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

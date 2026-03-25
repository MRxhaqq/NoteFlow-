import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  // Read from localStorage on first render only
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage read error [${key}]:`, error);
      return initialValue;
    }
  });

  // Write to both state and localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`useLocalStorage write error [${key}]:`, error);
    }
  };

  return [storedValue, setValue];
}

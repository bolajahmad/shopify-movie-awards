import { useEffect, useState } from 'react';

export const useDebounce = (value: string | boolean, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string | boolean>('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

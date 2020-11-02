import { useEffect, useState } from 'react';

export const withLocalStorage = (key: string) => <T,>(defaultValue: T) => {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  useEffect(() => {
    const cachedValue = window.localStorage.getItem(key);
    if (cachedValue) {
      setValue(JSON.parse(cachedValue));
      setLoaded(true);
    } else {
      setValue(defaultValue);
      setLoaded(true);
    }
  }, [defaultValue]);

  return [loaded, value, setLoaded];
};

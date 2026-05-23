import { useQuery } from "@tanstack/react-query";
import type { User } from "../type";
import { searchUsers } from "../api/users.api";

import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

export const useSearchQuery = (query: string) => {
  const debouncedValue = useDebounce(query, 400);

  return useQuery<User[]>({
    queryKey: ["users", "search", debouncedValue],
    queryFn: async () => {
      const response = await searchUsers(debouncedValue);
      return response;
    },
    enabled: debouncedValue.length >= 2,
  });
};

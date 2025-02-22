import { useMemo } from "react";

export const useQueryParams = () => {
  return useMemo(() => new URLSearchParams(window.location.search), []);
};

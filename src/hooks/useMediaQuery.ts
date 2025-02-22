import { useEffect, useLayoutEffect, useState } from "react";

const MEDIA_QUERIES = {
  SM: "(min-width: 640px)", // Tailwind 'sm'
  MD: "(min-width: 768px)", // Tailwind 'md'
  LG: "(min-width: 1024px)", // Tailwind 'lg'
  XL: "(min-width: 1280px)", // Tailwind 'xl'
  "2XL": "(min-width: 1536px)", // Tailwind '2xl'
};

const getInitialMatch = (query: string) => {
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }
  return false; // Default state during SSR
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => getInitialMatch(query));

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export const useMediaQueries = {
  SM: () => useMediaQuery(MEDIA_QUERIES.SM),
  MD: () => useMediaQuery(MEDIA_QUERIES.MD),
  LG: () => useMediaQuery(MEDIA_QUERIES.LG),
  XL: () => useMediaQuery(MEDIA_QUERIES.XL),
  XL2: () => useMediaQuery(MEDIA_QUERIES["2XL"]),
};

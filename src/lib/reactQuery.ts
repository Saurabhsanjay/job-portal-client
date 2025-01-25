import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Prevent retries by default
      refetchOnWindowFocus: false, // Disable refetching when the window regains focus
    },
  },
});

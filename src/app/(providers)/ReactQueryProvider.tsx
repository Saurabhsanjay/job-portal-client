"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient(
{
    defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5000, 
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 5000,
      refetchIntervalInBackground: false,
    },
    mutations: {
      retry: 2,
    },
    },
}

  ));

  return (
    <QueryClientProvider client={queryClient}>{children}
      <ReactQueryDevtools />

    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

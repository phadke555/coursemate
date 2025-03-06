"use client"; // Force this to run on the client

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Ensure queryClient is stable

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

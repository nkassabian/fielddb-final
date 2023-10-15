"use client";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trcp } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trcp.createClient({
      links: [
        httpBatchLink({
          // url: "http://localhost:3000/api/trpc",
          url: "https://https://fielddb.vercel.app/api/trpc",
        }),
      ],
    })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <trcp.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trcp.Provider>
    </ThemeProvider>
  );
};

export default Providers;

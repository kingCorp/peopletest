import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data forever, till it is invalidated or cleared
      cacheTime: Number.MAX_VALUE,
      // Refetch always when a screen remounts
      refetchOnMount: "always",
      // Refetch always when a user refocuses
      refetchOnWindowFocus: "always",
      // We consider all data stale after 10 minutes of last fetch
      staleTime: 1000 * 60 * 10,
    },
  },
});

export const useQueryFocusListener = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      if (Platform.OS !== "web") {
        focusManager.setFocused(status === "active");
      }
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);
};

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

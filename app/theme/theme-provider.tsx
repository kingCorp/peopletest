import { ThemeProvider as Provider } from "@shopify/restyle";
import React from "react";
import { useColorScheme } from "react-native";
import { themes } from "./get-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  return <Provider theme={theme}>{children}</Provider>;
}

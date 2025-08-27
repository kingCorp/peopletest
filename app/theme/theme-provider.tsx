import { ThemeProvider as Provider } from "@shopify/restyle";
import React from "react";
import { useSelector } from "react-redux";
import { getMode } from "../redux_store/profile/profile-slice";
import { themes } from "./get-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useSelector(getMode) // useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  return <Provider theme={theme}>{children}</Provider>;
}

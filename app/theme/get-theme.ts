// theme.ts
import { createTheme } from "@shopify/restyle";

const palette = {
  white: "#FFFFFF",
  black: "#242222ff",
  gray: "#808080",
  blue: "#3b82f6",
};

const lightTheme = createTheme({
  colors: {
    background: palette.white,
    text: palette.black,
    primary: palette.blue,
    card: "#f2f2f2",
    black: "#000",
    white: "#fff",
  },
  spacing: {
    none: 0,
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      color: "text",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: "text",
    },
  },
});

const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: palette.black,
    text: palette.white,
    card: "#222",
    black: "#000",
    white: "#fff",
  },
};

export type Theme = typeof lightTheme;
export const themes = { light: lightTheme, dark: darkTheme };

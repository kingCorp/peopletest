import { Theme } from "@/app/theme/get-theme";
import { useTheme } from "@/app/theme/use-theme";
import { createBox } from "@shopify/restyle";
import { ActivityIndicator as Indicator, useColorScheme } from "react-native";

// import { Theme, useTheme } from "@/theme";

const RestyleIndicator = createBox<
  Theme,
  React.ComponentProps<typeof Indicator>
>(Indicator);

type RestyleIndicatorProps = React.ComponentProps<typeof RestyleIndicator>;

export type ActivityIndicatorProps = RestyleIndicatorProps & {
  type?: "dark" | "light";
};

/**
 * Custom native `Activity` indicator respecting both native design system
 * @example
 * ```tsx
 * return (
 * ...
 *  <ActivityIndicator size="l" type="dark" />
 * ...
 * )
 * ```
 */
export function ActivityIndicator({ type, ...rest }: ActivityIndicatorProps) {
  const { colors } = useTheme();
  const colorType = useColorScheme();

  return (
    <RestyleIndicator
      color={colorType === "light" ? colors.black : colors.white}
      {...rest}
    />
  );
}

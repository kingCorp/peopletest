import { Theme } from "@/app/theme/get-theme";
import { createBox } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";

export const SafeAreaBox = createBox<
  Theme,
  React.ComponentProps<typeof SafeAreaView>
>(SafeAreaView);

export type SafeAreaBoxProps = React.ComponentProps<typeof SafeAreaBox>;

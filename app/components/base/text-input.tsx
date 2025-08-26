import { Theme } from "@/app/theme/get-theme";
import { createBox } from "@shopify/restyle";
import { TextInput as RNTextInput } from "react-native";


export const TextInput = createBox<
  Theme,
  React.ComponentProps<typeof RNTextInput>
>(RNTextInput);

export type TextInputProps = React.ComponentProps<typeof TextInput>;

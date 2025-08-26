import {
  StatusBar as ExpoBar,
  StatusBarProps as ExpoBarProps,
} from "expo-status-bar";
import { useColorScheme } from "react-native";


export type StatusBarProps = ExpoBarProps;

export function StatusBar(props: StatusBarProps) {
  const scheme  = useColorScheme();

  return <ExpoBar style={scheme === "dark" ? "light" : "dark"} {...props} />;
}

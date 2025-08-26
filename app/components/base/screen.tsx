import { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { ActivityIndicator } from "./activity-indicator";
import { Box } from "./box";
import { SafeAreaBox, SafeAreaBoxProps } from "./safe-area-box";

export function Screen({
  children,
  isLoading = false,
  ...rest
}: SafeAreaBoxProps & {
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <SafeAreaBox backgroundColor="background" flex={1} {...rest}>
      {children}
      {isLoading && (
        <Box
          alignItems="center"
          justifyContent="center"
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "#000", opacity: 0.5 },
          ]}
        >
          <ActivityIndicator size="large" />
        </Box>
      )}
    </SafeAreaBox>
  );
}

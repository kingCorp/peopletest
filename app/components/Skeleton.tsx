import React, { useEffect } from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { Box } from "./base/box";

const Skelenton = ({ width = 200, height = 20, borderRadius = 8 }) => {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Box
      width={width}
      height={height}
      overflow="hidden"
      borderRadius={borderRadius}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={["#fff", "#edebebff", "#fff"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            width: width,
            height: "100%",
          }}
        />
      </Animated.View>
    </Box>
  );
};

export default Skelenton;

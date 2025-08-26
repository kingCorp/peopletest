import { TouchableOpacity } from "react-native";
import { Text } from "./text";

export const CustomButton = ({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={{
      backgroundColor: disabled ? "#696868ff" : "#000",
      width: "100%",
      alignItems: "center",
      paddingVertical: 20,
      borderRadius: 5,
    }}
    onPress={onPress}
  >
    <Text color="white" fontWeight="600">
      {title}
    </Text>
  </TouchableOpacity>
);

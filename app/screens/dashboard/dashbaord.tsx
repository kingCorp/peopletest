import { Screen } from "@/app/components/base/screen";
import { Text } from "@/app/components/base/text";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function Dashboard() {
  const { goBack } = useNavigation();

  return (
    <Screen justifyContent="center" paddingHorizontal="m">
      <Text marginBottom="m" textAlign="center">
        Hello
      </Text>
      <Pressable
        onPress={() => {
          goBack();
        }}
      >
        <Text> Go to Login</Text>
      </Pressable>
    </Screen>
  );
}

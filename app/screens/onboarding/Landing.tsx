// import { useTranslation } from "react-i18next";

import { Box } from "@/app/components/base/box";
import { CustomButton } from "@/app/components/base/pressable-box";
import { Screen } from "@/app/components/base/screen";
import { Text } from "@/app/components/base/text";
import { NAV_ROUTES } from "@/app/navigation/nav-routes";
import { useNavigation } from "@react-navigation/native";

export default function Landing() {
  const { navigate } = useNavigation();

  const handleGetStated = () => {
    navigate(NAV_ROUTES.LOGIN);
  };

  return (
    <Screen paddingHorizontal="m">
      <Box flex={1} justifyContent="space-between">
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text
            testID="title"
            fontSize={30}
            marginVertical="l"
            fontWeight="800"
          >
            PEOPLE
          </Text>
          <Text fontSize={15} fontWeight="600">
            Get Access to Names of People
          </Text>
        </Box>
        <CustomButton title="Get Started" onPress={handleGetStated} />
      </Box>
    </Screen>
  );
}

// import { useTranslation } from "react-i18next";

import { Box } from "@/app/components/base/box";
import { CustomButton } from "@/app/components/base/pressable-box";
import { Screen } from "@/app/components/base/screen";
import { Text } from "@/app/components/base/text";
import { NAV_ROUTES } from "@/app/navigation/nav-routes";
import navigationService from "@/app/navigation/utils/navigationService";
import { PERSIST_CONSTANTS } from "@/app/utils/constants";
import { secureItem } from "@/app/utils/helper-functions";
import { useRef, useState } from "react";
import { Dimensions, NativeSyntheticEvent, ScrollView } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;

const onboard = [
  {
    title: "👋 Welcome to PeopleApp",
    subtext: "Discover and connect with people instantly.",
  },
  {
    title: "🔍 Browse User Profiles",
    subtext: "Quickly view a list of users, their details, and stay connected.",
  },
  {
    title: "📱 Easy & Fast",
    subtext: "Simple interface to explore users anytime, anywhere.",
  },
];

const colorsbg = ["#a67878ff", "#e17f7fff", "#d2f079ff"];

export default function Landing() {
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleGetStated = () => {
    secureItem(PERSIST_CONSTANTS.ONBOARDED, "true");
    navigationService.reset([{ name: NAV_ROUTES.REGISTER }]);
  };

  function handleScroll(event: NativeSyntheticEvent<any>) {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    const selectedIndex_ = Math.round(contentOffset.x / viewSize.width);
    setSelectedIndex(selectedIndex_);
  }

  function goToNext() {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollTo({
        animated: true,
        x: DEVICE_WIDTH * (selectedIndex + 1),
      });
    }
  }

  return (
    <Screen
      style={{
        backgroundColor: colorsbg[selectedIndex],
      }}
    >
      <Box flex={1} justifyContent="space-between">
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text
            testID="title"
            fontSize={30}
            fontWeight="800"
            style={{ marginVertical: 50 }}
          >
            PEOPLE APP
          </Text>
        </Box>
        <ScrollView
          horizontal
          onScroll={handleScroll}
          pagingEnabled
          ref={scrollRef}
          scrollEventThrottle={16}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
        >
          {onboard.map((item, i) => (
            <Box
              key={i}
              width={DEVICE_WIDTH}
              paddingHorizontal="xl"
              rowGap="xl"
            >
              <Text textAlign="center" fontSize={25} fontWeight="700">
                {item.title}
              </Text>
              <Text textAlign="center">{item.subtext}</Text>
            </Box>
          ))}
        </ScrollView>
        <Box paddingHorizontal="l">
          <CustomButton
            title={selectedIndex === 2 ? "Get Started" : "Next"}
            onPress={selectedIndex === 2 ? handleGetStated : goToNext}
          />
        </Box>
      </Box>
    </Screen>
  );
}

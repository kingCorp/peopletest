import { Box } from "@/app/components/base/box";
import { Screen } from "@/app/components/base/screen";
import { Text } from "@/app/components/base/text";
import Skelenton from "@/app/components/Skeleton";
import { useGetUser } from "@/app/services/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { Alert, Image, Pressable } from "react-native";

export default function Details() {
  const { setOptions, goBack } = useNavigation();
  const params = useRoute();
  const { isLoading, data, status, error } = useGetUser(params.params?.id);

  useEffect(() => {
    if (status === "error") {
      Alert.alert(
        "",
        error?.response?.data?.error || "Network error, Please try again"
      );
    }
  }, [status]);

  const headerLeft = useCallback(
    () => (
      <Pressable
        onPress={() => {
          goBack();
        }}
      >
        <Ionicons name="chevron-back" size={20} color="#333232ff" />
      </Pressable>
    ),
    []
  );

  useLayoutEffect(() => {
    setOptions({
      headerLeft,
      headerRight: null,
      headerShown: true,
      headerTitleAlign: "center",
      title: data?.data?.first_name,
    });
  }, [headerLeft, setOptions, data]);

  return (
    <Screen paddingHorizontal="m">
      <Box flex={1} alignItems="center" rowGap="xl">
        <Image
          source={{ uri: data?.data?.avatar }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 200 / 2,
          }}
        />
        {isLoading ? (
          <Skelenton width={200} height={15} />
        ) : (
          <Text fontSize={25} fontWeight="600">
            {data?.data?.first_name} {data?.data?.last_name}
          </Text>
        )}
        {isLoading ? (
          <Skelenton width={200} height={15} />
        ) : (
          <Text fontSize={15} fontWeight="500">
            {data?.data?.email}
          </Text>
        )}
      </Box>
    </Screen>
  );
}

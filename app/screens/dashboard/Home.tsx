import { ActivityIndicator } from "@/app/components/base/activity-indicator";
import { Box } from "@/app/components/base/box";
import { Text } from "@/app/components/base/text";
import Skelenton from "@/app/components/Skeleton";
import { NAV_ROUTES } from "@/app/navigation/nav-routes";
import navigationService from "@/app/navigation/utils/navigationService";
import { getMode, setMode } from "@/app/redux_store/profile/profile-slice";
import { useGetUsers } from "@/app/services/hooks";
import { PERSIST_CONSTANTS } from "@/app/utils/constants";
import { secureItem } from "@/app/utils/helper-functions";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const DEVICE_WIDTH = Dimensions.get("screen").width;

export default function Home() {
  const dispatch = useDispatch();
  const { navigate, setOptions } = useNavigation();
  const mode = useSelector(getMode);
  const insets = useSafeAreaInsets();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    isLoading,
  } = useGetUsers();

  const users = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  useEffect(() => {
    if (status === "error") {
      Alert.alert(
        "",
        error?.response?.data?.error || "Network error, Please try again"
      );
    }
  }, [status]);

  const signOut = async () => {
    await secureItem(PERSIST_CONSTANTS.ACCESS_TOKEN, "null");
    navigationService.reset([{ name: NAV_ROUTES.LOGIN }]);
  };

  const headerLeft = useCallback(
    () => (
      <Pressable
        onPress={() => {
          Alert.alert(
            "Log out",
            "Are you sure",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                  signOut();
                },
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Ionicons name="power" size={20} color="#333232ff" />
      </Pressable>
    ),
    [signOut]
  );

  const headerRight = useCallback(
    () => (
      <Pressable
        onPress={() => {
          dispatch(setMode(mode === "light" ? "dark" : "light"));
        }}
      >
        {mode === "light" ? (
          <Ionicons name="moon" size={20} color={"#333332ff"} />
        ) : (
          <Ionicons name="sunny" size={20} color={"#333332ff"} />
        )}
      </Pressable>
    ),
    [mode]
  );

  useLayoutEffect(() => {
    setOptions({
      headerLeft,
      headerRight,
      headerShown: true,
      title: "People",
      headerTitleAlign: "center",
    });
  }, [headerLeft, setOptions, mode]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Pressable
          onPress={() => {
            navigate(NAV_ROUTES.DETAILS, { id: item.id });
          }}
          style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box flexDirection="row">
            <Image
              source={{ uri: item?.avatar }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <Box>
              <Text>
                {item?.first_name} {item?.last_name}
              </Text>
              <Text style={{ color: "gray" }}>{item?.email}</Text>
            </Box>
          </Box>
          <Ionicons name="chevron-forward" size={20} color="#8e8a8aff" />
        </Pressable>
      );
    },
    [users]
  );

  function onRefresh(): void {
    refetch();
  }

  return (
    <Box flex={1} backgroundColor="background">
      <FlatList
        data={users}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5} // fetch when scrolled halfway
        ListEmptyComponent={
          <Box rowGap="xl">
            <Skelenton height={60} width={DEVICE_WIDTH - 20} />
            <Skelenton height={60} width={DEVICE_WIDTH - 20} />
            <Skelenton height={60} width={DEVICE_WIDTH - 20} />
            <Skelenton height={60} width={DEVICE_WIDTH - 20} />
            <Skelenton height={60} width={DEVICE_WIDTH - 20} />
            <Skelenton height={60} width={DEVICE_WIDTH - 20} />
            <Skelenton height={60} width={DEVICE_WIDTH - 20} />
          </Box>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ margin: 10 }} />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </Box>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import Details from "../screens/dashboard/Details";
import Home from "../screens/dashboard/Home";
import Landing from "../screens/onboarding/Landing";
import Login from "../screens/onboarding/Login";
import Register from "../screens/onboarding/Register";
import { PERSIST_CONSTANTS } from "../utils/constants";
import { getSureItem } from "../utils/helper-functions";
import { NAV_ROUTES } from "./nav-routes";
import navigationService, { navigatorRef } from "./utils/navigationService";

export type RootNavigationRoutes = {
  LANDING: undefined;
  LOGIN: undefined;
  DASHBOARD: undefined;
  REGISTER: undefined;
};

const Stack = createNativeStackNavigator<RootNavigationRoutes>();

function Navigation() {
  const handlePrevAppState = async () => {
    const onboard = await getSureItem(PERSIST_CONSTANTS.ONBOARDED);
    const token = await getSureItem(PERSIST_CONSTANTS.ACCESS_TOKEN);

    if (token != "null") {
      navigationService.navigate(NAV_ROUTES.DASHBOARD);
    } else if (onboard == "true") {
      navigationService.navigate(NAV_ROUTES.LOGIN);
    } else {
      navigationService.navigate(NAV_ROUTES.LANDING);
    }
  };

  useEffect(() => {
    handlePrevAppState();
  }, []);

  return (
    <NavigationContainer ref={navigatorRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={Landing} name={NAV_ROUTES.LANDING} />
        <Stack.Screen component={Register} name={NAV_ROUTES.REGISTER} />
        <Stack.Screen component={Login} name={NAV_ROUTES.LOGIN} />
        <Stack.Screen component={Home} name={NAV_ROUTES.DASHBOARD} />
        <Stack.Screen component={Details} name={NAV_ROUTES.DETAILS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const RootNavigation = Navigation;

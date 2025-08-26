import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/dashboard/dashbaord";
import Landing from "../screens/onboarding/Landing";
import Login from "../screens/onboarding/Login";
import { NAV_ROUTES } from "./nav-routes";
import { navigatorRef } from "./utils/navigationService";

export type RootNavigationRoutes = {
  LANDING: undefined;
  LOGIN: undefined;
  DASHBOARD: undefined;
};

const Stack = createNativeStackNavigator<RootNavigationRoutes>();

function Navigation() {
  return (
    <NavigationContainer ref={navigatorRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={Landing} name={NAV_ROUTES.LANDING} />
        <Stack.Screen component={Login} name={NAV_ROUTES.LOGIN} />
        <Stack.Screen component={Dashboard} name={NAV_ROUTES.DASHBOARD} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const RootNavigation = Navigation;

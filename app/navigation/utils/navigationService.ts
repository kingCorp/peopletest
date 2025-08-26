import { StackParamsList } from "@/app/declarations/navigation";
import {
  CommonActions,
  createNavigationContainerRef,
  Route,
  StackActions,
} from "@react-navigation/native";

export const navigatorRef = createNavigationContainerRef();

function navigate<RouteName extends keyof StackParamsList>(
  ...args: RouteName extends unknown
    ? undefined extends StackParamsList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: StackParamsList[RouteName]]
      : [screen: RouteName, params: StackParamsList[RouteName]]
    : never
) {
  if (navigatorRef.isReady()) {
    navigatorRef.navigate(...args);
  }
}

function reset(
  routes: Array<{ name: string; params?: Omit<Route<string>, "key">[] }>,
  index = 1
) {
  navigatorRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    })
  );
}

function pop(n = 1) {
  const popAction = StackActions.pop(n);
  navigatorRef.current?.dispatch(popAction);
}

function getCurrentRoute() {
  return navigatorRef.current?.getCurrentRoute()?.name;
}

function popToTop() {
  navigatorRef.current?.dispatch(StackActions.popToTop());
}

export default {
  getCurrentRoute,
  navigate,
  pop,
  popToTop,
  reset,
};

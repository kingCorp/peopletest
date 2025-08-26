/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

import { useAppStart } from "./hooks/system";
import { RootNavigation } from "./navigation";
import { store } from "./redux_store/store";
import { QueryProvider } from "./services/queryClient";
import { ThemeProvider } from "./theme/theme-provider";

function App() {
  const hasAppLoaded = useAppStart();

  if (!hasAppLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <Provider store={store}>
          <ThemeProvider>
            <RootNavigation />
          </ThemeProvider>
        </Provider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}

export default App;

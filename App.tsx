import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "navigation/StackNavigator";
import { RootStoreProvider } from "store/rootStore";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <GestureHandlerRootView>
      <RootStoreProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </RootStoreProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

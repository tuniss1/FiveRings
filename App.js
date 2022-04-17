import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MainScreen from "screens/MainScreen";
import ItemScreen from "screens/ItemScreen";
import MapScreen from "screens/MapScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <View>
    // {/* <MapScreen /> */}
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          {/* <Stack.Screen name="Nail" component={NailScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    // </View>
  );
};

export default App;

import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NailScreen from "screens/NailScreen";

const App = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 10.3596469,
    longitude: 107.0968701,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <PaperProvider>
      <NailScreen />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default App;

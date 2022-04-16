import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Provider as PaperProvider } from "react-native-paper";

const App = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 10.3596469,
    longitude: 107.0968701,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <PaperProvider>
      <View style={styles.container}>
        <MapView style={styles.map} region={coordinates} />
      </View>
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

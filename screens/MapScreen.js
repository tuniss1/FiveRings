import { StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import React, { useState } from "react";

const MapScreen = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 10.3596469,
    longitude: 107.0968701,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * (Dimensions.get("window").width / 225),
  });
  return (
    <MapView initialRegion={coordinates} style={styles.mapContainer}></MapView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
});

export default MapScreen;

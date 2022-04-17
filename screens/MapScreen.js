import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import React, { useState, useCallback, useMemo, useRef } from "react";

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
  // container: {
  //   flex: 1,
  //   // padding: 24,
  //   backgroundColor: "grey",
  //   // height: "100%",
  // },
  // contentContainer: {
  //   // flex: 1,
  //   // alignItems: "center",
  //   position: "absolute",
  //   backgroundColor: "white",
  //   width: "100%",
  //   // height: 100,
  // },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
});

export default MapScreen;

import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { Title } from "react-native-paper";
import Item from "./Item";
import MapView, { Marker } from "react-native-maps";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const MIN_HEIGHT = 70;
const MAX_HEIGHT = Dimensions.get("window").height * 0.55;

const Home = ({ navigation, coords, itemList }) => {
  const coordinates = {
    ...coords,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * (Dimensions.get("window").width / 225),
  };

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [MIN_HEIGHT, MAX_HEIGHT], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <MapView initialRegion={coordinates} style={styles.mapContainer}>
        <Marker coordinate={coordinates}></Marker>
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ marginBottom: -16 }}>
          <View style={{ alignItems: "center", padding: 4 }}>
            <Title>List Items</Title>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#E7E7E5",
              opacity: 0.5,
            }}
          ></View>
          <FlatList
            data={itemList}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Item
                item={item}
                navigation={navigation}
                userCoords={coords}
                index={index}
              />
            )}
            style={{ height: "100%" }}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Home;

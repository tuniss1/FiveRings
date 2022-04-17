import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { IconButton } from "react-native-paper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";

import ItemCard from "components/ItemCard";
import PositionCard from "components/PositionCard";
import TrackingItemCard from "components/TrackingItemCard";
import StopTrackingItemCard from "components/StopTrackingItemCard";
import FindingItemCard from "components/FindingItemCard";
import StopFindingItemCard from "components/StopFindingItemCard";
import DeleteItemCard from "components/DeleteItemCard";

const region = {
  latitude: 10.3596469,
  longitude: 107.0968701,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const coordinate = {
  latitude: 10.3596469,
  longitude: 107.0968701,
};

const ItemScreen = ({ navigation }) => {
  // Setup BottomSheet:
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [isTracking, setIsTracking] = useState(false);
  const [isFinding, setIsFinding] = useState(false);

  // renders
  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapContainer}>
        <Marker coordinate={coordinate} />
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.bottomView}>
          <View style={styles.backIcon}>
            <IconButton
              size={26}
              icon="arrow-left-circle"
              style={styles.backIcon}
              color="#ffbd24"
              onPress={() => navigation.goBack()}
            />
          </View>
          <ItemCard itemName={"Item"} nailStatus={isTracking} />
          <PositionCard
            position={
              "268 Ly Thuong Kiet, Quan 10, Thanh pho Ho Chi Minh, Vietnam"
            }
          />
          {isTracking ? (
            <StopTrackingItemCard setIsTracking={setIsTracking} />
          ) : (
            <TrackingItemCard setIsTracking={setIsTracking} />
          )}
          {isTracking && !isFinding ? (
            <FindingItemCard setIsFinding={setIsFinding} />
          ) : null}
          {isTracking && isFinding ? (
            <StopFindingItemCard setIsFinding={setIsFinding} />
          ) : null}
          <DeleteItemCard />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  backIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bottomView: {
    paddingHorizontal: 20,
  },
});

export default ItemScreen;

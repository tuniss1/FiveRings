import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { Title } from "react-native-paper";
import Item from "./Item";
import TrackingNotification from "./TrackingNotification";
import MapView, { Marker } from "react-native-maps";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { useDispatch, useSelector } from "react-redux";
import { mapSettingSelector } from "reduxTKit/selectors";
import MapSettingSlice from "reduxTKit/reducers/MapSettingSlice";

const Home = ({ navigation, coords, itemList }) => {
  const [itemNotify, setItemNotify] = useState({});
  const [showNotify, setShowNotify] = useState(false);
  const [isInit, setIsInit] = useState(false);

  const mapSetting = useSelector(mapSettingSelector);
  const dispatch = useDispatch();

  const checkIsValid = () => mapSetting && mapSetting.latitude;

  // Setup BottomSheet:
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["8%", "60%", "80%"], []);

  const coordinates = {
    ...coords,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * (Dimensions.get("window").width / 225),
  };

  useEffect(() => {
    const handleNotify = () => {
      for (const item of itemList) {
        if (item && item.mode == 3) {
          setShowNotify(true);
          setItemNotify(item);
          break;
        }
      }
    };
    handleNotify();
  }, [itemList]);

  useEffect(() => {
    // console.log("coords");
    // console.log(JSON.stringify(coords));
    // console.log("map");
    // console.log(JSON.stringify(mapSetting));
    if (coords) {
      dispatch(MapSettingSlice.actions.updateMapSetting(coords));
    }
  }, [coords]);

  const handleRegionChangeComplete = (region) => {
    dispatch(MapSettingSlice.actions.updateMapSetting(region));
  };

  // renders
  return (
    <View style={styles.container}>
      {showNotify && (
        <TrackingNotification
          setShowNotify={setShowNotify}
          itemNotify={itemNotify}
        />
      )}
      {!showNotify && (
        <MapView
          region={mapSetting}
          style={styles.mapContainer}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {coords && <Marker coordinate={coordinates}></Marker>}
        </MapView>
      )}
      {!showNotify && (
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
          <BottomSheetView>
            <View style={{ alignItems: "center", padding: 4 }}>
              <Title>List Items</Title>
            </View>
            <View style={styles.separator} />
            <FlatList
              data={itemList}
              keyExtractor={(item, idx) => idx}
              renderItem={({ item, index }) => {
                if (!item) return;
                // console.log("item");
                // console.log(JSON.stringify(item));
                return (
                  // <></>
                  <Item
                    item={item}
                    navigation={navigation}
                    userCoords={coords}
                    index={index}
                  />
                );
              }}
            />
          </BottomSheetView>
        </BottomSheet>
      )}
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
  separator: {
    height: 1,
    backgroundColor: "#E7E7E5",
    opacity: 0.5,
  },
});

export default Home;

import React, { useMemo, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Title, Avatar } from "react-native-paper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import FormAddItem from "components/AddItemScreen/FormAddItem";
import { useSelector, useDispatch } from "react-redux";
import { mapSettingSelector, userSelector } from "reduxTKit/selectors";
import MapSettingSlice from "reduxTKit/reducers/MapSettingSlice";

const AddItemScreen = ({ navigation }) => {
  // Setup BottomSheet:
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["8%", "60%", "80%"], []);

  const mapSetting = useSelector(mapSettingSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const checkIsValid = () => mapSetting && mapSetting.latitude;

  const region = checkIsValid()
    ? mapSetting
    : {
        ...user.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01 * (Dimensions.get("window").width / 225),
      };

  const coordinate = {
    latitude: user.coords.latitude,
    longitude: user.coords.longitude,
  };

  const handleRegionChangeComplete = (region) => {
    dispatch(MapSettingSlice.actions.updateMapSetting(region));
  };

  // renders
  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.mapContainer}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        <Marker coordinate={coordinate} />
      </MapView>
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetView style={styles.bottomView}>
          <View style={{ alignItems: "center", padding: 4 }}>
            <Title>Add Item</Title>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#E7E7E5",
              opacity: 0.5,
            }}
          />
          <View style={styles.imgWrapper}>
            <Avatar.Image
              size={90}
              source={require("assets/item-icon.jpg")}
              style={styles.itemImg}
            />
          </View>
          <FormAddItem />
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
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  imgWrapper: {
    paddingVertical: 15,
    alignItems: "center",
  },
  itemImg: {
    backgroundColor: "#ffffff",
    borderColor: "#CCCDC6",
    borderWidth: 1,
  },
});

export default AddItemScreen;

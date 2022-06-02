import React, { useState, useMemo, useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Title, Snackbar } from "react-native-paper";
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

  // Setup snackbar for add item:
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

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
            <Image
              source={require("assets/item-icon.png")}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <FormAddItem onToggleSnackBar={onToggleSnackBar} />
        </BottomSheetView>
      </BottomSheet>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => onToggleSnackBar(),
        }}
      >
        Adding new item successfully!
      </Snackbar>
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
    alignItems: "center",
  },
  itemImg: {
    backgroundColor: "#ffffff",
    borderColor: "#CCCDC6",
    borderWidth: 1,
  },
});

export default AddItemScreen;

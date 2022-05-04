import Home from "components/HomeScreen";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { itemListSelector, userSelector } from "reduxTKit/selectors";
import UserSlice from "reduxTKit/reducers/UserSlice";
import ItemsSlice from "reduxTKit/reducers/ItemsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GOOGLE_MAPS_APIKEY = "AIzaSyAPpibb8QB3CR0B2m5ZBkBrRS75YluhNi8";

const HomeScreen = ({ navigation }) => {
  const db = getDatabase();
  const dataRef = ref(db, "user/nam/sensor");
  const user = useSelector(userSelector);
  const itemList = useSelector(itemListSelector);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserLocation = async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      try {
        const value = await AsyncStorage.getItem("userCoords");
        console.log("Getting user coordinate ...");
        console.log(value);
        if (value !== null) {
          // value previously stored
          const storageValue = JSON.parse(value);

          if (
            storageValue.coords.latitude != location.coords.latitude ||
            storageValue.coords.longitude != loading.coords.longitude
          ) {
            dispatch(UserSlice.actions.updateUserLocation(storageValue));
          }
        } else {
          try {
            console.log("Setting user coordinate");
            await AsyncStorage.setItem("userCoords", JSON.stringify(location));
          } catch (e) {
            console.log("Fail to set user coordinate");
          }
          dispatch(UserSlice.actions.updateUserLocation(location));
        }
      } catch (e) {
        // error reading value
        console.log("Fail to get user coordinate");
        try {
          console.log("Setting user coordinate");
          await AsyncStorage.setItem("userCoords", JSON.stringify(location));
        } catch (e) {
          console.log("Fail to set user coordinate");
        }
        dispatch(UserSlice.actions.updateUserLocation(location));
      }
      setLoading(false);
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      let data = snapshot.val();
      data = data.filter((item) => item != undefined);
      const origin = user.coords;
      if (!origin) dispatch(ItemsSlice.actions.fetchItem(data));
      else {
        dispatch(ItemsSlice.actions.resetState());
        data.map(async (item) => {
          const destination = { latitude: item.lat, longitude: item.lng };
          const mode = "driving";
          const url =
            "https://maps.googleapis.com/maps/api/distancematrix/json?" +
            "destinations=" +
            destination.latitude +
            "," +
            destination.longitude +
            "&mode=" +
            mode +
            "&origins=" +
            origin.latitude +
            "," +
            origin.longitude +
            "&key=" +
            GOOGLE_MAPS_APIKEY;
          const response = await fetch(url)
            .then((res) => res.json())
            .then((data) => data);
          if (
            response.status == "OK" &&
            response.rows[0].elements[0].status == "OK"
          ) {
            console.log("Success getting location and distance.");
            dispatch(
              ItemsSlice.actions.addItem({
                ...item,
                distance: response.rows[0].elements[0].distance,
                latestLocation: response.destination_addresses[0],
              })
            );
          } else {
            console.log("Fail to get location and distance.");
            dispatch(ItemsSlice.actions.addItem({ ...item }));
          }
        });
      }
    });
  }, [user]);

  if (loading) return <Text>Loading</Text>;

  return (
    <Home navigation={navigation} coords={user.coords} itemList={itemList} />
  );
};

export default HomeScreen;

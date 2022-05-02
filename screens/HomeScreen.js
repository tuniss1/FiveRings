import Home from "components/HomeScreen";
import { getDatabase, onValue, ref, update, push } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { itemListSelector, userSelector } from "reduxTKit/selectors";
import UserSlice from "reduxTKit/reducers/UserSlice";
import ItemsSlice from "reduxTKit/reducers/ItemsSlice";
import { getLatLng } from "firebases/realtimeApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GOOGLE_MAPS_APIKEY = "AIzaSyAPpibb8QB3CR0B2m5ZBkBrRS75YluhNi8";

const HomeScreen = ({ navigation }) => {
  const user = useSelector(userSelector);
  const itemList = useSelector(itemListSelector);
  const dispatch = useDispatch();
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
        console.log("get user");
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
            await AsyncStorage.setItem(
              "userCoords",
              JSON.stringify(location.coords)
            );
            console.log("set user");
          } catch (e) {
            console.log("set user error");
          }
          dispatch(UserSlice.actions.updateUserLocation(location));
        }
      } catch (e) {
        // error reading value
        console.log("get user error");
      }

      setLoading(false);
    };
    getUserLocation();
  }, []);

  const database = getDatabase();
  const dataRef = ref(database, "user/nam/sensor");

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      // setLoading(true)
      const data = snapshot.val();

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
            .then((data) => {
              // console.log("fetch data");
              // console.log(data);
              return data;
            });
          if (
            response.status == "OK" &&
            response.rows[0].elements[0].status == "OK"
          ) {
            console.log("OK");
            dispatch(
              ItemsSlice.actions.addItem({
                ...item,
                distance: response.rows[0].elements[0].distance,
                latestLocation: response.destination_addresses[0],
              })
            );
          } else {
            console.log("NO OK");
            dispatch(ItemsSlice.actions.addItem({ ...item }));
          }
        });
      }
      // dispatch(
      //   ItemsSlice.actions.fetchItem({ items: data, userCoords: user.coords })
      // );
      // console.log("data");
      // console.log(data);
    });
  }, [user]);

  if (loading) return <Text>Loading</Text>;
  console.log("item list");
  console.log(itemList);
  return (
    <Home navigation={navigation} coords={user.coords} itemList={itemList} />
    // <View>
    //   <Text>Home Screen</Text>
    // </View>
  );
};

export default HomeScreen;

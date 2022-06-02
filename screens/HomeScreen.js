import Home from "components/HomeScreen";
import {
  getDatabase,
  onChildAdded,
  onValue,
  ref,
  get,
  onChildChanged,
  off,
} from "firebase/database";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { itemListSelector, userSelector } from "reduxTKit/selectors";
import UserSlice from "reduxTKit/reducers/UserSlice";
import ItemsSlice from "reduxTKit/reducers/ItemsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GOOGLE_MAPS_APIKEY = "AIzaSyDQHtaJFr0YC9d35d95TBw5IrglHr1ryg8";

const HomeScreen = ({ navigation }) => {
  const db = getDatabase();
  const dataRef = ref(db, "user/nam/sensor");
  const user = useSelector(userSelector);
  const itemList = useSelector(itemListSelector);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const getUserLocation = async () => {
      // setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Denied");
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        const value = await AsyncStorage.getItem("userCoords");
        console.log("Getting user coordinate ...");
        console.log(value);
        if (value !== null) {
          // value previously stored
          const storageValue = JSON.parse(value);
          dispatch(UserSlice.actions.updateUserLocation(storageValue));
          let location = await Location.getCurrentPositionAsync({});

          if (
            storageValue.coords.latitude != location.coords.latitude ||
            storageValue.coords.longitude != loading.coords.longitude
          ) {
            dispatch(UserSlice.actions.updateUserLocation(location));
          }
        } else {
          let location = await Location.getCurrentPositionAsync({});

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
        let location = await Location.getCurrentPositionAsync({});

        try {
          console.log("Setting user coordinate");
          await AsyncStorage.setItem("userCoords", JSON.stringify(location));
        } catch (e) {
          console.log("Fail to set user coordinate");
        }

        dispatch(UserSlice.actions.updateUserLocation(location));
      }

      // setLoading(false);
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    // onValue(dataRef, (snapshot) => {
    //   snapshot.forEach((data) => {});
    //   snapshot.forEach((data) => {
    //     console.log("data");
    //     console.log(JSON.stringify(data.val()));
    //   });

    //   // let data = snapshot.val();
    //   // console.log(JSON.stringify(data));
    //   // const origin = user.coords;
    //   // dispatch(ItemsSlice.actions.fetchItem([]));
    //   // if (!origin) dispatch(ItemsSlice.actions.fetchItem(data));
    //   // else {
    //   //   data.map(async (item) => {
    //   //     if (!item) return;

    //   //     // let temp = null;
    //   //     // itemList.map((item) => {
    //   //     //   if (item.id == data.val().id) {
    //   //     //     if (item.lat != data.val().lat || item.lng != data.lng)
    //   //     //       temp = { ...item };
    //   //     //   }
    //   //     // });

    //   //     console.log("item");
    //   //     console.log(JSON.stringify(item));
    //   //     const destination = { latitude: item.lat, longitude: item.lng };
    //   //     const mode = "driving";
    //   //     const url =
    //   //       "https://maps.googleapis.com/maps/api/distancematrix/json?" +
    //   //       "destinations=" +
    //   //       destination.latitude +
    //   //       "," +
    //   //       destination.longitude +
    //   //       "&mode=" +
    //   //       mode +
    //   //       "&origins=" +
    //   //       origin.latitude +
    //   //       "," +
    //   //       origin.longitude +
    //   //       "&key=" +
    //   //       GOOGLE_MAPS_APIKEY;
    //   //     const response = await fetch(url)
    //   //       .then((res) => res.json())
    //   //       .then((data) => data);
    //   //     if (
    //   //       response.status == "OK" &&
    //   //       response.rows[0].elements[0].status == "OK"
    //   //     ) {
    //   //       console.log("Success getting location and distance.");
    //   //       dispatch(
    //   //         ItemsSlice.actions.addItem({
    //   //           ...item,
    //   //           distance: response.rows[0].elements[0].distance,
    //   //           latestLocation: response.destination_addresses[0],
    //   //         })
    //   //       );
    //   //     } else {
    //   //       console.log("Fail to get location and distance.");
    //   //       dispatch(
    //   //         ItemsSlice.actions.addItem({
    //   //           ...item,
    //   //         })
    //   //       );
    //   //     }
    //   //   });

    //   // dispatch(ItemsSlice.actions.fetchItem(temp));

    //   // setIsInit(false);
    //   // }
    // });

    onChildAdded(dataRef, async (data) => {
      let temp = null;
      console.log("add");
      console.log(JSON.stringify(data.val()));
      itemList.map((item) => {
        if (item.id == data.val().id) {
          if (item.lat != data.val().lat || item.lng != data.lng)
            temp = { ...item };
        }
      });

      if (!temp) {
        const item = data.val();
        const origin = user.coords;
        if (!origin) return;

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
          .then((res) => res);

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
          dispatch(ItemsSlice.actions.addItem(item));
        }
        // dispatch(ItemsSlice.actions.addItem(data.val()));
      }
    });

    onChildChanged(dataRef, async (data) => {
      let temp = null;
      itemList.map((item) => {
        if (item.id == data.val().id) {
          if (item.lat != data.val().lat || item.lng != data.lng)
            temp = { ...item };
        }
      });

      if (temp) {
        const item = data.val();
        const origin = user.coords;
        if (!origin) return;

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
          .then((res) => res);

        if (
          response.status == "OK" &&
          response.rows[0].elements[0].status == "OK"
        ) {
          console.log("Success getting location and distance.");
          dispatch(
            ItemsSlice.actions.updateItem({
              ...item,
              distance: response.rows[0].elements[0].distance,
              latestLocation: response.destination_addresses[0],
            })
          );
        } else {
          console.log("Fail to get location and distance.");
          dispatch(ItemsSlice.actions.updateItem(item));
        }
      }
    });
  }, [user]);

  // if (loading) return <Text>Loading</Text>;

  return (
    <Home navigation={navigation} coords={user.coords} itemList={itemList} />
  );
};

export default HomeScreen;

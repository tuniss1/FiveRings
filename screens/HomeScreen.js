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

const HomeScreen = ({ navigation }) => {
  const user = useSelector(userSelector);
  const itemList = useSelector(itemListSelector);
  const dispatch = useDispatch();
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(UserSlice.actions.updateUserLocation(location));
    };
    if (!user.coords) getUserLocation();
  }, []);

  const database = getDatabase();
  const dataRef = ref(database, "user/nam/sensor");

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      // dispatch(ItemsSlice.actions.fetchItem(data));
      console.log(data);
    });

    // const fetchUserItems = async () => {

    //   // const CLONE = [
    //   //   {
    //   //     id: 1,
    //   //     name: "Item 1",
    //   //     address: "229 Andrew Dr Manning, South Carolina(SC), 29102",
    //   //     imgUrl: "",
    //   //     latestLocation: "229 Andrew Dr Manning, South Carolina(SC), 29102",
    //   //     lng: 106.4150392,
    //   //     lat: 10.7546664,
    //   //     mode: 0,
    //   //   },
    //   //   {
    //   //     id: 2,
    //   //     name: "Item 2",
    //   //     address: "229 Andrew Dr Manning, South Carolina(SC), 29102",
    //   //     lng: 106.789,
    //   //     imgUrl: "",
    //   //     latestLocation: "229 Andrew Dr Manning, South Carolina(SC), 29102",
    //   //     lat: 10.459,
    //   //     mode: 1,
    //   //   },
    //   //   {
    //   //     id: 3,
    //   //     name: "Item 3",
    //   //     address: "229 Andrew Dr Manning, South Carolina(SC), 29102",
    //   //     lng: 106.789,
    //   //     imgUrl: "",
    //   //     latestLocation: "229 Andrew Dr Manning, South Carolina(SC), 29102",
    //   //     lat: 10.459,
    //   //     mode: 2,
    //   //   },
    //   // ];
    // };
    // fetchUserItems();
    // console.log(itemList);
  }, [dataRef]);

  // if (!user.coords) return <Text>Loading</Text>;

  return (
    // <Home navigation={navigation} coords={user.coords} itemList={itemList} />
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

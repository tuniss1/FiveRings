import Home from "components/HomeScreen";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!location) return <Text>Loading</Text>;

  return <Home navigation={navigation} coords={location.coords} />;
};

export default HomeScreen;

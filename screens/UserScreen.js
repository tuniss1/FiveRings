import React, {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  
} from "react-native";
import { Title,Button } from "react-native-paper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import FormAddItem from "components/AddItemScreen/FormAddItem";
import { getUserInfo, getCurrentUser,signOutFunction } from "firebases/firestoreApi";
import { Formik } from "formik";

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
const UserScreen = ({ navigation }) => {
  // Setup BottomSheet:
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["4%", "75%"], []);
  const [text, onChangeText] = useState("Useless Text");
  const [currUser, onSetCurrUser] = useState("");
  // renders
  //console.log(":hello");
  useEffect(() => {
    const data = async () => {
      await getCurrentUser().then((data) => {
        onSetCurrUser(data);
      });
    };

    data();
  }, []);
  console.log(currUser)
  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapContainer}>
        <Marker coordinate={coordinate} />
      </MapView>

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetView style={styles.bottomView}>
          <View style={{ alignItems: "center", padding: 4 }}>
            <Title style={{ color: "blue" }}>Personal Information</Title>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ marginBottom: 8 }}>
              <Text>User name</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                onChangeText={onChangeText}
                value={currUser.username}
                outlineColor="#289cb4"
              />
            </View>

            <View style={{ marginBottom: 8 }}>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                onChangeText={onChangeText}
                value={currUser.email}
                outlineColor="#289cb4"
              />
            </View>

            <View style={{ marginBottom: 8 }}>
              <Text>User Id</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                onChangeText={onChangeText}
                value={currUser.userId}
                outlineColor="#289cb4"
              />
            </View>

            <Button
              mode="contained"
              onPress={()=>{console.log("hello khoa")}}
              style={{ 
                paddingVertical: 5,
                marginTop:100,
                paddingHorizontal: 20
              }}
            >
              Sign Out
            </Button>
          </View>
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
    // borderColor: "#289cb4",
    // borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#289cb4",
  },
  bottomView: {
    borderColor: "#289cb4",
    borderWidth: 1,
    flex: 1,
    // justifyContent: 'flex-end',
    marginBottom: 10,
    marginVertical: 20
  }
});

export default UserScreen;

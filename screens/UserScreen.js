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
import {
  Title,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import FormAddItem from "components/AddItemScreen/FormAddItem";
import {
  getUserInfo,
  getCurrentUser,
  signOutFunction,
} from "firebases/firestoreApi";
import { Formik } from "formik";
import ItemImagePicker from "components/AddItemScreen/ItemImagePicker";

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
  const snapPoints = useMemo(() => ["8%", "60%", "80%"], []);

  const [text, onChangeText] = useState("Useless Text");
  const [currUser, setCurrUser] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  // renders
  //console.log(":hello");
  useEffect(() => {
    const getUserInfo = async () => {
      await getCurrentUser().then((data) => {
        setCurrUser(data);
        setUserAvatar(data.userAvatar);
        bottomSheetRef.current.snapToIndex(0);
      });
    };
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapContainer}>
        <Marker coordinate={coordinate} />
      </MapView>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetView style={styles.bottomView}>
          <View style={{ alignItems: "center", padding: 4 }}>
            <Title>Personal Information</Title>
          </View>
          <View style={styles.separator} />
          <ItemImagePicker
            image={userAvatar}
            setImage={setUserAvatar}
            uid={currUser.userId}
          />
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ marginBottom: 8 }}>
              <Text>Username:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                onChangeText={onChangeText}
                value={currUser.username}
                outlineColor="#289cb4"
              />
            </View>

            <View style={{ marginBottom: 8 }}>
              <Text>Email:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                onChangeText={onChangeText}
                value={currUser.email}
                outlineColor="#289cb4"
              />
            </View>

            <View style={{ marginBottom: 8 }}>
              <Text>UID:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                onChangeText={onChangeText}
                value={currUser.userId}
                outlineColor="#289cb4"
              />
            </View>
            <View>
              <Button
                onPress={showDialog}
                mode="contained"
                style={{
                  paddingVertical: 3,
                  marginHorizontal: 10,
                  marginTop: 50,
                }}
              >
                Sign Out
              </Button>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Do you want to log out</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>
                      This is close all connection of your items
                    </Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      onPress={() => {
                        signOutFunction();
                      }}
                    >
                      Done
                    </Button>
                    <Button
                      style={{
                        color: "#289cb4",
                      }}
                      onPress={hideDialog}
                    >
                      Cancel
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
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
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#E7E7E5",
    opacity: 0.5,
  },
});

export default UserScreen;

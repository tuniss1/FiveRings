import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { List } from "react-native-paper";

const Item = ({ item, navigation, userCoords, index }) => {
  // renders
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Item", {
          id: item.id,
          name: item.name,
          itemCoords: {
            latitude: item.lat,
            longitude: item.lng,
          },
          mode: item.mode,
          latestLocation: item.latestLocation,
          userCoords: userCoords,
        })
      }
    >
      <List.Item
        title={item.name}
        description={item.latestLocation}
        left={() => (
          <Image
            source={require("assets/item-icon.png")}
            style={{ width: 60 }}
          />
        )}
        right={() => (
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              width: 100,
            }}
          >
            <View
              style={{
                padding: 4,
                backgroundColor: "#F9F9F9",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
              }}
            >
              {item.mode == 0 ? (
                <Text style={styles.red}>Not nail</Text>
              ) : (
                <Text style={styles.green}>Nail items</Text>
              )}
            </View>
          </View>
        )}
      />
      <View
        style={{
          marginLeft: 65,
          height: 1,
          backgroundColor: "#E7E7E5",
          opacity: 0.5,
        }}
      ></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
  },
  green: {
    color: "#67DA95",
    lineHeight: 13,
    fontSize: 13,
  },
  red: {
    color: "#DA6E67",
    lineHeight: 13,
    fontSize: 13,
  },
});

export default Item;

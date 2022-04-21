import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Title, List } from "react-native-paper";

const Item = ({
  id,
  name,
  address,
  status,
  navigation,
  lat,
  lng,
  userCoords,
}) => {
  // renders
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Item", {
          id: id,
          name: name,
          status: status,
          address: address,
          itemCoords: {
            latitude: lat,
            longitude: lng,
          },
          userCoords: userCoords,
        })
      }
    >
      <List.Item
        title={name}
        description={address}
        left={() => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
            }}
          >
            <List.Icon
              icon="devices"
              style={{ backgroundColor: "#FFE8E8", borderRadius: 30 }}
              color="#1674B3"
            />
          </View>
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
              {status == 0 ? (
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

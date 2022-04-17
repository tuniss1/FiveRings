import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Title, List } from "react-native-paper";
// import BottomSheet from "@gorhom/bottom-sheet";

const Item = ({ name, address, status }) => {
  // renders
  return (
    <TouchableOpacity>
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
              icon="key"
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
              ) : status == 1 ? (
                <Text style={styles.green}>With you</Text>
              ) : (
                <Text style={styles.green}>Nail items</Text>
              )}
            </View>
          </View>
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: "grey",
    // height: "100%",
  },
  contentContainer: {
    // flex: 1,
    // alignItems: "center",
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    // height: 100,
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

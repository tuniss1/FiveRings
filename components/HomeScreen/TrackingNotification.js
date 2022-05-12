import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Title, Button, Surface } from "react-native-paper";
import { updateControl } from "firebases/realtimeApi";

const TrackingNotification = ({ setShowNotify, itemNotify }) => {
  const handleIgnore = () => {
    setShowNotify(false);
    updateControl({
      id: itemNotify.id,
      mode: 0,
    });
  };

  const handleEnable = () => {
    setShowNotify(false);
    updateControl({
      id: itemNotify.id,
      mode: 2,
    });
  };

  return (
    <View style={styles.modalContainer}>
      <Surface style={styles.cardStyle}>
        <View style={styles.imgWrapper}>
          <Image
            source={require("assets/warning.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Title style={styles.textStyle}>Warning!</Title>
          <Text
            style={styles.textStyle}
          >{`Your item: ${itemNotify.name} can be lost.`}</Text>
          <Text style={styles.textStyle}>
            Do you want to enable finding mode ?
          </Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Button
              mode="contained"
              color="#f85454"
              style={{ marginHorizontal: 10 }}
              onPress={handleEnable}
            >
              <Text style={{ color: "#ffffff" }}>Enable</Text>
            </Button>
            <Button
              mode="contained"
              color="#ffffff"
              style={{ marginHorizontal: 10 }}
              onPress={handleIgnore}
            >
              <Text style={{ color: "#f85454" }}>Ignore</Text>
            </Button>
          </View>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 2,
  },
  cardStyle: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  imgWrapper: {
    backgroundColor: "#f85454",
    alignItems: "center",
    paddingVertical: 10,
  },
  textStyle: {
    marginBottom: 5,
  },
});

export default TrackingNotification;

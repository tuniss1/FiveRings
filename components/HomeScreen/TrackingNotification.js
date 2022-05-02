import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Title, Portal, Modal, Button } from "react-native-paper";

const TrackingNotification = ({ showNotify, setShowNotify, setIndex }) => {
  const hideModal = () => {
    setShowNotify(false);
    setIndex(0);
  };

  return (
    <Portal>
      <Modal
        visible={showNotify}
        onDismiss={hideModal}
        style={styles.modalContainer}
      >
        <View
          style={{
            backgroundColor: "#f85454",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Image
            source={require("assets/warning.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Title style={{ marginBottom: 5 }}>Warning!</Title>
          <Text style={{ marginBottom: 5 }}>Your item can be lost.</Text>
          <Text style={{ marginBottom: 20 }}>
            Do you want to enable finding mode ?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              mode="contained"
              color="#f85454"
              style={{ marginHorizontal: 10 }}
            >
              <Text style={{ color: "white" }}>Enable</Text>
            </Button>
            <Button
              mode="contained"
              color="white"
              style={{ marginHorizontal: 10 }}
              onPress={hideModal}
            >
              <Text style={{ color: "#f85454" }}>Ignore</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },
});

export default TrackingNotification;

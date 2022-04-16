import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-paper";

const TrackingItemCard = ({ setIsTracking }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setIsTracking(true)}>
      <View style={styles.container}>
        <Avatar.Icon
          size={24}
          icon="navigation"
          style={styles.icon}
          color="#ffffff"
        />
        <Text style={styles.action}>Start tracking item's position</Text>
        <Text style={styles.status}>Off</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#F1FFF7",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },

  icon: {
    backgroundColor: "#67DA95",
    marginBottom: 5,
  },
  action: {
    fontWeight: "700",
    lineHeight: 20,
  },
  status: {
    color: "#767272",
  },
});

export default TrackingItemCard;

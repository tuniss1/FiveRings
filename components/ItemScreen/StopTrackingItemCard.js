import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-paper";

const StopTrackingItemCard = ({ setIsTracking }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setIsTracking(false)}>
      <View style={styles.container}>
        <Avatar.Icon
          size={24}
          icon="bell-off"
          style={styles.icon}
          color="#ffffff"
        />
        <Text style={styles.action}>Stop tracking item's position</Text>
        <Text style={styles.status}>Processing...</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#FFEBEB",
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
    backgroundColor: "#F16C6C",
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

export default StopTrackingItemCard;

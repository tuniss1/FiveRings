import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-paper";

const FindingItemCard = ({ setIsFinding }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setIsFinding(true)}>
      <View style={styles.container}>
        <Avatar.Icon
          size={24}
          icon="play"
          style={styles.icon}
          color="#ffffff"
        />
        <Text style={styles.action}>Start finding item</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#F1F5FB",
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
    backgroundColor: "#3F63DB",
    marginBottom: 5,
  },
  action: {
    fontWeight: "700",
    lineHeight: 20,
  },
});

export default FindingItemCard;

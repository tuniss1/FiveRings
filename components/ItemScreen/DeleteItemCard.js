import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const DeleteItemCard = () => {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={24} icon="close" style={styles.icon} color="#ffffff" />
      <Text style={styles.action}>Delete item</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#F4F4F4",
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
    backgroundColor: "#C4C4C4",
    marginBottom: 5,
  },
  action: {
    color: "#FF0000",
    fontWeight: "700",
    lineHeight: 20,
  },
});

export default DeleteItemCard;

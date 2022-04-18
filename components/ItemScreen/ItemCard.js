import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const ItemCard = ({ itemName, nailStatus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Avatar.Image source={require("assets/item-icon.jpg")} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.nameText}>{itemName}</Text>
        <Text style={nailStatus ? styles.nailText : styles.notNailText}>
          {nailStatus ? "Nailing" : "Not nail"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatarWrapper: {
    marginRight: 10,
  },
  infoWrapper: {
    flexDirection: "column",
  },
  nameText: {
    color: "#565454",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 5,
  },
  nailText: {
    color: "#67DA95",
    fontSize: 12,
    backgroundColor: "#f9f9f9",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: "600",
  },
  notNailText: {
    color: "#DA6E67",
    fontSize: 12,
    backgroundColor: "#f9f9f9",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: "600",
  },
});

export default ItemCard;

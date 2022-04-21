import { View, Text, StyleSheet } from "react-native";

const PositionCard = ({ position, distance }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Latest position{distance ? ` (${distance})` : ""}:{" "}
      </Text>
      <Text style={styles.desc}>{position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: "#767272",
    fontWeight: "700",
  },
  desc: {
    color: "#767272",
    letterSpacing: 0.5,
    lineHeight: 20,
  },
});

export default PositionCard;

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { IconButton, Button } from "react-native-paper";
import SignUp from "components/Authentication/SignUp";

const SignUpScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-start", marginTop: 50, marginLeft: 10 }}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => {
            navigation.goBack();
          }}
          color="#00A2B6"
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 6 }}>
          Let's Get Started!
        </Text>
        <Text style={{ color: "#909090" }}>
          Create an account to FiveRings to experience our features
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        <SignUp navigation={navigation} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
        <Button
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          labelStyle={{ fontWeight: "bold" }}
        >
          Sign in
        </Button>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

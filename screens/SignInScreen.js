import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import SignIn from "components/Authentication/SignIn";
import { Button, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = ({ navigation, route }) => {
  const [visibleNotify, setVisibleNotify] = useState(false);

  useEffect(() => {
    if (route.params) setVisibleNotify(route.params?.resetPasswordStatus);
  }, [route.params]);

  const onDismissSnackBar = () => setVisibleNotify(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={{ marginBottom: "20%" }}>
          <Image
            source={require("assets/icon-image.png")}
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginBottom: 20,
              height: 100,
              width: 100,
            }}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 6,
              }}
            >
              Welcome to FiveRings
            </Text>
            <Text style={{ color: "#909090" }}>
              Log in to your existant account of FiveRings
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <SignIn navigation={navigation} />
          <View style={{ height: 20 }}></View>
        </View>
        <View style={{ height: 70 }}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
          <Button
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            labelStyle={{ fontWeight: "bold" }}
          >
            Sign up
          </Button>
        </View>
      </View>
      <Snackbar
        visible={visibleNotify}
        duration={1000}
        onDismiss={onDismissSnackBar}
        style={{ height: 55 }}
      >
        <Text style={{ fontSize: 16 }}>
          Reset password email has been sent!
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default SignInScreen;

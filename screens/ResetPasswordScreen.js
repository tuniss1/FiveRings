import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TextInput, HelperText, Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordScreen = ({ navigation, route }) => {
  const [parentRoute, setParentRoute] = useState("");
  const auth = getAuth();

  useEffect(() => {
    if (route.params) {
      setParentRoute(route.params.parentRoute);
    }
  }, [route]);

  const emailSchema = Yup.object({
    email: Yup.string()
      .email("It must be a valid email.")
      .required("Email is a required field."),
  });

  return (
    <SafeAreaView>
      <View style={{ alignItems: "flex-start" }}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => {
            navigation.goBack();
          }}
          color="#00A2B6"
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 6,
          }}
        >
          Reset your password
        </Text>
        <Text style={{ color: "#909090" }}>
          Fill your registered email then check your mailbox
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Formik
          initialValues={{
            email: "",
          }}
          initialTouched={{
            email: false,
          }}
          validationSchema={emailSchema}
          onSubmit={(values, actions) => {
            sendPasswordResetEmail(auth, values.email)
              .then(() => {
                // Pasword reset email sent!
                actions.setSubmitting(false);
                navigation.navigate(parentRoute, {
                  resetPasswordStatus: true,
                });
              })
              .catch((errors) => {
                console.log(errors);
              });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => {
            return (
              <>
                <View>
                  <TextInput
                    label="Email"
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  <HelperText
                    type="error"
                    padding="none"
                    visible={touched.email && errors.email !== undefined}
                  >
                    {errors.email}
                  </HelperText>
                </View>

                <View>
                  <Button
                    mode="contained"
                    style={{ padding: 2 }}
                    labelStyle={{ fontSize: 16 }}
                    onPress={handleSubmit}
                  >
                    Submit
                  </Button>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

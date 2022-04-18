import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

// Firebase:
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const auth = getAuth();

  const userSchema = Yup.object({
    email: Yup.string()
      .email("It must be a valid email.")
      .required("Email is a required field."),
    password: Yup.string().required("Password is a required field."),
  });

  const handleSignIn = async (values, actions) => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        console.log("User has signed in successful!");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          actions.setErrors({
            email: "The signed in email is incorrect.",
          });
        } else if (error.code == "auth/wrong-password") {
          actions.setErrors({
            password: "The password is incorrect.",
          });
        }
        console.log(error);
      });
  };

  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        initialTouched={{
          email: false,
          password: false,
        }}
        validationSchema={userSchema}
        onSubmit={(values, actions) => {
          handleSignIn(values, actions);
          actions.setSubmitting(false);
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
                <TextInput
                  label="Password"
                  mode="outlined"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry={secureTextEntry}
                  right={
                    <TextInput.Icon
                      name="eye"
                      onPress={() => {
                        setSecureTextEntry(!secureTextEntry);
                      }}
                    />
                  }
                />
                <HelperText
                  type="error"
                  padding="none"
                  visible={touched.password && errors.password !== undefined}
                >
                  {errors.password}
                </HelperText>
              </View>
              <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("ResetPassword", {
                      parentRoute: "SignIn",
                    })
                  }
                >
                  <Text>Forgot Password?</Text>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <Button
                  mode="contained"
                  style={{ padding: 2 }}
                  labelStyle={{ fontSize: 16 }}
                  onPress={handleSubmit}
                >
                  Sign In
                </Button>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignIn;

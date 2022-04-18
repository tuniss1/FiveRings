import React from "react";
import { View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

// Firebase:
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { createNewUser } from "firebases/firestoreApi";

const SignUp = ({ navigation }) => {
  const auth = getAuth();

  const userSchema = Yup.object({
    name: Yup.string().required("Username is a required field."),
    email: Yup.string()
      .email("It must be a valid email.")
      .required("Email is a required field."),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number."
      )
      .required("Password is a required field."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "The password confirmation does not match.")
      .required("Confirm Password is a required field."),
  });

  const handleSignUp = async (values, actions) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        createNewUser({ ...values, userId: user.uid });
        navigation.navigate("Main");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          actions.setErrors({
            email: "That email address is already in use!",
          });
        }
        console.log(error);
      });
  };

  return (
    <View>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        initialTouched={{
          name: false,
          email: false,
          password: false,
          confirmPassword: false,
        }}
        validationSchema={userSchema}
        onSubmit={(values, actions) => {
          handleSignUp(values, actions);
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
                  label="Name"
                  mode="outlined"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  left={<TextInput.Icon name="account" color="#00A2B6" />}
                />
                <HelperText
                  type="error"
                  padding="none"
                  visible={touched.name && errors.name !== undefined}
                >
                  {errors.name}
                </HelperText>
              </View>

              <View>
                <TextInput
                  label="Email"
                  mode="outlined"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  left={<TextInput.Icon name="email" color="#00A2B6" />}
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
                  left={<TextInput.Icon name="lock" color="#00A2B6" />}
                  secureTextEntry={true}
                />
                <HelperText
                  type="error"
                  padding="none"
                  visible={touched.password && errors.password !== undefined}
                >
                  {errors.password}
                </HelperText>
              </View>

              <View style={{ marginBottom: 30 }}>
                <TextInput
                  label="Confirm Password"
                  mode="outlined"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  left={<TextInput.Icon name="lock-check" color="#00A2B6" />}
                  secureTextEntry={true}
                />
                <HelperText
                  type="error"
                  padding="none"
                  visible={
                    touched.confirmPassword &&
                    errors.confirmPassword !== undefined
                  }
                >
                  {errors.confirmPassword}
                </HelperText>
              </View>

              <Button
                mode="contained"
                labelStyle={{ fontSize: 16 }}
                style={{ padding: 2, marginBottom: 50 }}
                onPress={handleSubmit}
              >
                Create
              </Button>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignUp;

import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import ItemImagePicker from "./ItemImagePicker";

const FormAddItem = () => {
  const [image, setImage] = useState(null);

  const itemSchema = Yup.object({
    itemName: Yup.string().required("Item's name is a required field."),
    itemId: Yup.string()
      .required("Item's id is a required field.")
      .min(8, "Item's id must be at least 8 characters."),
  });

  return (
    <View style={styles.container}>
      <ItemImagePicker image={image} setImage={setImage} />
      <Formik
        initialValues={{ itemName: "", itemId: "" }}
        validationSchema={itemSchema}
        onSubmit={(values, actions) => {
          if (image) {
            values = { ...values, image: image };
          } else {
            values = { ...values, image: "" };
          }
          console.log(values);
          actions.setSubmitting(false);
        }}
        initialTouched={{
          itemName: false,
          itemId: false,
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Text style={styles.title}>Item's Name</Text>
            <TextInput
              value={values.itemName}
              mode="outlined"
              onChangeText={handleChange("itemName")}
              onBlur={handleBlur("itemName")}
              outlineColor="#CCCDC6"
              label={<Text style={{ color: "red" }}>*</Text>}
            />
            <HelperText
              type="error"
              visible={touched.itemName && errors.itemName !== undefined}
              padding="none"
            >
              {errors.itemName}
            </HelperText>
            <Text style={styles.title}>Item's ID</Text>
            <TextInput
              value={values.itemId}
              mode="outlined"
              onChangeText={handleChange("itemId")}
              onBlur={handleBlur("itemId")}
              outlineColor="#CCCDC6"
              label={<Text style={{ color: "red" }}>*</Text>}
            />
            <HelperText
              type="error"
              visible={touched.itemId && errors.itemId !== undefined}
              padding="none"
            >
              {errors.itemId}
            </HelperText>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{ paddingVertical: 5, marginTop: 10 }}
            >
              Add item
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {},
});

export default FormAddItem;

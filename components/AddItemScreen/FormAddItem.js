import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { addItem } from "firebases/realtimeApi";

const FormAddItem = ({ onToggleSnackBar }) => {
  const itemSchema = Yup.object({
    itemName: Yup.string().required("Item's name is a required field."),
    itemId: Yup.number().required("Item's id is a required field."),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ itemName: "", itemId: "" }}
        validationSchema={itemSchema}
        onSubmit={(values, actions) => {
          addItem({ itemId: values.itemId, itemName: values.itemName });
          actions.setSubmitting(false);
          actions.resetForm();
          onToggleSnackBar();
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
              style={styles.btnSubmit}
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
  btnSubmit: {
    padding: 5,
    marginTop: 10,
  },
});

export default FormAddItem;

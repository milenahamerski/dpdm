import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React from "react";

type FormInputProps = {
  label?: string;
  error?: string;
} & TextInputProps;

export default function FormInput({ label, error, ...rest }: FormInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...rest} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    width: "100%",
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
    color: "#553A59",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#DEF5FA",
    width: "100%",
    height: 50,
  },
  error: {
    color: "red",
    fontSize: 10,
    marginTop: 4,
  },
});

// app/signUp.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import SignUpForm from "../components/SignUp";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <SignUpForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// app/signUp.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import SignUpForm from "../components/SignIn";
import SignInForm from "../components/SignIn";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <SignInForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

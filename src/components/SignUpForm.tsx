import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import FormInput from "@components/ui/FormInput";
import CustomButton from "@components/ui/CustomButton";

interface SignUpFormProps {
  onSubmit: (
    email: string,
    password: string,
    username: string,
    fullName: string
  ) => void;
  loading?: boolean;
}

export default function SignUpForm({
  onSubmit,
  loading = false,
}: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  return (
    <View style={styles.container}>
      {/* Campos do formulário */}
      <FormInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        style={styles.input}
      />
      <FormInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
      />
      <FormInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <FormInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      {/* Botão de envio */}
      <CustomButton
        onPress={() => onSubmit(email, password, username, fullName)}
        disabled={loading}
        style={styles.button}
        textStyle={styles.buttonText}
      >
        Sign Up
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 32,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    width: "100%",
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import SignUpForm from "@components/SignUpForm";
import AuthHeader from "@components/ui/AuthHeader";
import { useSignUp } from "@hooks/useSignUp";

export default function SignUpScreen() {
  const { signUp } = useSignUp();

  const handleSignUp = async (
    email: string,
    password: string,
    username: string,
    full_name: string
  ) => {
    try {
      await signUp({ email, password, username, full_name });
      Alert.alert(
        "Conta criada!",
        "Verifique seu e-mail para confirmar o cadastro."
      );
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Crie sua conta ✨"
        subtitle="Comece a usar o app agora mesmo"
      />

      <SignUpForm onSubmit={handleSignUp} />

      <View style={styles.signinContainer}>
        <Text style={styles.text}>Já tem conta? </Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.signinText}>Entre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#E8DDC9",
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  text: {
    color: "#553A59",
  },
  signinText: {
    color: "#85686A",
    fontWeight: "600",
  },
});

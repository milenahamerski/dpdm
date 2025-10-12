import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import SignInForm from "@components/SignInForm";
import AuthHeader from "@components/ui/AuthHeader";
import { useSignIn } from "@hooks/useSignIn";

export default function SignInScreen() {
  const { signInWithPassword } = useSignIn();

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithPassword({ email, password });
      router.replace("/home"); // navega para home
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Bem-vindo de volta 💜"
        subtitle="Entre com sua conta para continuar"
      />

      <SignInForm onSubmit={handleSignIn} />

      <View style={styles.signupContainer}>
        <Text style={styles.text}>Não tem conta? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupText}>Cadastre-se</Text>
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  text: { color: "#553A59" },
  signupText: { color: "#85686A", fontWeight: "600" },
});

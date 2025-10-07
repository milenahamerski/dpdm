import React from "react";
import { Alert, StyleSheet, Text, View, Switch } from "react-native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import Card from "./ui/Card";
import FormInput from "./ui/FormInput";
import Title from "./ui/Title";
import Flex from "./ui/Flex";
import Logo from "./ui/Logo";
import CustomButton from "./ui/CustomButton";
import { signIn } from "../services/authService";

export default function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [subscribe, setSubscribe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [emailMessage, setMessage] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  const router = useRouter();
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  // Validação simples do email
  React.useEffect(() => {
    if (email && (!email.includes("@") || !email.includes("."))) {
      setMessage("Digite um email válido.");
      return;
    }
    setMessage("");
  }, [email]);

  const handleSignIn = async () => {
    if (!isFormValid) return;

    setLoading(true);
    try {
      const { session, user } = await signIn(email, password);

      if (!session) {
        Alert.alert("Erro", "Não foi possível criar a sessão.");
        return;
      }

      // Login bem sucedido
      setLoginError("");
      router.push("/"); // Redireciona para home ou painel
    } catch (err: any) {
      setLoginError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Logo width={70} height={70} style={{ marginTop: 30 }} />

      <Card style={styles.card}>
        <Title
          title="Faça seu login"
          titleStyle={{ color: "#FF9900" }}
          style={{ alignSelf: "flex-start", marginBottom: 10 }}
        />

        <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
        {emailMessage !== "" && (
          <Text
            style={emailMessage.includes("✅") ? styles.valid : styles.invalid}
          >
            {emailMessage}
          </Text>
        )}

        <FormInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loginError !== "" && <Text style={styles.invalid}>{loginError}</Text>}

        <Flex
          direction="row"
          align="center"
          justify="space-between"
          style={{ alignSelf: "flex-start" }}
        >
          <Text>Lembrar de mim</Text>
          <Switch value={subscribe} onValueChange={setSubscribe} />
        </Flex>

        <CustomButton onPress={handleSignIn} disabled={!isFormValid || loading}>
          {loading ? "Carregando..." : "SIGN IN"}
        </CustomButton>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    gap: 16,
    alignSelf: "stretch",
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  valid: {
    color: "green",
    fontSize: 14,
    alignSelf: "flex-start",
    marginTop: -10,
    marginBottom: 10,
  },
  invalid: {
    color: "#BB342F",
    fontSize: 14,
    alignSelf: "flex-start",
    marginTop: -10,
    marginBottom: 10,
  },
});

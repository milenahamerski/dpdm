import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, Switch } from "react-native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import Card from "./ui/Card";
import FormInput from "./ui/FormInput";
import Title from "./ui/Title";
import Flex from "./ui/Flex";
import Logo from "./ui/Logo";
import CustomButton from "./ui/CustomButton";
import { supabase } from "../lib/supabase";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    if (email && (!email.includes("@") || !email.includes("."))) {
      setEmailMessage("Digite um email válido.");
    } else {
      setEmailMessage("");
    }
  }, [email]);

  const handleSignUp = async () => {
    if (!isFormValid) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setLoginError(error.message);
        return;
      }

      setLoginError("");
      Alert.alert("Cadastro realizado", "Verifique seu email para confirmar!");

      router.push("/login"); // redireciona para login
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Logo width={70} height={70} style={{ marginTop: 30 }} />

      <Card style={styles.card}>
        <Title
          title="Crie sua conta"
          titleStyle={{ color: "#FF9900" }}
          style={{ alignSelf: "flex-start", marginBottom: 10 }}
        />

        <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
        {emailMessage !== "" && (
          <Text style={styles.invalid}>{emailMessage}</Text>
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

        <CustomButton onPress={handleSignUp} disabled={!isFormValid || loading}>
          {loading ? "Carregando..." : "SIGN UP"}
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
  invalid: {
    color: "#BB342F",
    fontSize: 14,
    alignSelf: "flex-start",
    marginTop: -10,
    marginBottom: 10,
  },
});

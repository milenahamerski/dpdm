import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import FormInput from "@components/ui/FormInput";
import CustomButton from "@components/ui/CustomButton";

interface SignUpFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
}

export default function SignUpForm({
  onSubmit,
  loading = false,
}: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <FormInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
      />
      <FormInput
        value={password}
        onChangeText={setPassword}
        placeholder="Crie uma senha"
        secureTextEntry
      />
      <CustomButton
        onPress={() => onSubmit(email, password)}
        disabled={loading}
        style={styles.button}
      >
        Cadastrar
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
});

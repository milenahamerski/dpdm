import { View, Image } from "react-native";
import { useState } from "react";
import FormInput from "@components/ui/FormInput";
import CustomButton from "@components/ui/CustomButton";

interface SignInFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
}

export default function SignInForm({
  onSubmit,
  loading = false,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ width: "100%", marginTop: 32, alignItems: "center" }}>
      <FormInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={{
          width: "100%",
          paddingVertical: 18,
          paddingHorizontal: 16,
          marginBottom: 24,
          fontSize: 18,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      />
      <FormInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{
          width: "100%",
          paddingVertical: 18,
          paddingHorizontal: 16,
          marginBottom: 24,
          fontSize: 18,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      />

      <CustomButton
        onPress={() => onSubmit(email, password)}
        disabled={loading}
        style={{
          width: "100%",
          paddingVertical: 20,
          borderRadius: 16,
          alignItems: "center",
        }}
        textStyle={{ fontSize: 18 }}
      >
        Sign In
      </CustomButton>
    </View>
  );
}

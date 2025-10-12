import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import SignUpForm from "@components/SignUpForm";
import AuthHeader from "@components/ui/AuthHeader";
import { useSignUp } from "@hooks/useSignUp";
import MundiLogo from "@assets/images/MUNDI.png";

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
        "Account created!",
        "Check your email to confirm your registration."
      );
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Sign Up Error", error.message);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Image source={MundiLogo} style={styles.logo} resizeMode="contain" />
      <AuthHeader
        title="Create your account"
        subtitle="Start using the app right now"
      />
      <SignUpForm onSubmit={handleSignUp} />
      <View className="flex-row justify-center mt-lg">
        <Text className="text-navy">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signIn")}>
          <Text className="text-red font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 32,
  },
});

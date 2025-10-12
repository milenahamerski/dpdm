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
import SignInForm from "@components/SignInForm";
import AuthHeader from "@components/ui/AuthHeader";
import { useSignIn } from "@hooks/useSignIn";
import MundiLogo from "@assets/images/MUNDI.png";

export default function SignInScreen() {
  const { signInWithPassword } = useSignIn();

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithPassword({ email, password });
      router.replace("/(protected)/users/home");
    } catch (error: any) {
      Alert.alert("Sign In Error", error.message);
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
        title="Welcome back!"
        subtitle="Sign in to your account to continue"
      />
      <SignInForm onSubmit={handleSignIn} />
      <View className="flex-row justify-center mt-lg">
        <Text className="text-navy">Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signUp")}>
          <Text className="text-red font-semibold">Sign Up</Text>
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

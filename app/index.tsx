import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSizes } from "@theme";

export default function LandingPage() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.navy,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.lg,
      }}
    >
      <Image
        source={require("../src/assets/images/MUNDI.png")}
        style={{ width: 200, height: 200, marginBottom: spacing.lg }}
        resizeMode="contain"
      />

      <Text
        style={{
          fontSize: fontSizes.xl,
          fontWeight: "bold",
          color: colors.red,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Collect memories around the world.
      </Text>

      <Text
        style={{
          fontSize: fontSizes.md,
          color: colors.white,
          marginBottom: spacing.lg,
          textAlign: "center",
        }}
      >
        With Mundi, you can easily and personally record your travels, creating
        a unique diary with photos, stories, and details of every experience.
      </Text>

      <TouchableOpacity
        style={{
          width: "80%",
          paddingVertical: 14,
          borderRadius: 12,
          marginVertical: 8,
          alignItems: "center",
          backgroundColor: colors.blue,
        }}
        onPress={() => router.push("/signUp")}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "600",
            fontSize: fontSizes.md,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "80%",
          paddingVertical: 14,
          borderRadius: 12,
          marginVertical: 8,
          alignItems: "center",
          backgroundColor: colors.white,
        }}
        onPress={() => router.push("/signIn")}
      >
        <Text
          style={{
            color: colors.navy,
            fontWeight: "600",
            fontSize: fontSizes.md,
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

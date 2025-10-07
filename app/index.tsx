import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/ui/CustomButton";
import Logo from "../components/ui/Logo";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo width={250} height={250} />
      <CustomButton onPress={() => router.push("/signUp")}>
        LET'S GO
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

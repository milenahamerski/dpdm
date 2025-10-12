import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useSupabase } from "../src/hooks/useSupabase";

export default function HomeScreen() {
  const { session, signOut } = useSupabase();

  const handleLogout = async () => {
    await signOut();
    router.replace("/"); // volta pra tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Olá, {session?.user?.email ?? "usuária"} 👋
      </Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8DDC9",
  },
  welcomeText: {
    fontSize: 20,
    color: "#553A59",
    marginBottom: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#553A59",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  logoutText: {
    color: "#E8DDC9",
    fontWeight: "600",
    fontSize: 16,
  },
});

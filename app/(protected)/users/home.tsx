import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useSupabase } from "../../../src/hooks/useSupabase";

export default function HomeScreen() {
  const { session, signOut } = useSupabase();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <View className="flex-1 justify-center items-center bg-beige px-6">
      <Text className="text-2xl font-medium text-white mb-4 text-center">
        Hellou, {session?.user?.email ?? "usuária"} 👋
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-purple py-3 px-8 rounded-full mt-4"
      >
        <Text className="text-beige font-semibold text-blue">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

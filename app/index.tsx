import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function LandingPage() {
  return (
    <View className="flex-1 bg-navy justify-center items-center px-[24px]">
      <Image
        source={require("../src/assets/images/MUNDI.png")}
        className="w-[200px] h-[200px] mb-[24px]"
        resizeMode="contain"
      />
      <Text className="text-[28px] font-bold text-red mb-2 text-center">
        Collect memories around the world.
      </Text>

      <Text className="text-[16px] text-white mb-[24px] text-center">
        With Mundi, you can easily and personally record your travels, creating
        a unique diary with photos, stories, and details of every experience.
      </Text>

      <TouchableOpacity
        className="w-4/5 py-3 rounded-xl my-2 items-center bg-blue"
        onPress={() => router.push("/signUp")}
      >
        <Text className="text-white font-semibold text-[16px]">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-4/5 py-3 rounded-xl my-2 items-center bg-white"
        onPress={() => router.push("/signIn")}
      >
        <Text className="text-blue font-semibold text-[16px]">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text } from "react-native";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <View className="mb-lg">
      <Text className="text-xl font-bold text-navy mb-sm">{title}</Text>
      <Text className="text-md text-navy">{subtitle}</Text>
    </View>
  );
}

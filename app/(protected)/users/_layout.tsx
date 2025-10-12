import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#3F3D56",
        },
      }}
    >
      <Stack.Screen name="[id]" options={{ title: "User Details" }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function ProtectedUsersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

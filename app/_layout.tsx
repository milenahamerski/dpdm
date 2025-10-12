import { Stack } from "expo-router";
import { SupabaseProvider } from "../src/providers/supabase-provider";

export default function RootLayout() {
  return (
    <SupabaseProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
      </Stack>
    </SupabaseProvider>
  );
}

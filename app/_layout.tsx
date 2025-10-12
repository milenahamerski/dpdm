import { Stack } from "expo-router";
import { SupabaseProvider } from "../src/providers/supabase-provider";
import "../global.css";

export default function RootLayout() {
  return (
    <SupabaseProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signIn" />
        <Stack.Screen name="signUp" />
      </Stack>
    </SupabaseProvider>
  );
}

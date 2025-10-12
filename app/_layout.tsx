import { Stack } from "expo-router";
import { SupabaseProvider } from "../src/providers/supabase-provider";
import "../global.css";

export default function RootLayout() {
  return (
    <SupabaseProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Welcome" }} />
        <Stack.Screen name="signIn" options={{ title: "Sign In" }} />
        <Stack.Screen name="signUp" options={{ title: "Sign Up" }} />
      </Stack>
    </SupabaseProvider>
  );
}

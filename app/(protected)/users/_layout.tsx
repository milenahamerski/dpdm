import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#3F3D56",
        },
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
}

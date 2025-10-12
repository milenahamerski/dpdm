import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";

type CardProps = {
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

export default function Card({ style, children }: CardProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    gap: 16,
    flex: 1,
    alignSelf: "stretch",
  },
});

import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import React, { PropsWithChildren } from "react";

type ButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
} & PropsWithChildren;

export default function CustomButton({
  onPress,
  disabled = false,
  style,
  textStyle,
  children,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: disabled ? "#A5B4FC" : "#27A1A1",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 16,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

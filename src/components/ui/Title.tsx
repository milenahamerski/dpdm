import { View, Text, TextStyle, ViewStyle } from "react-native";
import React from "react";

type TitleProps = {
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  center?: boolean;
};

export default function Title({
  title,
  subtitle,
  style,
  titleStyle,
  subtitleStyle,
  center = false,
}: TitleProps) {
  return (
    <View style={[center && { alignItems: "center" }, style]}>
      {title && (
        <Text
          style={[
            {
              fontSize: 24,
              fontWeight: "bold",
              color: "#FFFFFF",
              ...(center && { textAlign: "center" }),
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          style={[
            {
              fontSize: 16,
              color: "#DADADA",
              marginTop: 4,
              ...(center && { textAlign: "center" }),
            },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

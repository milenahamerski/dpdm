import { View, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";

type FlexProps = {
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  gap?: number;
  direction?: "row" | "column";
  style?: ViewStyle;
} & PropsWithChildren;

export default function Flex({
  children,
  justify = "flex-start",
  align = "stretch",
  gap = 0,
  direction = "column",
  style,
}: FlexProps) {
  return (
    <View
      style={{
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        ...(style as object),
        rowGap: direction === "row" ? gap : undefined,
        columnGap: direction === "column" ? gap : undefined,
      }}
    >
      {children}
    </View>
  );
}

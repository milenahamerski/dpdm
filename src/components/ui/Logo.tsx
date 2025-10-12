import React from "react";
import { Image, ImageStyle, StyleSheet, StyleProp } from "react-native";

type LogoProps = {
  width: number;
  height: number;
  style?: StyleProp<ImageStyle>;
};

export default function Logo({ width, height, style }: LogoProps) {
  return (
    <Image
      source={require("../../assets/MUNDI.png")}
      style={[styles.image, { width, height }, style]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});

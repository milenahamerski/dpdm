import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface ProfilePhotoProps {
  uri: string;
}

//? testID usado para testes (getByTestId)
export default function ProfilePhoto({ uri }: ProfilePhotoProps) {
  return (
    <View style={styles.container}>
      <Image testID="profile-image" source={{ uri }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSupabase } from "@hooks/useSupabase";

export default function ProfilePage() {
  const { supabase, session } = useSupabase();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<{
    username: string;
    full_name: string;
    avatar_url: string | null;
    email: string;
  } | null>(null);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        Alert.alert("Error", "Could not load profile data.");
        return;
      }

      setProfile({
        username: data.username || "",
        full_name: data.full_name || "",
        avatar_url: data.avatar_url || null,
        email: user.email || "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadProfile();
  }, [user?.id]);

  const pickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert("Permission needed", "Allow access to upload images.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (result.canceled || !result.assets[0].base64) return;

    uploadAvatar(result.assets[0].base64);
  };

  const uploadAvatar = async (base64: string) => {
    if (!user) return;

    try {
      setUploading(true);

      const fileName = `${user.id}.jpg`;
      const filePath = `avatars/${fileName}`;

      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, bytes, {
          upsert: true,
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setProfile((prev) => (prev ? { ...prev, avatar_url: publicUrl } : prev));

      Alert.alert("Success", "Profile picture updated!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not upload image.");
    } finally {
      setUploading(false);
    }
  };

  if (!user || loading || !profile) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="text-navy mt-md">Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-lg pt-12">
      <Text className="text-xl font-bold text-navy mb-xl">My Profile</Text>

      <View className="items-center mb-xl">
        <TouchableOpacity onPress={pickAvatar} activeOpacity={0.8}>
          <Image
            source={{
              uri:
                profile.avatar_url ??
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
            }}
            className="w-32 h-32 rounded-full mb-md bg-gray-200"
          />
          <Text className="text-blue text-center underline">
            {uploading ? "Uploading..." : "Change Photo"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-md">
        <View>
          <Text className="text-md text-gray-600">Username</Text>
          <Text className="text-lg font-semibold">{profile.username}</Text>
        </View>

        <View>
          <Text className="text-md text-gray-600">Full Name</Text>
          <Text className="text-lg font-semibold">{profile.full_name}</Text>
        </View>

        <View>
          <Text className="text-md text-gray-600">Email</Text>
          <Text className="text-lg font-semibold">{profile.email}</Text>
        </View>
      </View>
    </View>
  );
}

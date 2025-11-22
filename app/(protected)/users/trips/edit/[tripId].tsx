import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSupabase } from "@hooks/useSupabase";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditTripPage() {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();
  const { supabase } = useSupabase();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    notes: "",
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Load data
  useEffect(() => {
    const loadTrip = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("start_date, end_date, notes")
        .eq("id", tripId)
        .single();

      if (error || !data) {
        Alert.alert("Error", "Could not load trip.");
        router.back();
        return;
      }

      setForm({
        start_date: data.start_date,
        end_date: data.end_date,
        notes: data.notes || "",
      });

      setLoading(false);
    };

    loadTrip();
  }, [tripId]);

  const handleSave = async () => {
    setSaving(true);

    const { error } = await supabase
      .from("trips")
      .update({
        start_date: form.start_date,
        end_date: form.end_date,
        notes: form.notes,
      })
      .eq("id", tripId);

    setSaving(false);

    if (error) return Alert.alert("Error", "Could not update.");

    Alert.alert("Updated!", "Your trip has been updated.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleDelete = () => {
    Alert.alert("Delete trip?", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: confirmDelete,
      },
    ]);
  };

  const confirmDelete = async () => {
    const { error } = await supabase.from("trips").delete().eq("id", tripId);

    if (error) return Alert.alert("Error", "Could not delete.");

    Alert.alert("Deleted", "Trip was removed.");
    router.push("/(protected)/users/home");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-lg py-lg">
        <Text className="text-xl font-bold text-navy mb-xl">
          Edit Trip Details
        </Text>

        {/* Start Date */}
        <Text className="text-md text-gray-800 font-semibold mb-sm">
          Start Date
        </Text>
        <Pressable
          className="border border-gray-300 p-md rounded-xl mb-lg"
          onPress={() => setShowStartPicker(true)}
        >
          <Text className="text-md text-gray-700">{form.start_date}</Text>
        </Pressable>

        {showStartPicker && (
          <DateTimePicker
            value={new Date(form.start_date)}
            mode="date"
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date)
                setForm({
                  ...form,
                  start_date: date.toISOString().split("T")[0],
                });
            }}
          />
        )}

        {/* End Date */}
        <Text className="text-md text-gray-800 font-semibold mb-sm">
          End Date
        </Text>
        <Pressable
          className="border border-gray-300 p-md rounded-xl mb-lg"
          onPress={() => setShowEndPicker(true)}
        >
          <Text className="text-md text-gray-700">
            {form.end_date || "Open-ended"}
          </Text>
        </Pressable>

        {showEndPicker && (
          <DateTimePicker
            value={form.end_date ? new Date(form.end_date) : new Date()}
            mode="date"
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date)
                setForm({
                  ...form,
                  end_date: date.toISOString().split("T")[0],
                });
            }}
          />
        )}

        {/* Notes */}
        <Text className="text-md text-gray-800 font-semibold mb-sm">Notes</Text>
        <TextInput
          className="border border-gray-300 p-md rounded-xl mb-2xl text-md"
          multiline
          value={form.notes}
          onChangeText={(t) => setForm({ ...form, notes: t })}
        />

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          className="bg-blue py-md px-lg mt-4 rounded-lg items-center mb-md active:opacity-80"
          disabled={saving}
        >
          <Text className="text-white text-md font-semibold">
            {saving ? "Saving..." : "Save Changes"}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          className="bg-red py-md px-lg rounded-lg items-center active:opacity-80"
        >
          <Text className="text-white text-md font-semibold">Delete Trip</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

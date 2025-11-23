import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSupabase } from "@hooks/useSupabase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import debounce from "lodash.debounce";
import { z } from "zod";
import { handleTripError } from "utils/errorHandler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewTripScreen() {
  const { supabase, session } = useSupabase();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const tripSchema = z
    .object({
      destination: z.string().min(3, "Destination is required."),
      startDate: z.date(),
      endDate: z.date().nullable(),
      notes: z
        .string()
        .max(500, "Notes must be under 500 characters.")
        .optional(),
      lat: z.string(),
      lon: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.endDate && data.endDate < data.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "End date cannot be before start date.",
          path: ["endDate"],
        });
      }
    });

  const fetchSuggestions = debounce(
    async (text: string, controller?: AbortController) => {
      if (!text) {
        setSuggestions([]);
        return;
      }

      setSearching(true);
      const abortCtrl = controller || new AbortController();

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            text
          )}&addressdetails=1&limit=5&accept-language=en`,
          {
            signal: abortCtrl.signal,
            headers: {
              "User-Agent":
                "trip-journal-app/1.0 (milena.hamerski@utfpr.edu.br)",
            },
          }
        );

        if (!response.ok) throw new Error("Could not fetch suggestions.");

        const data = await response.json();
        setSuggestions(data);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching places:", error);
        }
      } finally {
        setSearching(false);
      }
    },
    500
  );

  const handleSaveTrip = async () => {
    if (!selectedLocation) {
      return Alert.alert("Warning", "Please select a valid destination.");
    }

    if (!session?.user) {
      return Alert.alert("Error", "User not authenticated.");
    }

    const { display_name, lat, lon, place_type, address } = selectedLocation;

    try {
      tripSchema.parse({
        destination: display_name,
        startDate,
        endDate,
        notes,
        lat,
        lon,
      });

      setLoading(true);

      const countryCode = address?.country_code?.toLowerCase();
      let countryId: string | null = null;

      if (countryCode) {
        const { data: countryData, error: countryError } = await supabase
          .from("countries")
          .select("id")
          .eq("code", countryCode)
          .single();

        if (!countryError) {
          countryId = countryData?.id || null;
        }
      }

      const { error } = await supabase.from("trips").insert([
        {
          user_id: session.user.id,
          destination: display_name,
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate ? endDate.toISOString().split("T")[0] : null,
          notes,
          lat,
          lon,
          place_type,
          country_id: countryId,
        },
      ]);

      if (error) throw error;

      Alert.alert("Success", "Trip saved successfully!");
      router.replace("/(protected)/users/home");
    } catch (err: any) {
      const friendlyMsg = handleTripError(err);
      Alert.alert("Error", friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-lg">
      <Text className="text-xl font-bold text-navy mb-md">Create new trip</Text>

      <Text className="font-semibold mb-sm text-navy">Destination</Text>
      <View className="relative mb-sm">
        <TextInput
          placeholder="Type a destination..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (abortController) abortController.abort();
            const newController = new AbortController();
            setAbortController(newController);
            fetchSuggestions(text, newController);
          }}
          className="border border-gray-300 rounded-lg p-md bg-white"
        />

        {searching && (
          <View className="absolute right-3 top-3">
            <ActivityIndicator size="small" color="#666" />
          </View>
        )}

        {suggestions.length > 0 && (
          <View
            style={{
              position: "absolute",
              top: 55,
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              zIndex: 999,
              elevation: 5,
              maxHeight: 200,
            }}
          >
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={suggestions}
              keyExtractor={(item) =>
                item.place_id?.toString() ?? Math.random().toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLocation(item);
                    setQuery(item.display_name);
                    setSuggestions([]);
                  }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#f1f1f1",
                  }}
                >
                  <Text style={{ color: "#1E293B" }}>{item.display_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <Text className="font-semibold mt-md mb-sm text-navy">Start date</Text>
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        className="p-md bg-white rounded-lg border border-gray-300"
      >
        <Text>{startDate.toLocaleDateString("en-US")}</Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <Text className="font-semibold mt-md mb-sm text-navy">End date</Text>
      <TouchableOpacity
        onPress={() => setShowEndPicker(true)}
        className="p-md bg-white rounded-lg border border-gray-300"
      >
        <Text>{endDate ? endDate.toLocaleDateString("en-US") : "Select"}</Text>
      </TouchableOpacity>

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      <Text className="font-semibold mt-md mb-sm text-navy">Notes</Text>
      <TextInput
        placeholder="Some notes about this trip..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
        className="border border-gray-300 rounded-lg p-md bg-white mb-lg text-navy"
        style={{ textAlignVertical: "top" }}
      />

      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() => router.replace("/(protected)/users/home")}
          className="flex-1 bg-gray-300 py-md rounded-lg mr-sm items-center"
        >
          <Text className="text-navy font-semibold">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSaveTrip}
          disabled={loading}
          className={`flex-1 py-md rounded-lg items-center ${
            loading ? "bg-blue/60" : "bg-blue"
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#E6E6E6" />
          ) : (
            <Text className="text-white font-semibold">Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

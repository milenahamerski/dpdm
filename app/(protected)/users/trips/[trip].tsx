// app/(protected)/users/trips/[trip].tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSupabase } from "../../../../src/hooks/useSupabase";
import TripMap from "../../../../src/components/ui/TripMap";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripPage() {
  const { trip } = useLocalSearchParams();
  const tripId = Array.isArray(trip) ? trip[0] : trip;

  const router = useRouter();
  const { supabase } = useSupabase();
  const [tripData, setTripData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select(
          `
          id,
          destination,
          start_date,
          end_date,
          notes,
          lat,
          lon,
          countries (
            flag,
            name
          )
        `
        )
        .eq("id", tripId)
        .single();

      if (!error) {
        setTripData({
          ...data,
          lat: parseFloat(data.lat),
          lon: parseFloat(data.lon),
        });
      }

      setLoading(false);
    };

    if (tripId) fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3F3D56" />
        <Text className="text-md text-gray-600 mt-sm">
          Loading trip details...
        </Text>
      </View>
    );
  }

  if (!tripData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-md text-gray-700">Trip not found 😢</Text>
      </View>
    );
  }

  const { destination, start_date, end_date, notes, lat, lon, countries } =
    tripData;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white px-lg pt-3xl pb-xl"
        nestedScrollEnabled
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2xl">
          <View className="flex-col flex-1 pr-lg">
            <Text className="text-2xl font-extrabold text-navy">
              {destination}
            </Text>

            {countries?.flag && (
              <Text className="text-5xl mt-sm">{countries.flag}</Text>
            )}
          </View>

          {/* Edit Button */}
          <Pressable
            onPress={() => router.push(`/users/trips/edit/${tripId}`)}
            className="bg-blue rounded-lg px-lg py-sm active:opacity-80"
          >
            <Text className="text-white text-md font-semibold">Edit</Text>
          </Pressable>
        </View>

        {/* Dates */}
        <Text className="text-md text-gray-700 mb-xl">
          {start_date} — {end_date ?? "Open-ended"}
        </Text>

        {/* Notes */}
        {notes && (
          <View className="bg-white border border-gray-300 p-lg rounded-xl mb-2xl">
            <Text className="text-md text-gray-800 leading-6">{notes}</Text>
          </View>
        )}

        {/* Map */}
        <View className="mt-xl mb-2xl">
          <TripMap lat={lat} lon={lon} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useSupabase } from "@hooks/useSupabase";
import TripMap from "@components/ui/TripMap";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function TripPage() {
  const { trip } = useLocalSearchParams();
  const tripId = Array.isArray(trip) ? trip[0] : trip;

  const router = useRouter();
  const { supabase } = useSupabase();
  const [tripData, setTripData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTrip = async () => {
        setLoading(true);
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

        if (!error && data) {
          setTripData({
            ...data,
            lat: parseFloat(data.lat),
            lon: parseFloat(data.lon),
          });
        }

        setLoading(false);
      };

      if (tripId) fetchTrip();
    }, [tripId, supabase])
  );

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
        <Text className="text-md text-gray-700">Trip not found</Text>
      </View>
    );
  }

  const { destination, start_date, end_date, notes, lat, lon, countries } =
    tripData;

  return (
    <SafeAreaView className="flex-1 bg-white p-lg">
      <ScrollView className="flex-1 bg-white" nestedScrollEnabled>
        <View className="mb-2xl">
          <Text className="text-2xl font-extrabold text-navy">
            {destination}
          </Text>
          {countries?.flag && (
            <Text className="text-3xl mt-sm">{countries.flag}</Text>
          )}

          <View className="flex-row items-center gap-2 mt-sm">
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </Svg>
            <Text className="text-gray-700 text-md">
              {start_date} — {end_date ?? "Open-ended"}
            </Text>
          </View>
        </View>

        {notes && (
          <Text className="text-gray-800 text-md leading-7 mb-2xl">
            {notes}
          </Text>
        )}

        <View className="mt-xl mb-2xl">
          <TripMap lat={lat} lon={lon} />
        </View>

        <Pressable
          onPress={() => router.push(`/users/trips/edit/${tripId}`)}
          className="bg-blue rounded-lg px-lg py-sm active:opacity-80 w-full"
        >
          <Text className="text-white text-md font-semibold text-center">
            Edit
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

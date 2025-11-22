import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useSupabase } from "@hooks/useSupabase";
import { useEffect, useState } from "react";
import Card from "@components/ui/Card";

type Country = {
  flag: string;
  name: string;
};

type Trip = {
  id: string;
  destination: string;
  start_date: string;
  end_date: string | null;
  notes: string | null;
  countries?: Country | null;
};

export default function HomeScreen() {
  const { supabase, session, signOut } = useSupabase();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  const handleNewTrip = () => {
    router.push("/(protected)/users/trips/create");
  };

  const fetchTrips = async () => {
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
        countries (
          flag,
          name
        )
      `
      )
      .eq("user_id", session?.user.id)
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Erro ao buscar viagens:", error);
    } else {
      const normalized = (data || []).map((trip: any) => ({
        ...trip,
        countries: Array.isArray(trip.countries)
          ? trip.countries[0] ?? null
          : trip.countries,
      }));

      setTrips(normalized);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user) fetchTrips();
  }, [session]);

  return (
    <View className="flex-1 bg-white px-md pt-10">
      <View className="flex-row justify-between items-center mb-lg">
        <Text className="text-xl font-semibold text-navy">My Trips </Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-red underline font-medium">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* CREATE NEW TRIP */}
      <TouchableOpacity
        onPress={handleNewTrip}
        className="bg-blue py-md rounded-xl mb-lg items-center"
      >
        <Text className="text-white font-semibold text-md">
          + Create new trip
        </Text>
      </TouchableOpacity>

      {loading ? (
        <View className="flex-1 items-center justify-center mt-lg">
          <ActivityIndicator size="large" color="#3F3D56" />
          <Text className="text-navy mt-sm">Loading your trips...</Text>
        </View>
      ) : trips.length === 0 ? (
        <Text className="text-navy text-center mt-lg">No trips added yet</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
        >
          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              activeOpacity={0.8}
              onPress={() => router.push(`/users/trips/read/${trip.id}`)}
            >
              <Card
                destination={trip.destination}
                countryFlag={trip.countries?.flag ?? null}
                startDate={trip.start_date}
                endDate={trip.end_date}
                notes={trip.notes}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

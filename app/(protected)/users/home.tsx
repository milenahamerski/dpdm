import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
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
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  const handleNewTrip = () => {
    router.push("/(protected)/users/trips/create");
  };

  const handleProfile = () => {
    router.push("/(protected)/users/profile");
  };

  const fetchAvatar = async () => {
    const user = session?.user;
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    setAvatarUrl(data?.avatar_url ?? null);
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
      setFilteredTrips(normalized);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user) {
      fetchTrips();
      fetchAvatar(); // 👈 ADICIONADO
    }
  }, [session]);

  useEffect(() => {
    const filtered = trips.filter((trip) =>
      trip.destination.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTrips(filtered);
  }, [search, trips]);

  return (
    <View className="flex-1 bg-white px-md pt-10">
      <View className="flex-row justify-between items-center mb-lg">
        <TextInput
          className="flex-1 border border-gray-300 rounded-xl px-md py-sm text-md"
          placeholder="Search by destination..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={handleProfile} className="ml-md">
          <Image
            source={{
              uri:
                avatarUrl ??
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
            }}
            className="w-10 h-10 rounded-full bg-gray-200"
          />
        </TouchableOpacity>
      </View>

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
      ) : filteredTrips.length === 0 ? (
        <Text className="text-navy text-center mt-lg">No trips found</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
        >
          {filteredTrips.map((trip) => (
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

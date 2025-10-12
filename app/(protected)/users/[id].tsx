import { useLocalSearchParams, Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "@components/ui/Title";
import Card from "@components/ui/Card";
import ProfilePhoto from "@components/ui/ProfilePhoto";
import { useSupabase } from "@hooks/useSupabase";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function TravelPage() {
  const { id } = useLocalSearchParams();
  const travelId = Array.isArray(id) ? id[0] : id;
  const userId = Number(travelId);

  const { supabase } = useSupabase();
  const [user, setUser] = useState<any>(null);
  const [userTravels, setUserTravels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { showActionSheetWithOptions } = useActionSheet();
  const maxLength = 120;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) return console.error(error);
    setUser(data);
  };

  const fetchTravels = async () => {
    const { data, error } = await supabase
      .from("travels")
      .select("*")
      .eq("user_id", userId)
      .order("atualizado", { ascending: false });
    if (error) return console.error(error);
    setUserTravels(data || []);
  };

  useEffect(() => {
    if (!isNaN(userId)) {
      setLoading(true);
      Promise.all([fetchUser(), fetchTravels()]).finally(() =>
        setLoading(false)
      );
    }
  }, [userId]);

  const openActions = (travelId: number) => {
    const options = ["Delete", "Save", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: "Ações do Card",
        message: "Escolha uma ação para este card",
      },
      async (buttonIndex) => {
        if (buttonIndex === destructiveButtonIndex) {
          const { error } = await supabase
            .from("travels")
            .delete()
            .eq("id", travelId);
          if (error)
            return Alert.alert("Erro", "Não foi possível deletar a viagem");
          setUserTravels((prev) => prev.filter((item) => item.id !== travelId));
        } else if (buttonIndex === 1) {
          Alert.alert("Salvo", `Viagem ${travelId} salva!`);
        }
      }
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (!user) return <Text>Usuário não encontrado.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Title title="My Travels" />
        {user.photo && <ProfilePhoto uri={user.photo} />}
      </View>
      <Title subtitle={`Viagens do usuário ID: ${userId}`} />

      {userTravels.length > 0 ? (
        <FlatList
          data={userTravels}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onLongPress={() => openActions(item.id)}>
              <Link href={`/users/trips/${item.id}`} asChild>
                <Card style={styles.card}>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardBody}>
                    {truncateText(item.corpo, maxLength)}
                  </Text>
                  <Text style={styles.cardDate}>
                    Atualizado em: {new Date(item.atualizado).toLocaleString()}
                  </Text>
                </Card>
              </Link>
            </Pressable>
          )}
        />
      ) : (
        <Text style={styles.text}>Nenhuma viagem encontrada.</Text>
      )}

      <Link href="/">
        <Title subtitle="Voltar para a Home" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardBody: { fontSize: 16, marginVertical: 5 },
  cardDate: { fontSize: 14, color: "#888" },
  text: { fontSize: 18, marginVertical: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

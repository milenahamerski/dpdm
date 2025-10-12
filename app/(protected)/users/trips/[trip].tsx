// (auth)/users/trips/[trip].tsx
import React from "react";
import { View, Text } from "react-native";

export default function TripPage() {
  return (
    <View>
      <Text>Detalhes da viagem</Text>
    </View>
  );
}

// import { useLocalSearchParams } from "expo-router";
// import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
// import { travelContents } from "../../../../mocks/data.json";
// import React from "react";

// export default function TripDetailPage() {
//   const { trip } = useLocalSearchParams();
//   const tripId = Array.isArray(trip) ? trip[0] : trip;

//   const selectedTrip = travelContents.find((t) => t.id === Number(tripId));

//   if (!selectedTrip) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Viagem não encontrada.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{selectedTrip.titulo}</Text>
//       <Image
//         source={{ uri: selectedTrip.image }}
//         style={styles.image}
//         resizeMode="contain"
//       />
//       <Text style={styles.body}>{selectedTrip.corpo}</Text>
//       <Text style={styles.date}>
//         Criado em: {new Date(selectedTrip.criado).toLocaleString()}
//       </Text>
//       <Text style={styles.date}>
//         Atualizado em: {new Date(selectedTrip.atualizado).toLocaleString()}
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   image: {
//     width: "100%",
//     aspectRatio: 1.5,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   body: {
//     fontSize: 16,
//     marginBottom: 10,
//     textAlign: "justify",
//   },
//   date: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   text: {
//     fontSize: 18,
//     textAlign: "center",
//   },
// });

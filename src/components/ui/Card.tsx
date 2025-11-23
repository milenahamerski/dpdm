import { View, Text, StyleSheet } from "react-native";
import React from "react";

type TripCardProps = {
  destination: string;
  countryFlag?: string | null;
  startDate: string;
  endDate?: string | null;
  notes?: string | null;
  maxWords?: number;
};

export default function Card({
  destination,
  countryFlag,
  startDate,
  endDate,
  notes,
  maxWords = 20,
}: TripCardProps) {
  const truncateNotes = (text: string, limit: number) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.destination}>{destination}</Text>
        <Text style={styles.date}>
          {startDate} — {endDate ?? "open-ended"}
        </Text>
        {notes ? (
          <Text style={styles.notes}>{truncateNotes(notes, maxWords)}</Text>
        ) : null}
      </View>

      {countryFlag ? <Text style={styles.flag}>{countryFlag}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  textContainer: {
    flexShrink: 1,
    flexBasis: "85%",
  },
  destination: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3F3D56",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  notes: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  flag: {
    fontSize: 24,
    alignSelf: "flex-start",
  },
});

import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getHairstyleById } from "@/constants/mobile-data";

export default function HairstyleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hairstyle = id ? getHairstyleById(id) : undefined;

  if (!hairstyle) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundTitle}>Style not found</Text>
        <Text style={styles.notFoundText}>
          The hairstyle you selected is unavailable right now.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* The stack title mirrors the selected haircut so navigation feels specific rather than generic. */}
      <Stack.Screen options={{ title: hairstyle.name }} />

      <View style={styles.heroCard}>
        <Text style={styles.category}>{hairstyle.category}</Text>
        <Text style={styles.name}>{hairstyle.name}</Text>
        <Text style={styles.match}>{hairstyle.match}</Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Barber Note</Text>
        <Text style={styles.bodyText}>{hairstyle.barberNote}</Text>

        <Text style={styles.sectionTitle}>Appointment Fit</Text>
        <Text style={styles.bodyText}>Estimated time: {hairstyle.duration}</Text>
        <Text style={styles.bodyText}>Best upkeep: {hairstyle.maintenance}</Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Style Tags</Text>
        <View style={styles.tagRow}>
          {hairstyle.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#07111a",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#07111a",
  },
  notFoundTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  notFoundText: {
    color: "#94a3b8",
    fontSize: 16,
    lineHeight: 24,
  },
  heroCard: {
    backgroundColor: "#102133",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },
  category: {
    color: "#7dd3fc",
    fontWeight: "700",
    marginBottom: 10,
  },
  name: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
  },
  match: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: "#0f1a24",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  bodyText: {
    color: "#cbd5e1",
    lineHeight: 22,
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#102133",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "600",
  },
});

import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { hairstyleCategories, hairstyles } from "@/constants/mobile-data";

export default function BrowseScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Styles</Text>
        <Text style={styles.subtitle}>
          Explore cuts by vibe, upkeep, and hair texture before you book.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.chipsRow}>
          {hairstyleCategories.map((category) => (
            <View key={category} style={styles.chip}>
              <Text style={styles.chipText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Styles</Text>
        {hairstyles.map((style) => (
          <Link key={style.id} href={`/styles/${style.id}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{style.name}</Text>
                <Text style={styles.cardCategory}>{style.category}</Text>
              </View>
              <Text style={styles.cardText}>{style.match}</Text>
              <Text style={styles.cardMeta}>
                {style.duration} · {style.maintenance}
              </Text>
            </Pressable>
          </Link>
        ))}
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#94a3b8",
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: "#102133",
    borderColor: "#1d4f75",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  chipText: {
    color: "#dbeafe",
    fontWeight: "600",
  },
  // Cards stay compact here so the browse feed can scan quickly on mobile.
  card: {
    backgroundColor: "#102133",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },
  cardCategory: {
    color: "#7dd3fc",
    fontWeight: "600",
  },
  cardText: {
    color: "#cbd5e1",
    lineHeight: 21,
    marginBottom: 10,
  },
  cardMeta: {
    color: "#94a3b8",
    fontSize: 13,
  },
});

import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { hairstyles } from "@/constants/mobile-data";

export default function FavoritesScreen() {
  const favoriteStyles = hairstyles.filter((style) => style.isFavorite);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          Keep the cuts you want to show your barber in one easy shortlist.
        </Text>
        <Text style={styles.countLabel}>{favoriteStyles.length} saved looks</Text>
      </View>

      {/* This empty-state branch makes the screen resilient once real data replaces the mock list. */}
      {favoriteStyles.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>Save a style from Browse so it shows up here.</Text>
        </View>
      ) : (
        favoriteStyles.map((style) => (
          <Link key={style.id} href={`/styles/${style.id}`} asChild>
            <Pressable style={styles.favoriteCard}>
              <Text style={styles.favoriteCategory}>{style.category}</Text>
              <Text style={styles.favoriteName}>{style.name}</Text>
              <Text style={styles.favoriteText}>{style.barberNote}</Text>
              <View style={styles.tagRow}>
                {style.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          </Link>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#07111a",
  },
  heroCard: {
    backgroundColor: "#102133",
    borderRadius: 22,
    padding: 20,
    marginBottom: 22,
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
    color: "#cbd5e1",
    marginBottom: 14,
  },
  countLabel: {
    color: "#7dd3fc",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyState: {
    borderRadius: 18,
    padding: 20,
    backgroundColor: "#0f1a24",
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyText: {
    color: "#94a3b8",
    lineHeight: 22,
  },
  favoriteCard: {
    backgroundColor: "#0f1a24",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#16324b",
  },
  favoriteCategory: {
    color: "#7dd3fc",
    fontWeight: "600",
    marginBottom: 8,
  },
  favoriteName: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  favoriteText: {
    color: "#cbd5e1",
    lineHeight: 22,
    marginBottom: 14,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#102133",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tagText: {
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "600",
  },
});

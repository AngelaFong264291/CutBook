import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { hairstyleCategories, hairstyles, homeHighlights } from "@/constants/mobile-data";

export default function HomeScreen() {
  const featuredHairstyles = hairstyles.slice(0, 3);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>CutBook</Text>
        <Text style={styles.subtitle}>
          Find your next hairstyle with confidence, save what fits, and walk into the chair with a clear plan.
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <Link href="/browse" asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionText}>Browse Styles</Text>
          </Pressable>
        </Link>

        <Link href="/favorites" asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionText}>Favorites</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Matches</Text>

        {featuredHairstyles.map((style) => (
          <Link key={style.id} href={`/styles/${style.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardBadge}>{style.category}</Text>
              <Text style={styles.cardTitle}>{style.name}</Text>
              <Text style={styles.cardSubtitle}>{style.match}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.categoryGrid}>
          {hairstyleCategories.map((category) => (
            <Link key={category} href="/browse" asChild>
              <Pressable style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why These Picks</Text>
        {homeHighlights.map((item) => (
          <View key={item.title} style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>{item.title}</Text>
            <Text style={styles.highlightText}>{item.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <Link href="/profile" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Open Profile</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#07111a",
    flexGrow: 1,
  },
  heroSection: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#102133",
  },
  eyebrow: {
    color: "#7dd3fc",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#bbbbbb",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  actionButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  actionText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#13202c",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },
  cardBadge: {
    color: "#7dd3fc",
    marginBottom: 10,
    fontWeight: "600",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#aaaaaa",
    fontSize: 14,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    backgroundColor: "#0f1a24",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#1f3a52",
  },
  categoryText: {
    color: "#dbeafe",
    fontWeight: "600",
  },
  highlightCard: {
    backgroundColor: "#0f1a24",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  highlightTitle: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
  },
  highlightText: {
    color: "#94a3b8",
    lineHeight: 20,
  },
  secondaryButton: {
    backgroundColor: "#333333",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

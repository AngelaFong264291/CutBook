import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

const featuredHairstyles = [
  { id: 1, name: "Buzz Cut", category: "Short" },
  { id: 2, name: "Low Fade", category: "Modern" },
  { id: 3, name: "Wolf Cut", category: "Layered" },
];

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>CutBook</Text>
        <Text style={styles.subtitle}>Find your next hairstyle with confidence.</Text>
      </View>

      <View style={styles.actionsRow}>
        <Link href="/browse-styles" asChild>
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
        <Text style={styles.sectionTitle}>Featured Hairstyles</Text>

        {featuredHairstyles.map((style) => (
          <View key={style.id} style={styles.card}>
            <Text style={styles.cardTitle}>{style.name}</Text>
            <Text style={styles.cardSubtitle}>{style.category}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>

        <Link href="/profile" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Go To Profile</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#111111",
    flexGrow: 1,
  },
  heroSection: {
    marginBottom: 24,
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
    backgroundColor: "#1e1e1e",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
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

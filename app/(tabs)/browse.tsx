import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { hairstyleCategories, hairstyles, type HairCategory, type Hairstyle } from "@/constants/mobile-data";

const durationOptions = ["Any time", "30 min or less", "45 min or less", "Over 45 min"] as const;
const maintenanceOptions = ["Any upkeep", "Weekly line-up", "Every 2 weeks", "Every 3 weeks or more"] as const;

function matchesDuration(style: Hairstyle, selectedDuration: (typeof durationOptions)[number]) {
  // Pull the leading number out of values like "40 min" so we can compare times.
  const minutes = Number.parseInt(style.duration, 10);

  if (Number.isNaN(minutes) || selectedDuration === "Any time") {
    return true;
  }

  if (selectedDuration === "30 min or less") {
    return minutes <= 30;
  }

  if (selectedDuration === "45 min or less") {
    return minutes <= 45;
  }

  return minutes > 45;
}

function matchesMaintenance(style: Hairstyle, selectedMaintenance: (typeof maintenanceOptions)[number]) {
  // Group the text-based upkeep labels into simple filter buckets for the UI.
  if (selectedMaintenance === "Any upkeep") {
    return true;
  }

  if (selectedMaintenance === "Weekly line-up") {
    return style.maintenance === "Weekly line-up";
  }

  if (selectedMaintenance === "Every 2 weeks") {
    return style.maintenance.includes("Every 2 weeks");
  }

  return (
    style.maintenance.includes("Every 3 weeks") ||
    style.maintenance.includes("Every 4 weeks")
  );
}

export default function BrowseScreen() {
  // Keep track of the user's current filter selections.
  const [selectedCategory, setSelectedCategory] = useState<HairCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] =
    useState<(typeof durationOptions)[number]>("Any time");
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<(typeof maintenanceOptions)[number]>("Any upkeep");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const availableTags = [...new Set(hairstyles.flatMap((style) => style.tags))];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter the shared hairstyle list based on search text and every active filter.
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredStyles = hairstyles.filter((style) => {
    const matchesCategory =
      selectedCategory === "All" || style.category === selectedCategory;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      style.name.toLowerCase().includes(normalizedQuery) ||
      style.category.toLowerCase().includes(normalizedQuery) ||
      style.match.toLowerCase().includes(normalizedQuery) ||
      style.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    const matchesTag = selectedTag === null || style.tags.includes(selectedTag);
    const matchesFavorite = !favoritesOnly || style.isFavorite;

    return (
      matchesCategory &&
      matchesQuery &&
      matchesTag &&
      matchesFavorite &&
      matchesDuration(style, selectedDuration) &&
      matchesMaintenance(style, selectedMaintenance)
    );
  });

  function clearAdvancedFilters() {
    // Leave search/category alone and only reset the advanced filter controls.
    setSelectedDuration("Any time");
    setSelectedMaintenance("Any upkeep");
    setFavoritesOnly(false);
    setSelectedTag(null);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Styles</Text>
        <Text style={styles.subtitle}>
          Explore cuts by vibe, upkeep, and hair texture before you book.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search</Text>
        <TextInput
          placeholder="Search by style, category, or tag"
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.chipsRow}>
          <Pressable
            onPress={() => setSelectedCategory("All")}
            style={[
              styles.chip,
              selectedCategory === "All" && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === "All" && styles.chipTextActive,
              ]}
            >
              All
            </Text>
          </Pressable>
          {hairstyleCategories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.chip,
                selectedCategory === category && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === category && styles.chipTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Advanced Filters</Text>
          <Pressable onPress={clearAdvancedFilters}>
            <Text style={styles.clearAction}>Reset</Text>
          </Pressable>
        </View>

        <Text style={styles.filterLabel}>Appointment length</Text>
        <View style={styles.chipsRow}>
          {durationOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => setSelectedDuration(option)}
              style={[
                styles.chip,
                selectedDuration === option && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedDuration === option && styles.chipTextActive,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.filterLabel}>Upkeep</Text>
        <View style={styles.chipsRow}>
          {maintenanceOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => setSelectedMaintenance(option)}
              style={[
                styles.chip,
                selectedMaintenance === option && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedMaintenance === option && styles.chipTextActive,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.filterLabel}>Style vibe</Text>
        <View style={styles.chipsRow}>
          <Pressable
            onPress={() => setSelectedTag(null)}
            style={[styles.chip, selectedTag === null && styles.chipActive]}
          >
            <Text style={[styles.chipText, selectedTag === null && styles.chipTextActive]}>
              Any tag
            </Text>
          </Pressable>
          {availableTags.map((tag) => (
            <Pressable
              key={tag}
              onPress={() => setSelectedTag(tag)}
              style={[styles.chip, selectedTag === tag && styles.chipActive]}
            >
              <Text style={[styles.chipText, selectedTag === tag && styles.chipTextActive]}>
                {tag}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.filterLabel}>Saved looks</Text>
        <View style={styles.chipsRow}>
          <Pressable
            onPress={() => setFavoritesOnly(false)}
            style={[styles.chip, !favoritesOnly && styles.chipActive]}
          >
            <Text style={[styles.chipText, !favoritesOnly && styles.chipTextActive]}>
              All styles
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFavoritesOnly(true)}
            style={[styles.chip, favoritesOnly && styles.chipActive]}
          >
            <Text style={[styles.chipText, favoritesOnly && styles.chipTextActive]}>
              Favorites only
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Results</Text>
        <Text style={styles.resultsSummary}>
          {filteredStyles.length} {filteredStyles.length === 1 ? "style" : "styles"} matched
        </Text>

        {/* Each card still links into the same hairstyle detail route as before. */}
        {filteredStyles.map((style) => (
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

        {filteredStyles.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No styles matched</Text>
            <Text style={styles.emptyStateText}>
              Try clearing a few filters or searching with a broader keyword.
            </Text>
          </View>
        ) : null}
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: "#0f1a24",
    borderColor: "#1d4f75",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#f8fafc",
    fontSize: 16,
  },
  filterLabel: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 8,
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
  chipActive: {
    backgroundColor: "#1d4f75",
    borderColor: "#7dd3fc",
  },
  chipText: {
    color: "#dbeafe",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#ffffff",
  },
  clearAction: {
    color: "#7dd3fc",
    fontWeight: "700",
  },
  resultsSummary: {
    color: "#94a3b8",
    marginBottom: 14,
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
  emptyState: {
    backgroundColor: "#0f1a24",
    borderRadius: 18,
    padding: 18,
    borderColor: "#1d4f75",
    borderWidth: 1,
  },
  emptyStateTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyStateText: {
    color: "#94a3b8",
    lineHeight: 22,
  },
});

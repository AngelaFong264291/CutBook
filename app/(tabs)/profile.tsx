import { StyleSheet, Text, View } from "react-native";

import { profileSummary } from "@/constants/mobile-data";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.name}>{profileSummary.name}</Text>
        <Text style={styles.meta}>
          {profileSummary.city} · {profileSummary.membership}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Hair Type</Text>
          <Text style={styles.value}>{profileSummary.hairType}</Text>
          <Text style={styles.label}>Face Shape</Text>
          <Text style={styles.value}>{profileSummary.faceShape}</Text>
          <Text style={styles.label}>Preferred Barber</Text>
          <Text style={styles.value}>{profileSummary.preferredBarber}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{profileSummary.savedLooks}</Text>
            <Text style={styles.statLabel}>Saved Looks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Recent Views</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Visit</Text>
        {/* This card is separated so future booking data can be swapped in without reshaping the page. */}
        <View style={styles.infoCard}>
          <Text style={styles.value}>{profileSummary.upcomingVisit}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#07111a",
  },
  heroCard: {
    backgroundColor: "#102133",
    borderRadius: 22,
    padding: 20,
    marginBottom: 22,
  },
  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  meta: {
    color: "#cbd5e1",
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#0f1a24",
    borderRadius: 18,
    padding: 18,
  },
  label: {
    color: "#7dd3fc",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  value: {
    color: "#ffffff",
    fontSize: 17,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0f1a24",
    borderRadius: 18,
    padding: 18,
  },
  statNumber: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 14,
  },
});

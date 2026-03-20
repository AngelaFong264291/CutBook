import { StyleSheet, Text, View } from "react-native";

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>
        This page will show account details, preferences, and history.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#111111",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#bbbbbb",
  },
});

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

// Keep the tab group as the main entry point of the app.
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  // Read the current device color scheme so navigation can match it.
  const colorScheme = useColorScheme();

  return (
    // Provide navigation theme colors to every screen in the app.
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Root stack controls top-level screens like tabs and detail pages,. */}
      <Stack>
        {/* The tab group contains the main bottom-tab screens. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="styles/[id]"
          options={{
            // Show a standard header on the hairstyle detail screen.
            headerShown: true,
            title: "Hairstyle Details",
            headerStyle: { backgroundColor: "#101418" },
            headerTintColor: "#f8fafc",
            headerShadowVisible: false,
          }}
        />
      </Stack>
      {/* Keep the device status bar visible above the app screens. */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

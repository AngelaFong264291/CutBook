import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

type Props = {
  id: number;
  initialPublished: boolean;
};

export default function HairstylesPublishToggle({
  id,
  initialPublished,
}: Props) {
  // Store the current publish state for this hairstyle.
  const [published, setPublished] = useState(initialPublished);

  async function handleToggle() {
    // Flip the current publish value.
    const nextValue = !published;

    // Send only the publish status update to the backend.
    const response = await fetch(
      `http://localhost:3001/hairstyles/${id}/publish`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: nextValue,
        }),
      }
    );

    // Read the updated hairstyle returned by the backend.
    const data = await response.json();
    console.log(data);

    // Update local state so the UI reflects the new publish state.
    setPublished(nextValue);

    // Show feedback to the user after the toggle succeeds.
    Alert.alert(
      "Success",
      nextValue ? "Hairstyle published" : "Hairstyle unpublished"
    );
  }

  return (
    <View>
      {/* Show the current publish status */}
      <Text>
        {published ? "Currently Published" : "Currently Unpublished"}
      </Text>

      {/* Toggle between published and unpublished */}
      <Button
        title={published ? "Unpublish Hairstyle" : "Publish Hairstyle"}
        onPress={handleToggle}
      />
    </View>
  );
}

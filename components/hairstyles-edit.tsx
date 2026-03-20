import { useState } from "react";
import { Alert, Button, Switch, Text, TextInput, View } from "react-native";

type Props = {
  id: number;
  initialName: string;
  initialCategory: string;
  initialPublished: boolean;
};

export default function HairstylesEditScreen({
  id,
  initialName,
  initialCategory,
  initialPublished,
}: Props) {
  // Start the form with the current hairstyle values.
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState(initialCategory);

  // Start with the current publish status.
  const [published, setPublished] = useState(initialPublished);

  async function handleUpdate() {
    // Send the updated fields to the backend for this hairstyle id.
    const response = await fetch(`http://localhost:3001/hairstyles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        published,
      }),
    });

    // Read the updated record returned by the backend.
    const data = await response.json();

    // Stop here if the backend rejected the update.
    if (!response.ok) {
      console.error(data);
      Alert.alert("Error", "Failed to update hairstyle");
      return;
    }

    console.log(data);

    // Give the user quick feedback after a successful update.
    Alert.alert("Success", "Hairstyle updated");
  }

  return (
    <View>
      {/* Edit the hairstyle name */}
      <TextInput
        placeholder="Hairstyle name"
        value={name}
        onChangeText={setName}
      />

      {/* Edit the hairstyle category */}
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      {/* Toggle whether the hairstyle is published */}
      <Text>Published</Text>
      <Switch value={published} onValueChange={setPublished} />

      {/* Submit the edited hairstyle values */}
      <Button title="Update Hairstyle" onPress={handleUpdate} />
    </View>
  );
}

import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

export default function AdminUploadScreen() {
  // Store user input for hairstyle name
  const [name, setName] = useState("");

  // Store user input for category
  const [category, setCategory] = useState("");

  // This function runs when the user presses the button
  async function handleSubmit() {
    // Send a POST request to backend
    const response = await fetch("http://localhost:3001/hairstyles", {
      method: "POST", // tells backend we are creating data
      headers: {
        "Content-Type": "application/json", // sending JSON format
      },
      body: JSON.stringify({
        name,       // value from name input
        category,   // value from category input
      }),
    });

    // Convert response into JSON
    const data = await response.json();

    // Log result for debugging
    console.log(data);

    // Show success message
    Alert.alert("Success", "Hairstyle created");
  }

  return (
    <View>
      {/* Input field for hairstyle name */}
      <TextInput
        placeholder="Hairstyle name"
        value={name} // shows current state
        onChangeText={setName} // updates state when typing
      />

      {/* Input field for category */}
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      {/* Button to submit form */}
      <Button
        title="Upload Hairstyle"
        onPress={handleSubmit}
      />
    </View>
  );
}

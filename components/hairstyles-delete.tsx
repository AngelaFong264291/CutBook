import { Alert, Button, View } from "react-native";

type Props = {
  id: number;
};

export default function HairstylesDeleteScreen({ id }: Props) {
  async function handleDelete() {
    // Ask the backend to remove this hairstyle by id.
    const response = await fetch(`http://localhost:3001/hairstyles/${id}`, {
      method: "DELETE",
    });

    // Read the delete confirmation message from the backend.
    const data = await response.json();
    console.log(data);

    // Show a simple success alert after deletion.
    Alert.alert("Success", "Hairstyle deleted");
  }

  return (
    <View>
      {/* Trigger deletion for the selected hairstyle */}
      <Button title="Delete Hairstyle" color="red" onPress={handleDelete} />
    </View>
  );
}

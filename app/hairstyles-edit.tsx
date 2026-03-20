import HairstylesEditScreen from "@/components/hairstyles-edit";

export default function HairstylesEditPage() {
  return (
    // For now this page edits a sample hairstyle record with id 1.
    <HairstylesEditScreen
      id={1}
      initialName="Buzz Cut"
      initialCategory="Short"
      initialPublished={false}
    />
  );
}

import { ThemedScreen } from "@/components/ThemedScreen";
import { Text } from "react-native";

export default function Index() {
  return (
    <ThemedScreen className="flex-1">
      <Text className="text-primary">
        Welcome
      </Text>
    </ThemedScreen>
  );
}

import SearchBar from "@/components/SearchBar";
import { ThemedScreen } from "@/components/ThemedScreen";
import { images } from "@/constants/images";
import '@/services/api';
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <ThemedScreen className="flex-1">
      <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={images.logo} className="size-36 mt-20 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar 
            onPress={() => router.push("/search")}
            placeholder="Search for music"
          />
        </View>
      </ScrollView>
    </ThemedScreen>
  );
}

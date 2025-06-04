import SearchBar from "@/components/SearchBar";
import { ThemedScreen } from "@/components/ThemedScreen";
import { images } from "@/constants/images";
import '@/services/api';
import { fetchMusic } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const { data: music, loading: musicLoading, error: musicError } = useFetch(() => fetchMusic({
    query: "",
  }));

  return (
    <ThemedScreen className="flex-1">
      <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={images.logo} className="size-36 mt-20 mx-auto" />
        {musicLoading ? (
          <ActivityIndicator
            size="large"
            className="mt-10 self-center"
          />
        ) : musicError ? (
          <Text>Error: {musicError?.message}</Text>
        ) : (
          <View>
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for music"
              />
              <>
                <Text className="font-bold mt-7 ml-2 text-secondary text-2xl">Latest music</Text>
                <FlatList
                  data={music}
                  renderItem={({ item }) => (
                    <Text
                      className="text-lg text-primary mt-2">{item.title}
                    </Text>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32 ml-2"
                  scrollEnabled={false}
                />
              </>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedScreen>
  );
}

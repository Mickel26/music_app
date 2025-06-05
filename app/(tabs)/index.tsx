import MusicCard from "@/components/MusicCard";
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
        <Image source={images.logo} className="size-36 mt-20 mx-auto" resizeMode="cover"/>
        {musicLoading ? (
          <ActivityIndicator
            size="large"
            className="mt-10 self-center"
          />
        ) : musicError ? (
          <Text>Error: {musicError?.message}</Text>
        ) : (
          <View>
            <View className="flex-1">
              <SearchBar
                value=""
                onChangeText={() => {}}
                onPress={() => router.push("/search")}
                placeholder="Search for music"
              />
              <>
                <Text className="font-bold mt-5 ml-4 text-primary text-2xl">Popular albums</Text>
                <FlatList
                  data={music}
                  renderItem={({ item }) => (
                    <MusicCard
                      {...item}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="mt-4 pb-32 ml-2"
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

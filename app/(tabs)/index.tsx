import MusicCard from "@/components/MusicCard";
import SearchBar from "@/components/SearchBar";
import { ThemedScreen } from "@/components/ThemedScreen";
import TrendingCard from "@/components/TrendingCard";
import { images } from "@/constants/images";
import { TrendingAlbum } from "@/interfaces/interfaces";
import '@/services/api';
import { fetchMusic } from "@/services/api";
import { getTrendingAlbums } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";


function groupTrendingAlbums(albums: TrendingAlbum[]) {
  const map = new Map();
  for (const album of albums) {
    if (map.has(album.album_id)) {
      const existing = map.get(album.album_id);
      map.set(album.album_id, {
        ...existing,
        count: existing.count + album.count,
      });
    } else {
      map.set(album.album_id, { ...album });
    }
  }
  return Array.from(map.values());
}

export default function Index() {
  const router = useRouter();

  const { data: trendingAlbums, loading: trendingLoading, error: trendingError } = useFetch(getTrendingAlbums)

  const { data: music, loading: musicLoading, error: musicError } = useFetch(() => fetchMusic({
    query: "",
  }));

  const groupedTrendingAlbums = trendingAlbums ? groupTrendingAlbums(trendingAlbums) : [];

  return (
    <ThemedScreen className="flex-1">
      <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={images.logo} className="size-36 mt-20 mx-auto" resizeMode="cover" />
        {musicLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            className="mt-10 self-center"
          />
        ) : musicError || trendingError ? (
          <Text>Error: {musicError?.message || trendingError?.message}</Text>
        ) : (
          <View>
            <View className="flex-1">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for music"
              />

              {trendingAlbums && (
                <View className="mt-7">
                  <Text className="font-bold ml-3 text-primary text-2xl">Trending albums</Text>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-8" />}
                    className="mb-4 mt-3"
                    data={groupedTrendingAlbums}
                    renderItem={({ item, index }) => (
                      <TrendingCard album={item} index={index} />
                    )}
                    keyExtractor={(item) => item.album_id.toString()}
                  />
                </View>
              )}

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

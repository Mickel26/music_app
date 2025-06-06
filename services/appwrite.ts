import { Album, TrendingAlbum } from "@/interfaces/interfaces";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
const database = new Databases(client);

export const updateSearchCount = async (query: string, album: Album) => {
    try {

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query),
        ])

        if (result.documents.length > 0) {
            const existingAlbum = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingAlbum.$id,
                {
                    count: existingAlbum.count + 1,
                }
            )
        }
        else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    album_id: album.id,
                    count: 1,
                    title: album.title,
                    cover_url: album.cover_big,
                }
            )
        }
    } catch (error) {
        console.log('Error updating search count:', error);
        throw error;
    }
}

export const getTrendingAlbums = async (): Promise<TrendingAlbum[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents as unknown as TrendingAlbum[];
    }
    catch (error) {
        console.log('Error fetching trending albums:', error);
        return undefined;
    }
}
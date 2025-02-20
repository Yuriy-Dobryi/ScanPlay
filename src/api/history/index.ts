import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export type HistoryItem = {
  id: string;
  imageUrl: string;
  title: string;
  createdAt: number;
};

export const getHistoryList = async (): Promise<HistoryItem[]> => {
  try {
    const uid = auth().currentUser?.uid;
    if (!uid) throw new Error("User ID not found");

    const historyListSnapshot = await database()
      .ref(`/users/${uid}/history-list`)
      .orderByChild("title")
      .once("value");
    const historyList = historyListSnapshot.val();

    return historyList
      ? Object.entries(historyList)
          .map(([key, value]) => ({
            id: key,
            ...(value as Omit<HistoryItem, "id">),
          }))
          .sort((a, b) => a.title.localeCompare(b.title))
      : [];
  } catch (error) {
    console.error("Error fetching history list:", error);
    return [];
  }
};

export const addHistoryItem = async ({
  imageUrl,
  title,
}: Omit<HistoryItem, "id" | "createdAt">) => {
  try {
    const uid = auth().currentUser?.uid;
    if (!uid) throw new Error("User ID not found");

    const newItemRef = database().ref(`/users/${uid}/history-list`).push();
    await newItemRef.set({
      imageUrl,
      title,
      createdAt: database.ServerValue.TIMESTAMP,
    });

    return newItemRef;
  } catch (error) {
    console.error("Error adding history item:", error);
    return null;
  }
};

export const getMediaItemById = async (
  id: string
): Promise<HistoryItem | null> => {
  try {
    const snapshot = await database().ref(`/video-list/${id}`).once("value");

    const result = snapshot.val();
    if (!result) return null;

    return { id, ...(result as Omit<HistoryItem, "id">) };
  } catch (error) {
    console.error("Error searching media item:", error);
    return null;
  }
};

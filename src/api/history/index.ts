import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export type HistoryItemT = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  mediaUrl: string;
  createdAt: number;
};

export const getHistoryList = async (): Promise<HistoryItemT[]> => {
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
            ...(value as Omit<HistoryItemT, "id">),
          }))
          .sort((a, b) => a.title.localeCompare(b.title))
      : [];
  } catch (error) {
    console.error("Error fetching history list:", error);
    return [];
  }
};

export const addHistoryItem = async (data: Omit<HistoryItemT, "createdAt">) => {
  try {
    const uid = auth().currentUser?.uid;
    if (!uid) throw new Error("User ID not found");

    const newItemRef = database().ref(`/users/${uid}/history-list/${data.id}`);
    await newItemRef.set({
      createdAt: database.ServerValue.TIMESTAMP,
      ...data,
    });

    return newItemRef;
  } catch (error) {
    console.error("Error adding history item:", error);
    return null;
  }
};

export const getMediaItemById = async (
  id: string
): Promise<HistoryItemT | null> => {
  try {
    const snapshot = await database().ref(`/video-list/${id}`).once("value");

    const result = snapshot.val();
    if (!result) return null;

    return { id, ...(result as Omit<HistoryItemT, "id">) };
  } catch (error) {
    console.error("Error searching media item:", error);
    return null;
  }
};

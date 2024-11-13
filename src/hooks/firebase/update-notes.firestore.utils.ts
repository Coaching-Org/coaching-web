import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

export const useUpdateNotesFirestoreUtils = ({
  notesId,
}: {
  notesId: string;
}) => {
  const onFirestoreUpdateNotes = async (data: any) => {
    console.log("data payload", data);
    try {
      await updateDoc(doc(firestoreDb, fsCollectionKey.notes, notesId), {
        ...data,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    state: {},
    event: { onFirestoreUpdateNotes },
  };
};

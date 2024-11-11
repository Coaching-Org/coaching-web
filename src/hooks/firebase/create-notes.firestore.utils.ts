import { addDoc, collection, doc } from "firebase/firestore";
import { useCoachingContext } from "../context";
import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

export const useCreateNotesFirestoreUtils = () => {
  const onFirestoreSaveNotes = async (data: any) => {
    const id = uuidv4();
    try {
      // Add new notes to firestore
      const notesRef = await addDoc(
        collection(firestoreDb, fsCollectionKey.notes),
        {
          id,
          ...data,
        }
      );
      console.log("notesRef", notesRef);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    state: {},
    event: { onFirestoreSaveNotes },
  };
};

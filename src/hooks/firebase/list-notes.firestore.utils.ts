import { useAuth } from "@/auth";
import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useListNotesFirestoreUtils = () => {
  const { userId } = useAuth();
  const [notesList, setNotesList] = useState<any[]>([]);

  const getFsNotes = async () => {
    try {
      const queryGetNotesList = query(
        collection(firestoreDb, fsCollectionKey.notes),
        where("coachId", "==", userId)
      );

      const getNotesListSnapshot = (await getDocs(queryGetNotesList)).docs
        .map((doc) => doc.data())
        .map((item: any) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          const duration =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60);
          return {
            ...item,
            duration: Math.ceil(duration),
          };
        });
      console.log("getNotesListSnapshot", getNotesListSnapshot);
      setNotesList(getNotesListSnapshot);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getFsNotes();
  }, []);

  return {
    state: { fsNotes: notesList },
    event: {},
  };
};

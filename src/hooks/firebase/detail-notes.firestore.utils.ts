import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { useParams } from "@tanstack/react-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useDetailNotesFirestoreUtils = ({
  notesId,
}: {
  notesId: string;
}) => {
  const [notesData, setNotesData] = useState<any>();

  const getNotesDetail = async () => {
    try {
      const docRef = doc(firestoreDb, fsCollectionKey.notes, notesId);
      const docSnap = await getDoc(docRef);
      setNotesData(docSnap.data());
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getNotesDetail();
  }, []);

  return {
    state: { notesData },
    event: {},
  };
};

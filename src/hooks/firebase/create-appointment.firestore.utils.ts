import { PostAppointmentRequest } from "@/interfaces/";
import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface fsAppointmentProps extends PostAppointmentRequest {
  coachName?: string | null;
  coacheeName?: string | null;
  courseName?: string | null;
  status: string;
}

export const useCreateAppointmentFirestoreUtils = () => {
  const addFirestoreAppointments = async (data: fsAppointmentProps) => {
    const id = uuidv4();
    try {
      const docRef = await addDoc(
        collection(firestoreDb, fsCollectionKey.appointments),
        {
          id,
          ...data,
          status: "pending",
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        }
      );
    } catch (error) {
      console.error("error", error);
    }
  };
  const onFirestoreSaveAppointments = (data: fsAppointmentProps) => {
    addFirestoreAppointments(data as any);
    console.log("onFirestoreSaveAppointments", data);
  };
  return { event: { onFirestoreSaveAppointments } };
};

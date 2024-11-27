import { PostAppointmentRequest } from "@/interfaces/";
import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

interface fsAppointmentProps extends PostAppointmentRequest {
  coachName?: string | null;
  coacheeName?: string | null;
  courseName?: string | null;
  status: string;
  fsSessionDate?: any;
}

export const useCreateAppointmentFirestoreUtils = () => {
  const addFirestoreAppointments = async (data: fsAppointmentProps) => {
    const id = uuidv4();
    console.log("Create Session", data);
    try {
      await setDoc(doc(firestoreDb, fsCollectionKey.appointments, id), {
        id,
        ...data,
        status: "pending",
        sessionName: `${data.courseName} - ${data.coacheeName} ${moment(new Date()).format("DD/MM/YYYY")}`,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
        import: false,
      });
      // const docRef = await addDoc(
      //   collection(firestoreDb, fsCollectionKey.appointments),
      //   {
      //     id,
      //     ...data,
      //     status: "pending",
      //     createdAt: Timestamp.fromDate(new Date()),
      //     updatedAt: Timestamp.fromDate(new Date()),
      //   }
      // );
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  };
  const onFirestoreSaveAppointments = (data: fsAppointmentProps) => {
    addFirestoreAppointments(data as any);
  };
  return { event: { onFirestoreSaveAppointments } };
};

import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

/**
 * Appointment Status
 * - Pending - pending
 * - On Progress - on-progress
 * - Done - done
 */

export const useUpdateAppointmentFirestoreUtils = ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  const onFirestoreUpdateAppointment = async (data: any) => {
    try {
      await updateDoc(
        doc(firestoreDb, fsCollectionKey.appointments, appointmentId),
        { ...data, updatedAt: Timestamp.fromDate(new Date()) }
      );
    } catch (error) {
      throw error;
    }
  };

  return {
    state: {},
    event: { onFirestoreUpdateAppointment },
  };
};

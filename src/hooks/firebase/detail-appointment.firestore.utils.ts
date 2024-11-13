import { AppointmentDetailV2 } from "@/interfaces";
import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import { useParams } from "@tanstack/react-router";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useDetailAppointmentFirestoreUtils = () => {
  const { notesId } = useParams({ from: "/_auth/$notesId/NoteDetail" });
  const [appointmentDetail, setAppointmentDetail] =
    useState<AppointmentDetailV2>();

  const getAppointmentDetail = async () => {
    console.log("notesId", notesId);
    try {
      const docRef = doc(firestoreDb, fsCollectionKey.appointments, notesId);
      const docSnap = await getDoc(docRef);
      console.log("docSnap", docSnap.data());
      setAppointmentDetail(docSnap.data() as AppointmentDetailV2);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAppointmentDetail();
  }, []);
  return {
    state: { appointmentDetail },
    event: {},
  };
};

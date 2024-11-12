import { useAuth } from "@/auth";
import { Appointment } from "@/interfaces/appointment";
import { firestoreDb, fsCollectionKey } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useAppointmentsFirestoreUtils = () => {
  const { userId } = useAuth();
  const [appointmentData, setAppointmentData] = useState<Appointment[] | null>(
    null
  );
  const [totalAppointmentData, setTotalAppointmentData] = useState<number>(0);
  const [totalDoneAppointmentData, setTotalDoneAppointmentData] =
    useState<number>(0);
  const [totalPendingAppointmentData, setTotalPendingAppointmentData] =
    useState<number>(0);

  const addFsDocs = async () => {
    const id = uuidv4();
    console.log("docRef addFsDocs");
    try {
      const docRef = await addDoc(
        collection(firestoreDb, fsCollectionKey.appointments),
        {
          id,
        }
      );
      console.log("docRef", docRef);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getFsDoc = async () => {
    try {
      const queryGetAppointmentsQuery = query(
        collection(firestoreDb, fsCollectionKey.appointments),
        where("coachId", "==", userId),
        where("status", "!=", "done")
      );

      const getAppointmentsSnapshot = (
        await getDocs(queryGetAppointmentsQuery)
      ).docs
        .map((doc) => doc.data())
        .map((item) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          const duration =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60);
          return {
            ...item,
            date: item.startDate,
            startDate: item.startDate,
            endDate: item.endDate,
            duration: Math.ceil(duration),
          };
        });

      console.log("getAppointmentsSnapshot", getAppointmentsSnapshot);
      setAppointmentData(getAppointmentsSnapshot as any);
    } catch (error) {
      throw error;
    }
  };

  const getFsTotalAppointment = async () => {
    try {
      const queryGetTotalAppointmentQuery = query(
        collection(firestoreDb, fsCollectionKey.appointments),
        where("coachId", "==", userId)
      );
      const getTotalAppointmentSnapshot = (
        await getDocs(queryGetTotalAppointmentQuery)
      ).size;
      console.log("getTotalAppointmentSnapshot", getTotalAppointmentSnapshot);
      setTotalAppointmentData(getTotalAppointmentSnapshot);
    } catch (error) {
      throw error;
    }
  };

  const getFsTotalDoneAppointment = async () => {
    try {
      const queryGetTotalDoneAppointmentQuery = query(
        collection(firestoreDb, fsCollectionKey.appointments),
        where("coachId", "==", userId),
        where("status", "==", "done")
      );
      const getTotalDoneAppointmentSnapshot = (
        await getDocs(queryGetTotalDoneAppointmentQuery)
      ).size;
      console.log(
        "getTotalDoneAppointmentSnapshot",
        getTotalDoneAppointmentSnapshot
      );
      setTotalDoneAppointmentData(getTotalDoneAppointmentSnapshot);
    } catch (error) {
      throw error;
    }
  };

  const getFsTotalPendingAppointment = async () => {
    try {
      const queryGetTotalPendingAppointmentQuery = query(
        collection(firestoreDb, fsCollectionKey.appointments),
        where("coachId", "==", userId),
        where("status", "==", "pending")
      );
      const getTotalPendingAppointmentSnapshot = (
        await getDocs(queryGetTotalPendingAppointmentQuery)
      ).size;
      console.log(
        "getTotalPendingAppointmentSnapshot",
        getTotalPendingAppointmentSnapshot
      );
      setTotalPendingAppointmentData(getTotalPendingAppointmentSnapshot);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getFsDoc();
    getFsTotalAppointment();
    getFsTotalDoneAppointment();
    getFsTotalPendingAppointment();
  }, []);

  return {
    state: {
      fsData: appointmentData,
      fsTotalAppointment: totalAppointmentData,
      fsApprovedAppointment: totalDoneAppointmentData,
      fsPendingAppointment: totalPendingAppointmentData,
    },
    event: {},
  };
};

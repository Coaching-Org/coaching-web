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
  WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UserTotalAppointment {
  coacheeId: number;
  total: number;
}

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
  const [totalUserAppointmentData, setTotalUserAppointmentData] = useState<
    UserTotalAppointment[]
  >([]);

  const addFsDocs = async () => {
    const id = uuidv4();
    try {
      const docRef = await addDoc(
        collection(firestoreDb, fsCollectionKey.appointments),
        {
          id,
        }
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  const getFsDoc = async () => {
    try {
      const queryGetAppointmentsQuery = query(
        collection(firestoreDb, fsCollectionKey.appointments),
        where("coachId", "==", userId),
        where("status", "!=", "done"),
        orderBy("createdAt", "desc")
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
      setTotalPendingAppointmentData(getTotalPendingAppointmentSnapshot);
    } catch (error) {
      throw error;
    }
  };

  const getFsUserAppointment = async ({
    coacheeId,
  }: {
    coacheeId: number;
  }): Promise<number> => {
    try {
      const queryGetUserAppointmentQuery = query(
        collection(firestoreDb, fsCollectionKey.appointments),
        where("coacheeId", "==", coacheeId)
      );
      const getUserAppointmentSnapshot = (
        await getDocs(queryGetUserAppointmentQuery)
      ).size;

      return getUserAppointmentSnapshot;
    } catch (error) {
      return 0;
    }
  };

  const getFsAppointmentList = async (
    whereCondition: { field: string; operator: WhereFilterOp; value: any }[]
  ) => {
    try {
      const queryConditions = [
        ...whereCondition.map((item) =>
          where(item.field, item.operator as WhereFilterOp, item.value)
        ),
      ];
      const queryGetAppointmentsQuery = query(
        collection(firestoreDb, fsCollectionKey.appointments),
        ...queryConditions,
        orderBy("createdAt", "desc")
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

      setAppointmentData(getAppointmentsSnapshot as any);
      return getAppointmentsSnapshot as any;
    } catch (error) {
      throw error;
    }
  };

  const getUserTotalAppointment = async (coacheeId: number): Promise<any> => {
    const queryGetUserAppointmentQuery = query(
      collection(firestoreDb, fsCollectionKey.appointments)
      // where("coacheeId", "==", coacheeId)
    );

    const getTotalAppointment = (
      await getDocs(queryGetUserAppointmentQuery)
    ).docs.map((doc) => doc.data());

    const result = getTotalAppointment.reduce((acc, curr) => {
      const { coacheeId } = curr;
      const existing = acc.find((item: any) => item.coacheeId === coacheeId);

      if (existing) {
        existing.total += 1;
      } else {
        acc.push({ coacheeId, total: 1 });
      }

      return acc;
    }, []);

    setTotalUserAppointmentData(result as UserTotalAppointment[]);
  };

  useEffect(() => {
    getFsDoc();
    getFsTotalAppointment();
    getFsTotalDoneAppointment();
    getFsTotalPendingAppointment();
    getUserTotalAppointment(0);
  }, []);

  return {
    state: {
      fsData: appointmentData,
      fsTotalAppointment: totalAppointmentData,
      fsApprovedAppointment: totalDoneAppointmentData,
      fsPendingAppointment: totalPendingAppointmentData,
      fsCoacheeAppointment: getFsUserAppointment,
      fsTotalUserAppointment: totalUserAppointmentData,
    },
    event: {
      getFsAppointmentList,
    },
  };
};

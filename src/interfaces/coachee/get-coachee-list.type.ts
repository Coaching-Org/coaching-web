import { MetaPaginationResponse } from "../shared";

export interface GetCoacheeResponse {
  data: CoacheeDetail[];
  meta: MetaPaginationResponse;
}

export interface CoacheeDetail {
  email: string;
  id: number;
  name: string;
  numberOfAppointments: number;
  phone: string;
  recentAppointment: string;
  createdAt: string;
  updatedAt: string;
}

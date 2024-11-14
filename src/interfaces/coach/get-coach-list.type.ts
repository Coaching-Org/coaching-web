import { MetaPaginationResponse } from "../shared";

export interface GetCoachListResponse {
  data: CoachDetail[];
  meta: MetaPaginationResponse;
}

export interface CoachDetail {
  email: string;
  id: number;
  name: string;
  numberOfAppointments: number;
  phone: string;
  recentAppointment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  date: Date;
  courseId: number;
  courseName: string;
  coachId: number;
  coachName: string;
  coacheeId: number;
  coacheeName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

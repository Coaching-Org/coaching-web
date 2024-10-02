export interface Appointment {
  id: string;
  date: Date;
  courseId: string;
  courseName: string;
  coachId: string;
  coachName: string;
  coacheeId: string;
  coacheeName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

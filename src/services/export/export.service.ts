import { HttpService } from "../HttpServices";

export class ExportServices extends HttpService {
  static exportAppointments(signal?: AbortSignal) {
    return this.get("/v1/appointments/export", { signal });
  }

  static exportNotes(signal?: AbortSignal) {
    return this.get("/v1/appointment-notes/export", { signal });
  }

  static exportAllCoaches(signal?: AbortSignal) {
    return this.get("/v1/coaches/export", { signal });
  }

  static exportCoachesAppointments(
    params: { coachId: number },
    signal?: AbortSignal
  ) {
    return this.get(`/v1/appointments/export-coach?coachId=${params.coachId}`, {
      signal,
    });
  }
}

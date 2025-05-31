import { BaseRepository } from "./BaseRepository";

export interface Appointment {
  id?: number;
  patient_id: number;
  doctor_id: number;
  time: string;
  reason: string;
  finished?: number;      // 0 | 1
}

export class AppointmentRepository extends BaseRepository<Appointment> {
  constructor() {
    super("appointments");
  }

  // only unfinished appointments
  async pending() {
    return this.all("finished = 0");
  }

  async finish(id: number) {
    await this.update(id, { finished: 1 });
  }
}
import { pool } from "../db";

export interface Appointment {
  id?: number;
  patient_id: number;
  doctor_id: number;
  time: string;
  reason: string;
  finished?: number;
}

export class AppointmentService {
  static async all() {
    const [rows] = await pool.query(
      "SELECT * FROM appointments WHERE finished = 0",
    );
    return rows;
  }

  static async find(id: number) {
    const [rows]: any = await pool.query(
      "SELECT * FROM appointments WHERE id = ?",
      [id],
    );
    return rows[0];
  }

  static async create(a: Appointment) {
    const [r]: any = await pool.query(
      "INSERT INTO appointments (patient_id, doctor_id, time, reason, finished) VALUES (?, ?, ?, ?, 0)",
      [a.patient_id, a.doctor_id, a.time, a.reason],
    );
    return { ...a, id: r.insertId, finished: 0 };
  }

  static async update(id: number, a: Appointment) {
    await pool.query(
      "UPDATE appointments SET patient_id = ?, doctor_id = ?, time = ?, reason = ? WHERE id = ?",
      [a.patient_id, a.doctor_id, a.time, a.reason, id],
    );
    return { ...a, id };
  }

  static async finish(id: number) {
    await pool.query("UPDATE appointments SET finished = 1 WHERE id = ?", [id]);
  }

  static async remove(id: number) {
    await pool.query("DELETE FROM appointments WHERE id = ?", [id]);
  }
}

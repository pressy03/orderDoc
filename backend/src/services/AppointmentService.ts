import { pool } from "../db";
export interface Appointment {
  id?: number;
  patient_id: number;
  doctor_id: number;
  time: string;
  reason: string;
}
export class AppointmentService {
  static async all() {
    const [rows] = await pool.query("select * from appointments");
    return rows;
  }
  static async find(id: number) {
    const [rows]: any = await pool.query(
      "select * from appointments where id=?",
      [id]
    );
    return rows[0];
  }
  static async create(a: Appointment) {
    const [r]: any = await pool.query(
      "insert into appointments (patient_id,doctor_id,time,reason) values (?,?,?,?)",
      [a.patient_id, a.doctor_id, a.time, a.reason]
    );
    return { ...a, id: r.insertId };
  }
  static async update(id: number, a: Appointment) {
    await pool.query(
      "update appointments set patient_id=?,doctor_id=?,time=?,reason=? where id=?",
      [a.patient_id, a.doctor_id, a.time, a.reason, id]
    );
    return { ...a, id };
  }
  static async remove(id: number) {
    await pool.query("delete from appointments where id=?", [id]);
  }
}

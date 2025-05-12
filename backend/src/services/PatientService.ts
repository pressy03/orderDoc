import { pool } from "../db";
export interface Patient { id?: number; name: string; birthdate: string; }

export class PatientService {
  static async all() {
    const [rows]: any = await pool.query("select * from patients");
    return rows;
  }

  static async find(id: number) {
    const [rows]: any = await pool.query(
      "select * from patients where id = ?",
      [id]
    );
    return rows[0];
  }
  static async create(p: Patient) {
    const [r]: any = await pool.query(
      "insert into patients (name, birthdate) values (?, ?)",
      [p.name, p.birthdate]
    );
    return { ...p, id: r.insertId };
  }

  static async update(id: number, p: Patient) {
    await pool.query(
      "update patients set name = ?, birthdate = ? where id = ?",
      [p.name, p.birthdate, id]
    );
    return { ...p, id };
  }

  static async remove(id: number) {
    await pool.query("delete from patients where id = ?", [id]);
  }
}

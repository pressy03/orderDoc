import { pool } from "../db";
export interface Doctor {
  id?: number;
  name: string;
  specialty: string;
}
export class DoctorService {
  static async all() {
    const [rows] = await pool.query("select * from doctors");
    return rows;
  }
  static async find(id: number) {
    const [rows]: any = await pool.query("select * from doctors where id=?", [
      id,
    ]);
    return rows[0];
  }
  static async create(d: Doctor) {
    const [r]: any = await pool.query(
      "insert into doctors (name,specialty) values (?,?)",
      [d.name, d.specialty]
    );
    return { ...d, id: r.insertId };
  }
  static async update(id: number, d: Doctor) {
    await pool.query("update doctors set name=?,specialty=? where id=?", [
      d.name,
      d.specialty,
      id,
    ]);
    return { ...d, id };
  }
  static async remove(id: number) {
    await pool.query("delete from doctors where id=?", [id]);
  }
}

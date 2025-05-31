import { pool } from "../db";

export abstract class BaseRepository<T extends { id?: number }> {
  constructor(private table: string) {}

  async all(where = "1", params: any[] = []): Promise<T[]> {
    const sql = "SELECT * FROM ?? WHERE " + where;
    const [rows] = await pool.query(sql, [this.table, ...params]);
    return rows as T[];
  }

  async find(id: number): Promise<T | null> {
    const sql = "SELECT * FROM ?? WHERE id = ? LIMIT 1";
    const [rows]: any = await pool.query(sql, [this.table, id]);
    return rows[0] ?? null;
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const sql = "INSERT INTO ?? SET ?";
    const [r]: any = await pool.query(sql, [this.table, data]);
    return { ...(data as any), id: r.insertId };
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const sql = "UPDATE ?? SET ? WHERE id = ?";
    await pool.query(sql, [this.table, data, id]);
    return { id, ...(data as any) } as T;
  }

  async remove(id: number) {
    await pool.query("DELETE FROM ?? WHERE id = ?", [this.table, id]);
  }
}
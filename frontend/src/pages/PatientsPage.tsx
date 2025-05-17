import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PatientForm from "../components/PatientForm";

interface Patient {
  id: number;
  name: string;
  birthdate: string;
}

export default function PatientsPage() {
  const [pts, setPts] = useState<Patient[]>([]);
  const [edit, setEdit] = useState<Patient | null>(null);
  const [query, setQuery] = useState("");

  const api = "http://localhost:3001/api/patients";
  const load = () => axios.get(api).then((r) => setPts(r.data));
  useEffect(() => {
    load();
  }, []);

  const save = (p: Omit<Patient, "id">) => {
    (edit ? axios.put(`${api}/${edit.id}`, p) : axios.post(api, p)).then(load);
    setEdit(null);
  };

  const del = (id: number) => axios.delete(`${api}/${id}`).then(load);

  const fmt = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}-${m}-${y}`;
  };

  const filtered = useMemo(
    () =>
      pts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase().trim())
      ),
    [pts, query],
  );

  return (
    <div className="page">
      <h1 className="text-2xl font-semibold mb-4">Patients</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search patient..."
        className="border p-2 rounded mb-4 w-full"
      />

      <PatientForm onSubmit={save} initial={edit} />

      <ul className="space-y-2">
        {filtered.map((x) => (
          <li
            key={x.id}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <span>{x.name} – {fmt(x.birthdate)}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setEdit(x)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                edit
              </button>
              <button
                onClick={() => del(x.id)}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                del
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import AppointmentForm from "../components/AppointmentForm";

interface Doctor { id: number; name: string }
interface Patient { id: number; name: string }
interface Appointment { id: number; patient_id: number; doctor_id: number; time: string; reason: string }

export default function AppointmentsPage() {
  const [docs, setDocs] = useState<Doctor[]>([]);
  const [pts, setPts] = useState<Patient[]>([]);
  const [apps, setApps] = useState<Appointment[]>([]);
  const [edit, setEdit] = useState<Appointment | null>(null);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<0 | 1 | 2>(2);

  const api = "http://localhost:3001/api";

  const load = () => Promise.all([
    axios.get(api + "/doctors").then(r => setDocs(r.data)),
    axios.get(api + "/patients").then(r => setPts(r.data)),
    axios.get(api + "/appointments").then(r => setApps(r.data))
  ]);

  useEffect(() => { load(); }, []);

  const save = (a: Omit<Appointment, "id">) => {
    (edit
      ? axios.put(`${api}/appointments/${edit.id}`, a)
      : axios.post(`${api}/appointments`, a)
    ).then(() => load());
    setEdit(null);
  };

  const del = (id: number) =>
    axios.delete(`${api}/appointments/${id}`).then(() => load());

  const dName = (id: number) => docs.find(d => d.id === id)?.name || "";
  const pName = (id: number) => pts.find(p => p.id === id)?.name || "";

  const formatDisplay = (datetime: string) => {
    const [date, time] = datetime.split(" ");
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year} ${time.slice(0, 5)}`;
  };

  const filtered = useMemo(() => {
    return apps.filter(a =>
      dName(a.doctor_id)
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    );
  }, [apps, query, docs]);

  const sorted = useMemo(() => {
    if (sortMode === 0) return filtered;
    const asc = sortMode === 1;
    return [...filtered].sort((a, b) =>
      asc ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time)
    );
  }, [filtered, sortMode]);

  const sortLabel = sortMode === 0 ? "≡" : sortMode === 1 ? "↑" : "↓";

  return (
    <div className="page">
      <h1 className="text-2xl font-semibold mb-4">Appointments</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter by doctor..."
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => setSortMode((sortMode + 1) % 3 as 0 | 1 | 2)}
          className="bg-gray-200 px-3 py-1 rounded"
          title="Sort mode"
        >
          {sortLabel}
        </button>
      </div>

      <AppointmentForm
        onSubmit={save}
        initial={edit}
        doctors={docs}
        patients={pts}
      />

      <ul className="space-y-2 mt-4">
        {sorted.map(a => (
          <li key={a.id}
            className="bg-white p-3 rounded shadow flex justify-between items-center">
            <span>
              {pName(a.patient_id)} ⇢ {dName(a.doctor_id)} –{" "}
              {formatDisplay(a.time)} – {a.reason}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setEdit(a)}
                className="px-2 py-1 bg-yellow-500 text-white rounded">
                edit
              </button>
              <button onClick={() => del(a.id)}
                className="px-2 py-1 bg-red-600 text-white rounded">
                del
              </button>
              <button onClick={() =>
                axios.patch(`${api}/appointments/${a.id}/finish`).then(() => load())
              }
                className="px-2 py-1 bg-green-600 text-white rounded">
                done
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

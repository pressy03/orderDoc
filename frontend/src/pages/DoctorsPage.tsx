import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import DoctorForm from '../components/DoctorForm';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export default function DoctorsPage() {
  const [docs, setDocs] = useState<Doctor[]>([]);
  const [edit, setEdit] = useState<Doctor | null>(null);
  const [query, setQuery] = useState("");

  const api = 'http://localhost:3001/api/doctors';
  const load = () => axios.get(api).then(r => setDocs(r.data));
  useEffect(() => { load(); }, []);

  const save = (d: Omit<Doctor, 'id'>) => {
    (edit
      ? axios.put(`${api}/${edit.id}`, d)
      : axios.post(api, d)
    ).then(load);
    setEdit(null);
  };

  const del = (id: number) => axios.delete(`${api}/${id}`).then(load);

  const filtered = useMemo(
    () => docs.filter(d =>
      d.name.toLowerCase().includes(query.toLowerCase().trim())
    ),
    [docs, query]
  );

  return (
    <div className="page">
      <h1 className="text-2xl font-semibold mb-4">Doctors</h1>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search doctor..."
        className="border p-2 rounded mb-4 w-full"
      />

      <DoctorForm onSubmit={save} initial={edit} />

      <ul className="space-y-2">
        {filtered.map(x => (
          <li key={x.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <span>{x.name} – {x.specialty}</span>
            <div className="flex gap-2">
              <button onClick={() => setEdit(x)} className="px-2 py-1 bg-yellow-500 text-white rounded">edit</button>
              <button onClick={() => del(x.id)} className="px-2 py-1 bg-red-600 text-white rounded">del</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

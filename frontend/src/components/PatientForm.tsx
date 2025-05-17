import { ChangeEvent, FormEvent, useEffect, useState } from "react";
interface Patient {
  id?: number;
  name: string;
  birthdate: string;
}
export default function PatientForm(
  { onSubmit, initial }: {
    onSubmit: (p: Omit<Patient, "id">) => void;
    initial: Patient | null;
  },
) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setName(initial?.name || "");
    setDate(
      initial
        ? `${initial.birthdate.slice(8, 10)}-${initial.birthdate.slice(5, 7)}-${
          initial.birthdate.slice(0, 4)
        }`
        : "",
    );
  }, [initial]);
  const fmt = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    if (d.length <= 2) return d;
    if (d.length <= 4) return d.slice(0, 2) + "-" + d.slice(2);
    return d.slice(0, 2) + "-" + d.slice(2, 4) + "-" + d.slice(4);
  };
  const handleDate = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(fmt(e.target.value));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || date.length !== 10) return;
    const [y, m, d] = [date.slice(6), date.slice(3, 5), date.slice(0, 2)];
    onSubmit({ name, birthdate: `${y}-${m}-${d}` });
    setName("");
    setDate("");
  };
  return (
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border px-2 py-1 flex-1 rounded"
        required
      />
      <input
        value={date}
        onChange={handleDate}
        placeholder="DD-MM-YYYY"
        className="border px-2 py-1 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        {initial ? "Update" : "Save"}
      </button>
    </form>
  );
}

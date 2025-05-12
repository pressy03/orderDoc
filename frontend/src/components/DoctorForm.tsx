
import { useState,useEffect,FormEvent } from "react";
interface Doctor{id?:number;name:string;specialty:string;}
export default function DoctorForm({onSubmit,initial}:{onSubmit:(d:Omit<Doctor,"id">)=>void;initial:Doctor|null}){
  const[name,setName]=useState("");const[spec,setSpec]=useState("");
  useEffect(()=>{setName(initial?.name||"");setSpec(initial?.specialty||"");},[initial]);
  const submit=(e:FormEvent)=>{e.preventDefault();onSubmit({name,specialty:spec});setName("");setSpec("");};
  return(
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border px-2 py-1 flex-1 rounded" required/>
      <input value={spec} onChange={e=>setSpec(e.target.value)} placeholder="Specialty" className="border px-2 py-1 flex-1 rounded" required/>
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">{initial?"Update":"Save"}</button>
    </form>
  );
}

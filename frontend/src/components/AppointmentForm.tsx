import { useState, useEffect, FormEvent, ChangeEvent } from "react";
interface Doctor{ id:number; name:string }
interface Patient{ id:number; name:string }
interface Appointment{ id?:number; patient_id:number; doctor_id:number; time:string; reason:string }
export default function AppointmentForm({onSubmit,initial,doctors,patients}:{onSubmit:(a:Omit<Appointment,"id">)=>void; initial:Appointment|null; doctors:Doctor[]; patients:Patient[]}){
  const[pId,setPId]=useState(0);
  const[dId,setDId]=useState(0);
  const[date,setDate]=useState("");
  const[time,setTime]=useState("");
  const[reason,setReason]=useState("");
  useEffect(()=>{setPId(initial?.patient_id||0);setDId(initial?.doctor_id||0);
    if(initial){setDate(initial.time.slice(8,10)+"-"+initial.time.slice(5,7)+"-"+initial.time.slice(0,4));setTime(initial.time.slice(11,16));setReason(initial.reason);}else{setDate("");setTime("");setReason("");}},[initial]);
  const fmt=(v:string)=>{const d=v.replace(/\D/g,"").slice(0,8);if(d.length<=2)return d;if(d.length<=4)return d.slice(0,2)+"-"+d.slice(2);return d.slice(0,2)+"-"+d.slice(2,4)+"-"+d.slice(4);};
  const handleDate=(e:ChangeEvent<HTMLInputElement>)=>setDate(fmt(e.target.value));
  const submit=(e:FormEvent)=>{e.preventDefault();
    if(!pId||!dId||date.length!==10||!time)return;
    const[y,m,d]=[date.slice(6),date.slice(3,5),date.slice(0,2)];
    const [hh,mm]=time.split(":");
    const dt=new Date(Number(y),Number(m)-1,Number(d),Number(hh),Number(mm));
    if(dt<new Date())return;
    const datetime=`${y}-${m}-${d} ${time}:00`;
    onSubmit({patient_id:pId,doctor_id:dId,time:datetime,reason});
    setPId(0);setDId(0);setDate("");setTime("");setReason("");};
  return(
    <form onSubmit={submit} className="space-y-2 bg-white p-4 rounded shadow">
      <div className="flex gap-2">
        <select value={pId} onChange={e=>setPId(+e.target.value)} className="border p-2 flex-1" required>
          <option value={0}>Patient</option>{patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={dId} onChange={e=>setDId(+e.target.value)} className="border p-2 flex-1" required>
          <option value={0}>Doctor</option>{doctors.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        <input value={date} onChange={handleDate} placeholder="DD-MM-YYYY" className="border p-2 flex-1" required/>
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="border p-2 flex-1" step="60" required/>
      </div>
      <input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason" className="border p-2 w-full" required/>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{initial?"Update":"Save"}</button>
    </form>);
}

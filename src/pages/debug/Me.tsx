import { useEffect, useState } from "react";
import api from "../../api/client";
import type { User } from "../../types";

export default function Me() {
  const [me,setMe]=useState<User|null>(null);
  const [err,setErr]=useState<string>("");

  useEffect(()=>{ (async()=>{
    try { const {data}=await api.get<User>("/api/me"); setMe(data); setErr(""); }
    catch(e:any){ setErr(e?.response?.data ?? "Unauthorized"); setMe(null); }
  })(); },[]);

  return (
    <div>
      <h2>/api/me</h2>
      {me ? <pre>{JSON.stringify(me,null,2)}</pre> : <div style={{color:"crimson"}}>{err}</div>}
    </div>
  );
}

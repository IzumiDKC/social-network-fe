import { useEffect, useState } from "react";
import api from "../../api/client";

export default function Health() {
  const [data,setData]=useState<any>(null);
  const [err,setErr]=useState("");
  useEffect(()=>{ (async()=>{
    try{ const {data}=await api.get("/actuator/health"); setData(data); setErr(""); }
    catch(e:any){ setErr(e?.message ?? "error"); }
  })(); },[]);
  return (
    <div>
      <h2>/actuator/health</h2>
      {data ? <pre>{JSON.stringify(data,null,2)}</pre> : <div style={{color:"crimson"}}>{err}</div>}
    </div>
  );
}

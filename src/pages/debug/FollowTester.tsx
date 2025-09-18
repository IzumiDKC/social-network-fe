import { useState } from "react";
import api from "../../api/client";
import type { Page } from "../../types";

export default function FollowTester() {
  const [targetId,setTargetId]=useState<string>("");
  const [msg,setMsg]=useState("");
  const [followers,setFollowers]=useState<number|null>(null);
  const [following,setFollowing]=useState<number|null>(null);

  const follow = async()=>{ await api.post(`/api/users/${targetId}/follow`); setMsg("Followed"); await count(); };
  const unfollow = async()=>{ await api.delete(`/api/users/${targetId}/follow`); setMsg("Unfollowed"); await count(); };
  const count = async()=>{
    const fw = await api.get<Page<unknown>>(`/api/users/${targetId}/followers`,{params:{page:0,size:1}});
    const fg = await api.get<Page<unknown>>(`/api/users/${targetId}/following`,{params:{page:0,size:1}});
    setFollowers(fw.data.totalElements); setFollowing(fg.data.totalElements);
  };

  return (
    <div>
      <h2>Follow Tester</h2>
      <input placeholder="target userId" value={targetId} onChange={e=>setTargetId(e.target.value)} />
      <button onClick={follow} disabled={!targetId}>Follow</button>
      <button onClick={unfollow} disabled={!targetId}>Unfollow</button>
      <button onClick={count} disabled={!targetId}>Recount</button>
      <div>{msg}</div>
      <div>Followers: {followers ?? "-" } · Following: {following ?? "-"}</div>
    </div>
  );
}

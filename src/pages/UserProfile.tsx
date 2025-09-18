import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/client";
import type { Page } from "../types";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const fw = await api.get<Page<unknown>>(`/api/users/${id}/followers`, { params: { page: 0, size: 1 } });
    const fg = await api.get<Page<unknown>>(`/api/users/${id}/following`, { params: { page: 0, size: 1 } });
    setFollowers(fw.data.totalElements);
    setFollowing(fg.data.totalElements);
  };

  useEffect(() => { load(); }, [id]);

  const follow = async () => { await api.post(`/api/users/${id}/follow`); setMsg("Followed"); load(); };
  const unfollow = async () => { await api.delete(`/api/users/${id}/follow`); setMsg("Unfollowed"); load(); };

  return (
    <div>
      <h2>User #{id}</h2>
      <div>Followers: {followers} · Following: {following}</div>
      <button onClick={follow}>Follow</button>
      <button onClick={unfollow}>Unfollow</button>
      <div>{msg}</div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../api/client";

export default function useFollowingIds() {
  const [ids, setIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<number[]>("/api/users/me/following-ids");
      setIds(new Set(data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const add = (id: number) => setIds(prev => new Set([...prev, id]));
  const remove = (id: number) => {
    const next = new Set(ids);
    next.delete(id);
    setIds(next);
  };

  return { ids, loading, refresh, add, remove };
}

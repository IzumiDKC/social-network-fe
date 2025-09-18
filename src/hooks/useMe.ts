import { useEffect, useState } from "react";
import api from "../api/client";
import type { User } from "../types";

export default function useMe() {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<User>("/api/me");
      setMe(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  return { me, loading, refresh };
}

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";
import type { User } from "../../types";
import { Card, CardBody } from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import useFollowingIds from "../../hooks/useFollowingIds";
import useMe from "../../hooks/useMe";

export default function PeoplePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [q, setQ] = useState("");

  const { me, loading: meLoading } = useMe();
  const currentUserId = me?.id;

  const { ids: followingIds, add, remove, loading: followingLoading } = useFollowingIds();

  useEffect(() => {
    (async () => {
      const { data } = await api.get<User[]>("/api/users");
      setUsers(data);
    })();
  }, []);

  const filtered = useMemo(
    () => users.filter(u => u.username.toLowerCase().includes(q.toLowerCase())),
    [users, q]
  );

  const onFollow = async (id: number) => {
    await api.post(`/api/users/${id}/follow`);
    add(id); // optimistic
  };

  const onUnfollow = async (id: number) => {
    await api.delete(`/api/users/${id}/follow`);
    remove(id);
  };

  const loading = meLoading || followingLoading;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Discover people</h1>

      <Input
        placeholder="Search username..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <Card>
        <CardBody>
          <ul className="divide-y">
            {filtered.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={u.username} />
                  <div>
                    <Link to={`/users/${u.id}`} className="font-medium">
                      @{u.username}
                    </Link>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </div>
                </div>

                {/* Nút follow/unfollow – ẩn nếu là chính mình */}
                <div className="flex gap-2">
                  {currentUserId === u.id ? (
                    <span className="text-xs text-slate-400">This is you</span>
                  ) : loading ? (
                    <span className="text-sm text-slate-400">...</span>
                  ) : followingIds.has(u.id) ? (
                    <Button variant="outline" onClick={() => onUnfollow(u.id)}>Unfollow</Button>
                  ) : (
                    <Button variant="outline" onClick={() => onFollow(u.id)}>Follow</Button>
                  )}
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="py-10 text-center text-slate-500">No users</li>
            )}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

// src/pages/real/SearchPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";
import Input from "../../components/ui/Input";
import { Card, CardBody } from "../../components/ui/Card";
import PostCard from "../../components/PostCard";
import type { PostResp, User } from "../../types";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import useFollowingIds from "../../hooks/useFollowingIds";
import useMe from "../../hooks/useMe";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<PostResp[]>([]);

  // ai đang đăng nhập
  const { me, loading: meLoading } = useMe();
  const currentUserId = me?.id ?? null;

  // set các id mình đang follow
  const {
    ids: followingIds,
    add,
    remove,
    loading: followingLoading,
  } = useFollowingIds();

  const loading = meLoading || followingLoading;

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.get("/api/search", { params: { q } });
    setUsers(data.users);
    setPosts(data.posts);
  };

  const follow = async (id: number) => {
    await api.post(`/api/users/${id}/follow`);
    add(id); // optimistic update
  };

  const unfollow = async (id: number) => {
    await api.delete(`/api/users/${id}/follow`);
    remove(id);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={search} className="flex gap-2">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts or users..."
        />
        <button className="rounded-xl border px-4">Search</button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <Card>
          <CardBody>
            {users.length === 0 ? (
              <div className="text-slate-500">No users</div>
            ) : (
              <ul className="divide-y">
                {users.map((u) => {
                  const isMe = currentUserId === u.id;
                  const isFollowing = followingIds.has(u.id);
                  return (
                    <li key={u.id} className="py-3 flex items-center gap-3">
                      <Avatar name={u.username} />
                      <Link to={`/users/${u.id}`} className="font-medium">
                        @{u.username}
                      </Link>
                      <span className="text-xs text-slate-500">{u.email}</span>

                      <div className="ml-auto">
                        {isMe ? (
                          <span className="text-xs text-slate-400">This is you</span>
                        ) : loading ? (
                          <span className="text-sm text-slate-400">...</span>
                        ) : isFollowing ? (
                          <Button variant="outline" onClick={() => unfollow(u.id)}>
                            Unfollow
                          </Button>
                        ) : (
                          <Button variant="outline" onClick={() => follow(u.id)}>
                            Follow
                          </Button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Posts</h2>
        {posts.length === 0 ? (
          <div className="text-slate-500">No posts</div>
        ) : (
          posts.map((p) => <PostCard key={p.id} p={p} />)
        )}
      </div>
    </div>
  );
}

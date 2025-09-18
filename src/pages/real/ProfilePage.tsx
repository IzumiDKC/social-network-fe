import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/client";
import type { Page, PostResp, User } from "../../types";
import PostCard from "../../components/PostCard";
import Button from "../../components/ui/Button";
import useFollowingIds from "../../hooks/useFollowingIds";
import useMe from "../../hooks/useMe";
import Avatar from "../../components/ui/Avatar";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const targetId = Number(id);

  const { me, loading: meLoading } = useMe();
  const currentUserId = me?.id;
  const isMe = currentUserId === targetId;

  const { ids: followingIds, add, remove, loading: followingLoading } = useFollowingIds();

  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<{ followers: number; following: number }>({ followers: 0, following: 0 });
  const [posts, setPosts] = useState<PostResp[]>([]);

  // Lấy user + stats
  useEffect(() => {
    (async () => {
      try {
        // Nếu có /api/users/{id}, dùng thẳng (khuyến nghị). Ở đây tạm lấy từ /api/users.
        const { data } = await api.get<User[]>("/api/users");
        const u = data.find((x) => x.id === targetId) || null;
        setUser(u ?? { id: targetId, username: `user-${targetId}`, email: "" } as User);
      } catch {
        setUser({ id: targetId, username: `user-${targetId}`, email: "" } as User);
      }

      const fw = await api.get<Page<unknown>>(`/api/users/${targetId}/followers`, { params: { page: 0, size: 1 } });
      const fg = await api.get<Page<unknown>>(`/api/users/${targetId}/following`, { params: { page: 0, size: 1 } });
      setStats({ followers: fw.data.totalElements, following: fg.data.totalElements });
    })();
  }, [targetId]);

  // Lấy bài viết của user
  useEffect(() => {
    (async () => {
      if (!user?.username) return;
      const { data: page } = await api.get<Page<PostResp>>(`/api/posts/user/${user.username}`, {
        params: { page: 0, size: 10 },
      });
      setPosts(page.content);
    })();
  }, [user?.username]);

  const follow = async () => {
    await api.post(`/api/users/${targetId}/follow`);
    add(targetId);
    setStats((s) => ({ ...s, followers: s.followers + 1 }));
  };

  const unfollow = async () => {
    await api.delete(`/api/users/${targetId}/follow`);
    remove(targetId);
    setStats((s) => ({ ...s, followers: Math.max(0, s.followers - 1) }));
  };

  const loading = meLoading || followingLoading;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-5">
        <div className="flex items-center gap-4">
          <Avatar name={user?.username || "User"} size={48} />
          <div className="flex-1">
            <h1 className="text-xl font-semibold">@{user?.username}</h1>
            <div className="text-sm text-slate-600">{user?.email}</div>
            <div className="text-sm text-slate-600 mt-1">
              Followers: {stats.followers} · Following: {stats.following}
            </div>
          </div>

          {/* Nút Follow/Unfollow (ẩn nếu là chính mình) */}
          {!isMe && (
            <div>
              {loading ? (
                <span className="text-sm text-slate-400">...</span>
              ) : followingIds.has(targetId) ? (
                <Button variant="outline" onClick={unfollow}>Unfollow</Button>
              ) : (
                <Button variant="outline" onClick={follow}>Follow</Button>
              )}
            </div>
          )}
          {isMe && <span className="text-xs text-slate-400">This is you</span>}
        </div>
      </div>

      <div>
        <h2 className="font-medium mb-2">Posts</h2>
        {posts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-center text-slate-500">No posts from this user.</div>
        ) : (
          posts.map((p) => <PostCard key={p.id} p={p} onChanged={() => null} />)
        )}
      </div>
    </div>
  );
}

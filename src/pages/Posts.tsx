import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/client";
import type { Page, PostResp } from "../types";

export default function Posts() {
  const [items, setItems] = useState<PostResp[]>([]);
  const [page, setPage] = useState(0);
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const load = async (p = 0) => {
    const { data } = await api.get<Page<PostResp>>("/api/posts", { params: { page: p, size: 10 } });
    setItems(p === 0 ? data.content : [...items, ...data.content]);
    setPage(p);
  };
  useEffect(() => { load(0); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/api/posts", { content, mediaUrl: mediaUrl || null });
    setContent(""); setMediaUrl(""); load(0);
  };

  return (
    <div>
      <h2>Posts</h2>
      <form onSubmit={create} style={{ display: "flex", gap: 8 }}>
        <input required placeholder="Say something..." value={content} onChange={(e) => setContent(e.target.value)} />
        <input placeholder="media url (optional)" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} />
        <button>Create</button>
      </form>
      <ul>
        {items.map((p) => (
          <li key={p.id} style={{ margin: "12px 0", borderBottom: "1px solid #eee" }}>
            <div><b>@{p.authorUsername}</b> · {new Date(p.createdAt).toLocaleString()}</div>
            <div>{p.content}</div>
            {p.mediaUrl && <img src={p.mediaUrl} alt="" style={{ maxWidth: 300 }} />}
            <div>❤️ {p.likeCount} · 💬 {p.commentCount} · <Link to={`/posts/${p.id}`}>Detail</Link></div>
          </li>
        ))}
      </ul>
      <button onClick={() => load(page + 1)}>Load more</button>
    </div>
  );
}

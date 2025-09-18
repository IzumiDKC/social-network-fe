import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/client";
import type { Comment, Page, PostResp } from "../types";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [p, setP] = useState<PostResp | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(0);
  const [cmt, setCmt] = useState("");

  const loadPost = async () => {
    const { data } = await api.get<PostResp>(`/api/posts/${id}`);
    setP(data);
  };
  const loadCmts = async (pIdx = 0) => {
    const { data } = await api.get<Page<Comment>>(`/api/posts/${id}/comments`, { params: { page: pIdx, size: 10 } });
    setComments(pIdx === 0 ? data.content : [...comments, ...data.content]);
    setPage(pIdx);
  };

  useEffect(() => { loadPost(); loadCmts(0); }, [id]);

  const addCmt = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post(`/api/posts/${id}/comments`, { content: cmt });
    setCmt(""); await loadPost(); await loadCmts(0);
  };
  const like = async () => { await api.post(`/api/posts/${id}/like`); await loadPost(); };
  const unlike = async () => { await api.delete(`/api/posts/${id}/like`); await loadPost(); };

  if (!p) return <div>Loading...</div>;
  return (
    <div>
      <h2>Post #{p.id}</h2>
      <div><b>@{p.authorUsername}</b> · {new Date(p.createdAt).toLocaleString()}</div>
      <div>{p.content}</div>
      {p.mediaUrl && <img src={p.mediaUrl} style={{ maxWidth: 300 }} />}
      <div>❤️ {p.likeCount} · 💬 {p.commentCount}</div>
      <button onClick={like}>Like</button>
      <button onClick={unlike}>Unlike</button>

      <h3>Comments</h3>
      <form onSubmit={addCmt} style={{ display: "flex", gap: 8 }}>
        <input value={cmt} onChange={(e) => setCmt(e.target.value)} placeholder="Write a comment..." required />
        <button>Add</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c.id} style={{ margin: "8px 0", borderBottom: "1px dashed #ddd" }}>
            <div><b>#{c.id}</b> · {new Date(c.createdAt).toLocaleString()}</div>
            <div>{c.content}</div>
          </li>
        ))}
      </ul>
      <button onClick={() => loadCmts(page + 1)}>More</button>
    </div>
  );
}

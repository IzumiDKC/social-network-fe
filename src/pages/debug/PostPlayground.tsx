import { useEffect, useState } from "react";
import api from "../../api/client";
import type { Page, PostResp } from "../../types";

export default function PostPlayground() {
  const [content,setContent]=useState("");
  const [mediaUrl,setMediaUrl]=useState("");
  const [feed,setFeed]=useState<PostResp[]>([]);
  const [msg,setMsg]=useState("");

  const create = async(e:React.FormEvent)=>{ e.preventDefault();
    await api.post("/api/posts",{content, mediaUrl: mediaUrl || null});
    setContent(""); setMediaUrl(""); setMsg("Created"); await loadFeed();
  };

  const loadFeed = async()=>{
    const {data}=await api.get<Page<PostResp>>("/api/posts/feed",{params:{page:0,size:10}});
    setFeed(data.content);
  };

  useEffect(()=>{ loadFeed(); },[]);

  return (
    <div>
      <h2>Post Playground</h2>
      <form onSubmit={create} style={{display:"flex", gap:8}}>
        <input required placeholder="Say something..." value={content} onChange={e=>setContent(e.target.value)} />
        <input placeholder="media url (optional)" value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} />
        <button>Create</button>
      </form>
      <div style={{color:"green"}}>{msg}</div>
      <h3>Feed (10 newest from followees)</h3>
      {feed.map(p=>(
        <div key={p.id} style={{margin:"12px 0", borderBottom:"1px solid #eee"}}>
          <b>@{p.authorUsername}</b> · {new Date(p.createdAt).toLocaleString()}
          <div>{p.content}</div>
          {p.mediaUrl && <img src={p.mediaUrl} style={{maxWidth:300}}/>}
          <div>❤️ {p.likeCount} · 💬 {p.commentCount}</div>
        </div>
      ))}
    </div>
  );
}

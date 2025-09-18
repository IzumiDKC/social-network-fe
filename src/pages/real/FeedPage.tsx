import { useEffect, useState } from "react";
import api from "../../api/client";
import type { Page, PostResp } from "../../types";
import PostCard from "../../components/PostCard";
import Skeleton from "../../components/ui/Skeleton";

export default function FeedPage(){
  const [items,setItems]=useState<PostResp[]>([]);
  const [page,setPage]=useState(0);
  const [loading,setLoading]=useState(true);
  const [moreLoading,setMoreLoading]=useState(false);

  const load = async(p=0)=>{
    p===0 ? setLoading(true) : setMoreLoading(true);
    const {data} = await api.get<Page<PostResp>>("/api/posts/feed",{ params:{page:p,size:6} });
    setItems(p===0 ? data.content : [...items, ...data.content]);
    setPage(p);
    setLoading(false); setMoreLoading(false);
  };

  useEffect(()=>{ load(0); },[]);

  if(loading){
    return (
      <div className="space-y-4">
        <Skeleton className="h-36" />
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Your Feed</h1>
      {items.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-slate-600">
          Follow vài người trước đã — feed sẽ xuất hiện ở đây.
        </div>
      ) : items.map(p => <PostCard key={p.id} p={p} onChanged={()=>load(0)} />)}
      <div className="flex justify-center">
        <button onClick={()=>load(page+1)} className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-100">
          {moreLoading ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
}

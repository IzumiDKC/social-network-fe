import { Heart, MessageCircle } from "lucide-react";
import type { PostResp } from "../types";
import api from "../api/client";
import { Link } from "react-router-dom";
import Avatar from "./ui/Avatar";
import { Card, CardBody } from "./ui/Card";
import Button from "./ui/Button";

export default function PostCard({ p, onChanged }: { p: PostResp; onChanged?: () => void }) {
  const like = async()=>{ await api.post(`/api/posts/${p.id}/like`); onChanged?.(); };
  const unlike = async()=>{ await api.delete(`/api/posts/${p.id}/like`); onChanged?.(); };

  return (
    <Card>
      <CardBody>
        <div className="flex gap-3">
          <Avatar name={p.authorUsername} />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-medium text-slate-900">@{p.authorUsername}</span>
              <span>•</span>
              <time>{new Date(p.createdAt).toLocaleString()}</time>
            </div>

            <div className="mt-2 whitespace-pre-wrap text-[15px] leading-6">{p.content}</div>
            {p.mediaUrl && (
              <img src={p.mediaUrl} className="mt-3 max-h-96 w-full rounded-xl object-cover" />
            )}

            <div className="mt-3 flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={like}><Heart size={18} className="mr-1"/> Like</Button>
              <Button variant="ghost" size="sm" onClick={unlike}><Heart size={18} className="mr-1"/> Unlike</Button>
              <Link to={`/posts/${p.id}`} className="inline-flex items-center rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                <MessageCircle size={18} className="mr-1"/> {p.commentCount} comments
              </Link>
              <span className="ml-auto text-sm text-slate-500">❤️ {p.likeCount}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

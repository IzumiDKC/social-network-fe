import { useState } from "react";
import api from "../../api/client";
import { Card, CardBody, CardFooter, CardHeader } from "../../components/ui/Card";
import Textarea from "../../components/ui/Textarea";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ComposePage(){
  const [content,setContent]=useState("");
  const [mediaUrl,setMediaUrl]=useState("");
  const [msg,setMsg]=useState(""); const max=500;
  const remain = max - content.length;

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    await api.post("/api/posts", { content, mediaUrl: mediaUrl || null });
    setContent(""); setMediaUrl(""); setMsg("Posted!");
  };

  return (
    <Card>
      <CardHeader><h1 className="text-xl font-semibold">Create a post</h1></CardHeader>
      <CardBody>
        <form onSubmit={submit} className="grid gap-3">
          <Textarea value={content} onChange={e=>setContent(e.target.value)} required maxLength={max}
                    placeholder="What's happening?" />
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Characters left: {remain}</span>
            {mediaUrl && <a href={mediaUrl} target="_blank" className="underline">Preview media</a>}
          </div>
          <Input value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} placeholder="Image URL (optional)" />
          <Button className="w-fit">Post</Button>
        </form>
      </CardBody>
      {msg && <CardFooter><div className="text-emerald-600">{msg}</div></CardFooter>}
    </Card>
  );
}

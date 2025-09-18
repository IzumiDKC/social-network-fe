import { useState } from "react";
import api from "../api/client";

type Form = { username: string; email: string; password: string };

export default function Register() {
  const [f, setF] = useState<Form>({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", f);
      setMsg("Registered. Now login.");
    } catch (err: any) {
      setMsg(err?.response?.data ?? "Register failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, display: "grid", gap: 8 }}>
      <h2>Register</h2>
      <input placeholder="username" value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} />
      <input placeholder="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <input placeholder="password" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
      <button>Register</button>
      <div>{msg}</div>
    </form>
  );
}

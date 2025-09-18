import { useState } from "react";
import api from "../api/client";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { username, password });
      const token: string = typeof data === "string" ? data : data.accessToken;
      localStorage.setItem("accessToken", token);
      setMsg("Login ok");
      location.href = "/";
    } catch (err: any) {
      setMsg(err?.response?.data ?? "Login failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, display: "grid", gap: 8 }}>
      <h2>Login</h2>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
      <div>{msg}</div>
    </form>
  );
}

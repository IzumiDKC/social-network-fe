import { useState } from "react";

function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch { return null; }
}

export default function DebugAuth() {
  const [tok, setTok] = useState(localStorage.getItem("accessToken") || "");
  const payload = tok ? decodeJwt(tok) : null;

  const save = () => {
    if (tok) localStorage.setItem("accessToken", tok);
    else localStorage.removeItem("accessToken");
    alert("Saved to localStorage.");
  };

  return (
    <div style={{maxWidth:800}}>
      <h2>Debug Auth</h2>
      <p>Paste JWT (hoặc để sẵn token đã login):</p>
      <textarea value={tok} onChange={e=>setTok(e.target.value)} rows={6} style={{width:"100%"}} />
      <button onClick={save}>Save token</button>
      <h3>Decoded payload</h3>
      <pre style={{background:"#f6f8fa", padding:12, overflow:"auto"}}>{payload ? JSON.stringify(payload, null, 2) : "(invalid token)"}</pre>
    </div>
  );
}

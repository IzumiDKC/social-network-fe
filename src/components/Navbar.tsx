import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, PlusCircle, Users, LogOut, User as UserIcon } from "lucide-react";
import Avatar from "./ui/Avatar";
import useMe from "../hooks/useMe";
import { useState } from "react";
import clsx from "clsx";

export default function Navbar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { me, loading } = useMe();
  const [open, setOpen] = useState(false);

  const active = (p: string) =>
    pathname === p ? "text-slate-900" : "text-slate-600 hover:text-slate-900";

  const logout = () => {
    localStorage.removeItem("accessToken");
    nav("/login");
  };

  const userMenu = (
    <div
      className={clsx(
        "absolute right-0 top-10 w-44 rounded-xl border bg-white shadow-lg",
        open ? "block" : "hidden",
        "md:group-hover:block" // hover trên desktop
      )}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={me ? `/users/${me.id}` : "#"}
        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50"
        onClick={() => setOpen(false)}
      >
        <UserIcon size={16} />
        Hồ sơ
      </Link>
      <button
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
        onClick={logout}
      >
        <LogOut size={16} />
        Đăng xuất
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight">SNet</Link>
        <Link to="/" className={`inline-flex items-center gap-2 text-sm ${active("/")}`}>
          <Home size={18} /> Feed
        </Link>
        <Link to="/compose" className={`inline-flex items-center gap-2 text-sm ${active("/compose")}`}>
          <PlusCircle size={18} /> Create
        </Link>
        <Link to="/people" className={`inline-flex items-center gap-2 text-sm ${active("/people")}`}>
          <Users size={18} /> People
        </Link>

        <div className="ml-auto relative">
          {/* Chưa login: hiện nút Login */}
          {!me && !loading && (
            <Link to="/login" className="text-sm text-slate-700 underline">Login</Link>
          )}

          {/* Đang load: chấm nhỏ */}
          {loading && <span className="text-sm text-slate-400">...</span>}

          {/* Đã login: avatar + tên + menu */}
          {me && (
            <div
              className="group flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setOpen((s) => !s)} // click mở trên mobile
              onMouseEnter={() => setOpen(true)} // hover mở trên desktop
            >
              <Avatar name={me.username} size={28} />
              <Link to={`/users/${me.id}`} className="text-sm font-medium">@{me.username}</Link>
              {userMenu}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

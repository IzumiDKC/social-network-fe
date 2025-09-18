import { Route, Routes, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import FeedPage from "./pages/real/FeedPage";
import ComposePage from "./pages/real/ComposePage";
import ProfilePage from "./pages/real/ProfilePage";
import PeoplePage from "./pages/real/PeoplePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/real/SearchPage";

function Private({ children }: { children: ReactNode }) {
  return localStorage.getItem("accessToken")
    ? children
    : <Navigate to="/login" replace />;
}

{/* Optional banner */}
<section className="mx-auto max-w-4xl px-4 pt-6">
  <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white">
    <h2 className="text-lg font-semibold">Welcome back</h2>
    <p className="text-white/80 text-sm mt-1">See the latest posts from people you follow.</p>
  </div>
</section>

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Private><FeedPage/></Private>} />
          <Route path="/compose" element={<Private><ComposePage/></Private>} />
          <Route path="/people" element={<Private><PeoplePage/></Private>} />
          <Route path="/users/:id" element={<Private><ProfilePage/></Private>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/search" element={<Private><SearchPage/></Private>} />

        </Routes>
      </main>
    </div>
  );
}

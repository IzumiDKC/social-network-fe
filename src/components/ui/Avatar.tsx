export default function Avatar({ name, size=36 }: { name: string; size?: number }){
  const colors = ["bg-rose-500","bg-blue-500","bg-emerald-500","bg-amber-500","bg-violet-500","bg-cyan-500","bg-pink-500"];
  const i = (name?.charCodeAt(0) ?? 65) % colors.length;
  const initials = name?.slice(0,2).toUpperCase() || "U";
  return (
    <div className={`flex items-center justify-center rounded-full text-white ${colors[i]}`}
         style={{ width:size, height:size, fontSize: size*0.42 }}>
      {initials}
    </div>
  );
}

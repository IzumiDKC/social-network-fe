import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
export default function Input(props: InputHTMLAttributes<HTMLInputElement>){
  return <input {...props} className={clsx("h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-400/40", props.className)} />;
}

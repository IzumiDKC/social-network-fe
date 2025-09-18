import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
export default function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>){
  return <textarea {...props} className={clsx("w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-slate-400/40", props.className)} />;
}

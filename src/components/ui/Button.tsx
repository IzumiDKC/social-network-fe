import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid"|"outline"|"ghost"; size?: "sm"|"md"|"lg" };
export default function Button({ className, variant="solid", size="md", ...props }: Props){
  const base = "inline-flex items-center justify-center rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm:"h-8 px-3 text-sm", md:"h-10 px-4 text-sm", lg:"h-11 px-5 text-base" };
  const variants = {
    solid: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 hover:bg-slate-100",
    ghost: "hover:bg-slate-100"
  };
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />;
}

import type { PropsWithChildren } from "react";
export function Card({ children }: PropsWithChildren){ return <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">{children}</div>; }
export function CardHeader({ children }: PropsWithChildren){ return <div className="px-5 pt-4">{children}</div>; }
export function CardBody({ children }: PropsWithChildren){ return <div className="px-5 pb-4">{children}</div>; }
export function CardFooter({ children }: PropsWithChildren){ return <div className="px-5 pb-4 pt-2">{children}</div>; }

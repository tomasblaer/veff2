import { ReactNode } from "react";

export function ViewList(children: Array<ReactNode> | ReactNode) {
  return (
    <div className="grid grid-cols-3 grid-rows-2 w-1/2 border-dashed border-2 gap-4 border-slate-300 h-1/5">
      {children}
    </div>
  );
}
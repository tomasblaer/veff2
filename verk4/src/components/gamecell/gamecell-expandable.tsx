"use client";
import { useState } from "react";
import { GameCellProps } from "@/lib/types";

export function GameCellExpandable({ data }: GameCellProps) {
  const formattedDate = new Date(data.date).toDateString();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid grid-cols-3 grid-rows-2 w-1/2 border-dashed border-2 gap-4 border-slate-300 h-1/5">
      <h1
        className="flex flex-col col-start-1 col-span-3 place-self-center bg-slate-300 w-full text-center font-bold h-full items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {formattedDate}
        <button className="text-sm">🖊️</button>
      </h1>
      {expanded && (
        <>
          <h2 className="col-start-1 row-start-2 text-right w-1/2 ml-auto">
            {data.home}
          </h2>
          <h2 className="col-start-2 row-start-2 text-center">
            {data.homeScore} - {data.awayScore}
          </h2>
          <h2 className="col-start-3 row-start-2 text-left w-1/2">
            {data.away}
          </h2>
        </>
      )}
    </div>
  );
}

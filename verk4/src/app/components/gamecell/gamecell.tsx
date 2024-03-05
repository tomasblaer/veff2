import { memo, useState } from "react";
import { GameCellProps } from "@/app/lib/types";
import { GameCellExpandable } from "./gamecell-expandable";

function GenericEditGameCell({ data }: GameCellProps) {
  return <></>;
}

function GenericGameCell({ data }: GameCellProps) {
  const formattedDate = new Date(data.date).toDateString();

  return (
    <div className="grid grid-cols-3 grid-rows-2 w-1/2 border-dashed border-2 gap-4 border-slate-300 h-1/5">
      <h1 className="flex flex-col col-start-1 col-span-3 place-self-center bg-slate-300 w-full text-center font-bold h-full items-center">
        {formattedDate}
        <button className="text-sm">🖊️</button>
      </h1>

      <h2 className="col-start-1 row-start-2 text-right w-1/2 ml-auto">
        {data.home}
      </h2>
      <h2 className="col-start-2 row-start-2 text-center">
        {data.homeScore} - {data.awayScore}
      </h2>
      <h2 className="col-start-3 row-start-2 text-left w-1/2">{data.away}</h2>
      <h2 className="col-start-1 col-span-3 row-start-3 text-center w-full">
        Heimavöllur: {data.home}
      </h2>
    </div>
  );
}

export default function GameCell({
  data,
  expandable,
}: GameCellProps) {

  return expandable ? (
    <GameCellExpandable data={data} />
  ) : (
    <GenericGameCell data={data} />
  );
}

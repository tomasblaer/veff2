"use client"
import { Game } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";
import { GameList } from "../list/list";
import moment from "moment";

type FlipViewProps = {
  headers: string[];
  data: Game[];
}

export function FlipView({headers, data}: FlipViewProps) {
  const [headerIndex, setHeaderIndex] = useState(0);
  const [selectedData, setSelectedData] = useState<Game[] | null>([]);

  const findHeaderData = useCallback((data: Game[], header: string) => {
    const headerData = data.filter((game) => {
      return moment(game.date).format("YYYY-MM-DD").toString() === header;
    });

    return headerData;
  }, []);

  useEffect(() => {
    setSelectedData(findHeaderData(data, headers[headerIndex]));
  }, [data, findHeaderData, headerIndex, headers]);
  
  
  return (
    <div className="w-1/3">
      <div className="flex gap-4 justify-center">
        <button onClick={() => setHeaderIndex(headerIndex === 0 ? headerIndex : headerIndex-1)}>&lt;</button>
        <h1 className="font-bold w-full text-center">{new Date(headers[headerIndex]).toDateString()}</h1>
        <button onClick={() => setHeaderIndex(headerIndex+1 >= headers.length ? headerIndex : headerIndex + 1)}>&gt;</button>
      </div>
      <div className="grid grid-cols-3">
        <GameList data={selectedData as Game[]} /> 
      </div>
    </div>
  );
}
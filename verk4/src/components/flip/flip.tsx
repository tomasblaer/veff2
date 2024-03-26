"use client";
import { Game } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";
import { GameList } from "../list/list";
import moment from "moment";

type FlipViewProps = {
  headers: string[];
  data: Game[];
  headerKey: keyof Game;
};

export default function FlipView({ headers, data, headerKey }: FlipViewProps) {
  const [headerIndex, setHeaderIndex] = useState(0);
  const [selectedData, setSelectedData] = useState<Game[] | null>([]);

  const findHeaderData = useCallback(
    (data: Game[], header: string, headerKey: keyof Game) => {
      const headerData = data.filter((game) => {
        return (
          moment(game[headerKey]).format("YYYY-MM-DD").toString() === header
        );
      });
      return headerData;
    },
    []
  );

  useEffect(() => {
    setSelectedData(findHeaderData(data, headers[headerIndex], headerKey));
  }, [data, findHeaderData, headerIndex, headerKey, headers]);

  return (
    <div className="w-1/3 pt-20">
      <div className="flex gap-4 justify-center bg-gray-300 dark:bg-slate-800 rounded-t-md">
        <button
          className="w-1/3 text-left pl-2"
          onClick={() =>
            setHeaderIndex(headerIndex === 0 ? headerIndex : headerIndex - 1)
          }
        >
          &lt;
        </button>

        <h1 className="font-bold w-full text-center">
          {new Date(headers[headerIndex]).toDateString()}
        </h1>

        <button
          className="w-1/3 text-right pr-2"
          onClick={() =>
            setHeaderIndex(
              headerIndex + 1 >= headers.length ? headerIndex : headerIndex + 1
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="flex flex-col bg-gray-200 rounded-b-md dark:bg-gray-800">
        <GameList data={selectedData!} />
      </div>
    </div>
  );
}

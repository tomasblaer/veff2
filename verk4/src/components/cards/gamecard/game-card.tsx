"use client";
import { Game, Team } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import GameCardEditing from "./game-card-editing";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export type GameCardProps = {
  data: Game;
  teams: Team[];
};

export default function GameCard({ data, teams }: GameCardProps) {
  const [editing, setEditing] = useState<Boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onEditClick = useCallback(() => {
    cardRef.current?.animate({ opacity: [1, 0, 1] }, { duration: 500});
    setTimeout(() => {
      setEditing(!editing);
    }, 250);
  }, [editing]);

  return (
    <motion.div
      ref={cardRef}
      className="grid grid-rows-4 grid-cols-3 w-1/2 h-1/3 bg-gray-200 dark:bg-slate-800 rounded-lg p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!editing ? (
        <>
          <Button variant="outline" onClick={onEditClick} className="w-fit">
            <EditIcon />
          </Button>
          <div className="col-start-2">
            <h1 className="text-center text-2xl">
              {new Date(data.date).toDateString()}
            </h1>
          </div>
          <h1 className="row-start-2 col-start-1 text-right text-xl">{data.homeName}</h1>
          <h1 className="row-start-2 col-start-2 text-center text-xl">
            {data.homeScore} : {data.awayScore}
          </h1>
          <h1 className="row-start-2 col-start-3 text-left text-xl">{data.awayName}</h1>
        </>
      ) : (
        <GameCardEditing data={data} teams={teams} onEditClick={onEditClick} />
      )}
    </motion.div>
  );
}

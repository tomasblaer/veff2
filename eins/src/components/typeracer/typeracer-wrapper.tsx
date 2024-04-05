'use client'

import { useState } from "react";
import TypeRacerCore from "./typeracer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function TypeRacer() {
  const [time, setTime] = useState<number>(30);
  const [started, setStarted] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      { !started && (
        <div className="flex gap-3">
          <Input className={cn("w-fit")} type="number" value={time} onChange={(e) => setTime(parseInt(e.target.value))} />
          <Button onClick={() => setStarted(true)}>Start</Button>
        </div>
      )}
      { started && (
        <TypeRacerCore timeAmount={time} />
      )}
    </div>
  );
}
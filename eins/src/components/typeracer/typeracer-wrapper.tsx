'use client'

import { useState } from "react";
import TypeRacerCore from "./typeracer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function TypeRacer() {
  const [time, setTime] = useState<number>(30);
  const [started, setStarted] = useState<boolean>(false);


  return (
    <div>
      <Input type="number" value={time} onChange={(e) => setTime(parseInt(e.target.value))} />
      <Button onClick={() => setStarted(true)}>Start</Button>
      <TypeRacerCore timeAmount={time} started={started} />
    </div>
  );
}
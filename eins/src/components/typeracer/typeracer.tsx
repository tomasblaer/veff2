'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

type TypeRacerProps = {
  timeAmount: number;
  started: boolean;
};


export default function TypeRacerCore({timeAmount, started}: TypeRacerProps) {

  const [time, setTime] = useState<number>(timeAmount);
  const [words, setWords] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=100", { cache: 'no-store' }) // Takk copilot, breyta seinna
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);
  
  const startGame = useCallback(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (started) {
      startGame();
    }
  }, [startGame, started]);

  useEffect(() => {
    setTime(timeAmount);
  }, [timeAmount]);

  const wordsStringified = useMemo(() => words.join(" "), [words]);

  const gameWords = useMemo(() => {
    return wordsStringified.split("").map((letter, index) => {
      if (letter === ' ') {
        return <span className="font-bold" key={index}>&nbsp;</span>;
      }
      if (index === activeIndex) {
        return <span key={index} className="text-yellow-700 font-bold">{letter}</span>;
      }
      return <span key={index} className="font-bold">{letter}</span>;
    });

  }, [wordsStringified, activeIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key, wordsStringified[activeIndex]);
    if (e.key === wordsStringified[activeIndex]) {
      console.log('passed');
      setActiveIndex((prev) => prev + 1);
    }
  }, [activeIndex, wordsStringified]);
  
  return (
    <div tabIndex={0} className="flex flex-col p-20" onKeyDown={(e) => handleKeyDown(e)}>
      <div className="">
        {time}
      </div>
      <div className="flex">
        {started && gameWords}
      </div>
    </div>
  );
}
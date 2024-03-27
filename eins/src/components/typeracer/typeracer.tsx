'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";

type TypeRacerProps = {
  timeAmount: number;
  started: boolean;
};


export default function TypeRacerCore({timeAmount, started}: TypeRacerProps) {

  const gameRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<number>(timeAmount);
  const [words, setWords] = useState<string[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
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

  const wordsMapped = useMemo(() => words.map((word, wordIndex) => {
    const wordSpans = word.split('').map((letter, index) => (
      <span key={index} className={index === activeIndex && wordIndex === activeWordIndex ? 'text-red-500' : ''}>{letter}</span>
    ));
    return <div key={wordIndex} className="flex px-1">{wordSpans}</div>;
  }), [activeIndex, activeWordIndex, words]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === words[activeWordIndex][activeIndex]) {
      if (activeIndex + 1 === words[activeWordIndex].length) {
        setActiveWordIndex((prev) => prev + 1);
        setActiveIndex(0);
        return;
      }
      setActiveIndex((prev) => prev + 1);
    }
    console.log(activeWordIndex, activeIndex);
  }, [activeIndex, activeWordIndex, words]);
  
  return (
    <div tabIndex={0} ref={gameRef} className="flex flex-col p-20 max-w-screen-xl outline-none" onKeyDown={(e) => handleKeyDown(e)}>
      <div className="">
        {time}
      </div>
      <div className="flex flex-wrap">
        {wordsMapped}
      </div>
    </div>
  );
}
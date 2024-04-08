'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { keyPressIsLetter } from "@/lib/utils";

type TypeRacerProps = {
  timeAmount: number;
};

type TypeRacerGame = {
  words: string[];
  startTime: number;
  activeWordIndex: number;
  activeIndex: number;
  atSpace: boolean;
  typos: {
    wordIndex: number;
    letterIndex: number;
  }[];
  playing: boolean;
};


export default function TypeRacerCore({timeAmount}: TypeRacerProps) {

  const gameRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [currentWordRef, setCurrentWordRef] = useState<HTMLSpanElement | null>(null);
  const [time, setTime] = useState<number>(timeAmount);
  const [game, setGame] = useState<TypeRacerGame>({
    words: [],
    startTime: timeAmount,
    activeWordIndex: 0,
    activeIndex: 0,
    atSpace: false,
    typos: [],
    playing: false,
  });

  const { activeWordIndex, activeIndex, atSpace, words, typos } = game;

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=100", { cache: 'no-store' }) // Takk copilot, breyta seinna
      .then((res) => res.json())
      .then((data) => setGame((prev) => ({ ...prev, words: data })));
  }, []);

  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      // endGame(); TODO plenty stuff
    }
    return () => clearInterval(interval);
  }, [time]);

  const colorLetter = useCallback((wordIndex: number, letterIndex: number) => {
    if (typos.some((typo) => typo.wordIndex === wordIndex && typo.letterIndex === letterIndex)) {
      return 'text-red-700';
    } 
    // else if (letterIndex === activeIndex && wordIndex === activeWordIndex && !atSpace) {
    //   return 'text-blue-700';
    // }
    // Ditcha active word color i bili, bara ruglandi.
    else {
      return '';
    }
  }, [typos]);

  const wordsMapped = useMemo(() => words.map((word, wordIndex) => {
    const wordSpans = word.split('').map((letter, index) => (
      <span 
        key={index}
        ref={newRef => {
          if (activeIndex === index && activeWordIndex === wordIndex) {
            setCurrentWordRef(newRef);
          }
        }} 
        className={colorLetter(wordIndex, index)}
      >
        {letter}
      </span>
    ));
    return <div key={wordIndex} className="flex px-1">{wordSpans}</div>;
  }), [activeIndex, activeWordIndex, colorLetter, words]);

  const shiftCursor = useCallback(() => {
    if (activeIndex + 1 === words[activeWordIndex].length) {
      setGame((prev) => ({ ...prev, activeIndex: 0, activeWordIndex: prev.activeWordIndex + 1, atSpace: true }));
      return;
    }
    setGame((prev) => ({ ...prev, activeIndex: prev.activeIndex + 1 }));
  }, [activeIndex, activeWordIndex, words]);

  const backCursor = useCallback(() => {
    if (activeIndex === 0 && activeWordIndex === 0) {
      return;
    }
    if (activeIndex === 0) { // Ef @ fyrsti stafur i orði
      return;
    }

    setGame((prev) => ({ ...prev, typos: prev.typos.filter((typo) => typo.wordIndex !== prev.activeWordIndex || typo.letterIndex !== prev.activeIndex - 1), activeIndex: prev.activeIndex - 1 }));
  }, [activeIndex, activeWordIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace') {
      backCursor();
      return;
    }
    if (atSpace && e.key === ' ') {
      setGame((prev) => ({ ...prev, atSpace: false }));
      return
    } else if (atSpace) {
      return;
    }
    if (!keyPressIsLetter(e.key)) {
      return;
    }
    if (!(e.key === words[activeWordIndex][activeIndex]) && keyPressIsLetter(e.key)) { // Wrong letter
      setGame((prev) => ({ ...prev, typos: [...prev.typos, { wordIndex: prev.activeWordIndex, letterIndex: prev.activeIndex }] }));
    }
    shiftCursor();
  }, [activeIndex, activeWordIndex, atSpace, backCursor, shiftCursor, words]);

  const xCalc = useMemo(() => {
    if (!currentWordRef || !gameRef.current) {
      return 80;
    }
    if (atSpace) {
      return currentWordRef.getBoundingClientRect().left - gameRef.current?.getBoundingClientRect().left - 8;
    }
    return currentWordRef.getBoundingClientRect().left - gameRef.current?.getBoundingClientRect().left;
  }, [atSpace, currentWordRef]);

  const yCalc = useMemo(() => {
    if (!currentWordRef || !gameRef.current) {
      return 0;
    }
    return currentWordRef.getBoundingClientRect().top - gameRef.current?.getBoundingClientRect().top - 24;
  }, [currentWordRef]);

  return (
    <div 
      tabIndex={0} 
      ref={gameRef} 
      className="flex flex-col max-w-screen-xl outline-none" 
      onKeyDown={(e) => handleKeyDown(e)} 
      onFocus={(e) => setFocus(true)}
      onBlur={(e) => setFocus(false)}
    >
      <div className="">
        {words.length > 0 && time}
      </div>
      <div className={`flex flex-wrap ${!focus ? 'blur-sm' : ''}`}>
        <motion.div 
          className="border-l-2 border-yellow-700"
          initial={{ x: 80, y: 0 }}
          animate={{ x: xCalc, y: yCalc, transition: { duration: 0.05 }}}
          
        />
        {wordsMapped}
      </div>
    </div>
  );
}
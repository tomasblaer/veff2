"use client";

import {
  MutableRefObject,
  PointerEvent,
  useEffect,
  useMemo,
  memo,
  useState,
  useRef,
} from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

type noteData = {
  id: number;
  title: string;
  content: string;
  constraintsRef: MutableRefObject<HTMLDivElement | null>;
};

export default function Note({ id, title, content, constraintsRef }: noteData) {
  const [front, setFront] = useState(true);
  const controls = useAnimationControls();
  const noteRef = useRef<HTMLDivElement | null>(null);

  function flipNote(e: PointerEvent<HTMLButtonElement>) {
    if (front) {
      controls.start({ rotateY: 170, transition: { duration: 0.25 } });
      setFront(!front);
      return;
    } else {
      controls.start({ rotateY: 0, transition: { duration: 0.25 } });
      setFront(!front);
      return;
    }
  }

  return (
    <>
      <motion.div
        className="absolute flex flex-col p-4 bg-yellow-200 rounded-lg shadow-lg min-h-60 h-fit min-w-40 w-fit touch-none"
        drag
        ref={noteRef}
        whileHover={{ scale: 1.01 }}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragTransition={{ timeConstant: 150, power: 0.2 }}
        animate={controls}
        layout
      >
        {front ? (
          <>
            <div className="flex justify-between">
              <h1 className="text-xl font-bold p-4">{title}</h1>
              <button className="p-4" onClick={flipNote}>
                &#10247;
              </button>
            </div>
            <p className="text-sm p-4">{content}</p>
          </>
        ) : (
          <>
            <div className="flex justify-between [transform:rotateY(170deg)]">
              <h1 className="text-xl font-bold p-4">{title}</h1>
              <button className="p-4" onClick={flipNote}>
                &#10247;
              </button>
            </div>
            <div className="flex flex-col [transform:rotateY(170deg)] divide-y-2 divide-amber-300 items-center">
            <Image
                className="cursor-pointer pt-2"
                src="/edit.svg"
                alt="Edit symbol"
                width={75}
                height={15}
                priority
                // Handle onclick 
              />
              <Image
                className="cursor-pointer py-2"
                src="/copy.svg"
                alt="Copy symbol"
                width={80}
                height={15}
                priority
                // Handle onclick 
              />
              <Image
                className="cursor-pointer"
                src="/trashcan.svg"
                alt="Trashcan"
                width={80}
                height={15}
                priority
                // Handle onclick 
              />
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

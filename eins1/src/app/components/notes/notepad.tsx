"use client";

import { useEffect, useState, ReactElement, useRef } from "react";
import { motion } from "framer-motion";
import Note from "./note";

export default function Notepad() {
  const [notes, setNotes] = useState<ReactElement[]>([]);

  const constraintsRef = useRef<HTMLDivElement | null>(null);

  function addNote() {
    const note = (
      <Note
        key={notes.length + 1}
        id={notes.length + 1}
        title="Title"
        content="Content"
        constraintsRef={constraintsRef}
      />
    );
    setNotes([...notes, note]);
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex justify-center pt-10">
        <button onClick={addNote}>Add Note</button>
      </div>
      <motion.div
        ref={constraintsRef}
        className="flex w-10/12 h-3/5 mx-auto my-auto justify-center "
      >
        {notes}
      </motion.div>
    </div>
  );
}

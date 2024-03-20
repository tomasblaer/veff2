"use client"
import { Game } from "@/lib/types";
import { motion } from "framer-motion";

type GameCardProps = {
  data: Game;
}

export default function GameCard({ data }: GameCardProps ) {

  console.log(data);
  
  return (
    <motion.div 
      className="flex flex-col w-1/3 h-1/3 bg-gray-200 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div>
        <h1>
          {new Date(data.date).toDateString()}
        </h1>
      </div>
      <div>
        <h1>
          {data.home} : {data.away}
        </h1>
      </div>

    </motion.div>
  )
}

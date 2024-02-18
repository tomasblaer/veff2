"use client"

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <>
      <div className="w-screen h-screen">
        <motion.circle 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      </div>
    </>
  )
}
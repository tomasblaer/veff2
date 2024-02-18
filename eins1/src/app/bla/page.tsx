"use client"

import { motion } from "framer-motion";

export default function Page() {
    return (
        <>
        <div className="flex w-screen h-screen">
          <motion.circle className="min-w-full min-h-full"
            style={{ scale: 2, originX: "100px", originY: "100px" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        </div>
      </>
    );
}
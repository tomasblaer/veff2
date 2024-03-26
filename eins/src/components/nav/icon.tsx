"use client";

import { RabbitIcon, TurtleIcon } from "lucide-react";
import { useCallback, useState } from "react";

export default function Icon() {
  const [icon, setIcon] = useState<number>(0);

  const props = {
    color: "#f8fafc",
    className: "w-10 h-10 bg-black rounded-md",
  };

  const handleClick = useCallback(() => {
    setIcon(icon === 0 ? 1 : 0);
  }, [icon]);

  return (
    <div onClick={handleClick}>
        {icon === 0 ? <RabbitIcon {...props} /> : <TurtleIcon {...props} />}
    </div>
  );
}

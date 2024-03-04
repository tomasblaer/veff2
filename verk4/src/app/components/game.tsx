import { memo, useState } from "react";
type GameProps = {
  data: {
    id: number;
  };
  editable: boolean;
};

// async function getData(id: number): Promise<any> {
//   const res = await fetch(`/api/games${id}`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch game data');
//   }

//   return res.json();
// }

export default function Game({ data, editable }: GameProps) {
  // const gamedata = getData(data.id);

  return (
    <div>
      <h1>{data.id}</h1>
      {editable && <button>Edit</button>}
    </div>
  );
}

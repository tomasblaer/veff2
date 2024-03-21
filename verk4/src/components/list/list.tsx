import { Game, Team } from "@/lib/types";
import { ReactNode } from "react";
import { GameCell } from "./game-cell";
import { TeamView } from "./view-cell";
import { sortGamesByDate } from "@/lib/utils";

type ViewListProps = {
  type: "game" | "team";
  data: Game[] | Team[];
}

// export function AllDatesGameList({data}: {data: Game[]}) {
//   const components: ReactNode[] = [];

//   sortGamesByDate(data);
//   let prevDate = data[0].date;
//   components.push(<h1 className="font-bold">{prevDate}</h1>);

//   for (let i = 0; i < data.length; i++) {
//     if (data[i].date !== prevDate) {
//       components.push(<hr />);
//       components.push(<h1 className="font-bold">{data[i].date}</h1>);
//       prevDate = data[i].date;
//     }
//     components.push(<GameView data={data[i]} />);
//   }

//   return components;
// }

export function GameList({data}: {data: Game[]}) {
  const components: ReactNode[] = [];

  for (let i = 0; i < data.length; i++) {
    components.push(<GameCell data={data[i]} key={i} />);
  }

  return components;
}

function TeamList({data}: {data: Team[]}) {
  const components: ReactNode[] = [];

  for (let i = 0; i < data.length; i++) {
    const component = <TeamView data={data[i]} />;
    components.push(component);
  }

  return components;
}

export function ViewList({type, data}: ViewListProps) {

  return (
    <div className="grid grid-cols-1 grid-rows-2 w-1/2 border-dashed border-2 gap-4 border-slate-300 h-1/5">
      {type === "game" ? <GameList data={data as Game[]} /> : <TeamList data={data as Team[]} />}
    </div>
  );
}
import { Game, Team } from "@/lib/types";
import { ReactNode } from "react";
import { GameCell } from "./game-cell";
import { TeamView } from "./view-cell";
import { sortGamesByDate } from "@/lib/utils";

type ViewListProps = {
  type: "game" | "team";
  data: Game[] | Team[];
};

export function GameList({ data }: { data: Game[] }) {
  const components: ReactNode[] = [];

  for (let i = 0; i < data.length; i++) {
    components.push(<GameCell data={data[i]} key={i} />);
  }

  return components;
}

function TeamList({ data }: { data: Team[] }) {
  const components: ReactNode[] = [];

  for (let i = 0; i < data.length; i++) {
    const component = <TeamView data={data[i]} />;
    components.push(component);
  }

  return components;
}

export function ViewList({ type, data }: ViewListProps) {
  return (
    <div className="grid grid-cols-1 grid-rows-2 w-1/2 border-dashed border-2 gap-4 border-slate-300 h-1/5">
      {type === "game" ? (
        <GameList data={data as Game[]} />
      ) : (
        <TeamList data={data as Team[]} /> // Endaði a að nota þetta ekkert
      )}
    </div>
  );
}

import { Team } from "@/lib/types";

type teamViewProps = {
  data: Team;
};

export function TeamView({data}: teamViewProps) {
  return (
    <div>
      <h1>Team View</h1>
    </div>
  );
}

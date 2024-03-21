import FlipView from "@/components/flip/flip";
import { getAllGameDates, getGames } from "@/lib/games";

export default async function GamePage() {
  const games = await getGames(true);
  const dates = await getAllGameDates(true);

  return (
    <main className="flex justify-center">
      <FlipView headers={dates} data={games!} headerKey={"date"} />
    </main>
  );
}

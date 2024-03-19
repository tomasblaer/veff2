import { Metadata } from "next";
import { getAllGameDates, getGames } from "../lib/games";
import { FlipView } from "@/components/flip.tsx/flip";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Leikir",
};

export default async function Home() {
  const games = await getGames(true);
  const dates = await getAllGameDates(true);


  return (
    <main className="flex justify-center">
      <FlipView headers={dates} data={games} />
    </main>
  );
}

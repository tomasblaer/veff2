import { Metadata } from "next";

export default async function Home() {
  return (
    <main className="flex justify-center">
      <h1 className="text-xl pt-10">
        <b>Leikjavefurinn</b>, vefur fyrir yfirferð og breytingu
        á leikjagögnum, smellið á Leikir uppi í hægra horni
        til þess að skoða og fara yfir leiki.
      </h1>
    </main>
  );
}

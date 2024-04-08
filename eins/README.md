# Einstaklingsverkefni - Vefforritun 2 2024
## Tómas Blær Guðmundsson - tbg16@hi.is

**Ath, ég veiktist illa á meðan að verkefnavinnunni stóð og er að vonast til
þess að fá smá miskun frá þeim sem eru að fara yfir ef hlutir eru ennþá svolítið WIP.**

### Typeracer-esque síða unnin í Next.js með frumskrifuðum typeracer leik.

Síðan er hýst á vercel [hér](https://typeracer-cyan.vercel.app/)

Eins og er er bara singleplayer typeracer leikur á síðunni, en hann nýtir
* [Framer motion](https://www.npmjs.com/package/framer-motion) pakkann í cursorinn
* [Random-word API](https://random-word-api.herokuapp.com/word?number=100) í að sækja orð fyrir leikinn
* [shadcn/ui](https://ui.shadcn.com/) í UI components fyrir headerinn o.fl.

Planið er svo að setja upp virkni fyrir CRUD aðgerðir í route handlerum með [Prisma](https://www.prisma.io/), en þær aðgerðir eiga að nýtast í leaderboard, users og mögulega rooms þar sem að fólk getur spilað á móti hvoru öðru, (ég er að skoða [Socket.IO](https://socket.io/) fyrir möguleika á multiplayer-virkni)



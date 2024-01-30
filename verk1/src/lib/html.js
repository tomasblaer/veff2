import moment from 'moment';
import { readFile } from './file.js';
import { parseGamedays } from './json.js';

export async function generateBoilerplate(title, callbackFunction, data) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="./public/styles.css" />
    </head>
  </html>
  <body>
    <main>
      <div class="nav">
        <a href="index.html"><h3>FootyTracker ⚽</h3></a>
        <ul>
        ${
          title !== 'leikir.html' ?
          `  <li>
            <a href="leikir.html">Leikir</a>
          </li>` :
          `<li>
              <b>Leikir</b>
          </li>`
        }
        ${
          title !== 'stada.html' ?
          `  <li>
            <a href="stada.html">Staða</a>
          </li>` :
          `<li>
              <b>Staða</b>
          </li>`
        }
        </ul>
      </div>
      ${callbackFunction.name !== 'generateIndex' ? await callbackFunction(data) : await callbackFunction()}
    </main>
    <script type="module" src="./public/scripts.js"></script>
  </body>
`;
}

export function generateIndex() {
  return `<div class="header">
        <h1>Forsíða</h1>
      </div>
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec velit nec purus feugiat vulputate.
        Nunc ultricies nisl ut arcu congue accumsan. Aenean ac justo ligula. Vestibulum at dolor et augue pulvinar aliquam id vel urna.
        In hac habitasse platea dictumst. Nulla sodales pellentesque nibh eu dictum. Nulla hendrerit velit eu augue scelerisque,
        nec dapibus erat consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce eu suscipit nisi.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce congue consectetur ligula, quis mollis ipsum vestibulum quis.
        In bibendum metus at ante vehicula finibus. Vivamus feugiat convallis quam id ornare. Nullam consequat arcu eu justo elementum sodales. Integer ex elit,
        ultrices a nisi eu, dictum vehicula turpis. Sed id laoreet dui.</p>
        <img class="secret" src="./public/images/football.png" alt="Smiley playing football" />
      </div>`;
}

export function getGameForDate(date, data) {
  let gameForDate = null;
  Object.keys(data).forEach((gameKey) => {
    const game = data[gameKey];
    if (moment(game.date).isSame(date)) {
      gameForDate = game;
    }
  });
  return gameForDate;
}

async function leikirTable(data) {
  // Mætti vera finna
  const res = await parseGamedays(data);

  const { sortedDates: dates } = res;

  let html = '';
  const { sortedDates, ...gameData } = res;

  let id = 0;

  dates.forEach((date) => {
    const gameDay = getGameForDate(date, gameData);


    html += `
        <div class="gameday-cell" id=${id}>
          <div class="game-date" id=${id}>
            <b>${date.format('dddd')}, ${date.format('MMMM')} ${date.format('DD')}</b>
          </div>
    `;
    let gameId = 0;
    gameDay.games.forEach((game) => {
      html += `
        <div class="game-info" id=${gameId}>
          <p>${game.home.name} ${game.home.score}-${game.away.score} ${game.away.name}</p>
        </div>
      `;
      gameId += 1;
    });

    html += `
        </div>
    `;
    id += 1;
  })

  return html;
}

export async function generateLeikir(data) {
  const res = await leikirTable(data);
  return `
    <div class="header">
      <h1>Leikir</h1>
    </div>
    <div class="content">
      ${res}
    </div>
  `;
}

function reiknaStodu(game, stada, additionalData) {
  additionalData[game.home.name].mp += 1;
  additionalData[game.away.name].mp += 1;
  additionalData[game.home.name].gf += game.home.score;
  additionalData[game.away.name].gf += game.away.score;
  additionalData[game.home.name].ga += game.away.score;
  additionalData[game.away.name].ga += game.home.score;
  if (game.home.score > game.away.score) {
    stada[game.home.name] += 3;
    additionalData[game.home.name].w += 1;
    additionalData[game.away.name].l += 1;
  } else if (game.home.score < game.away.score) {
    stada[game.away.name] += 3;
    additionalData[game.away.name].w += 1;
    additionalData[game.home.name].l += 1;
  } else {
    stada[game.home.name] += 1;
    stada[game.away.name] += 1;
    additionalData[game.home.name].d += 1;
    additionalData[game.away.name].d += 1;
  }
}

async function stoduTable(data) {
  const res = await parseGamedays(data);
  const { sortedDates, ...gameDays } = res;

  let teams = await readFile('./data/teams.json');
  teams = JSON.parse(teams);
  const stada = teams.reduce((acc, team) => ({ ...acc, [String(team)]: 0}), {});
  const additionalData = {};
  Object.keys(stada).forEach((team) => {
    additionalData[team] = {
      mp: 0,
      w: 0,
      d: 0,
      l: 0,
      gf: 0,
      ga: 0,
    };
  });

  Object.keys(gameDays).forEach((gameDayKey) => {
    const gameDay = gameDays[gameDayKey];
    gameDay.games.forEach((game) => {
      reiknaStodu(game, stada, additionalData);
    });
  });

  const teamnamesSorted = Object.keys(stada).sort((a, b) => stada[b] - stada[a]);
  const stadaSorted = teamnamesSorted.reduce((acc, team) => ({ ...acc, [team]: stada[team]}), {});

  let html = `<div class="standing-table">
    <div class="standing-info-cell">
      <p>Lið</p>
      <p>Stig</p>
      <p>MP</p>
      <p>W</p>
      <p>D</p>
      <p>L</p>
      <p>GF</p>
      <p>GA</p>
      <p>GD</p>
    </div>
  `;

  Object.keys(stadaSorted).forEach((team) => {
    html += `
      <div class="standing-cell">
        <p>${team}</p>
        <p>${stadaSorted[team]}</p>
        <p>${additionalData[team].mp}</p>
        <p>${additionalData[team].w}</p>
        <p>${additionalData[team].d}</p>
        <p>${additionalData[team].l}</p>
        <p>${additionalData[team].gf}</p>
        <p>${additionalData[team].ga}</p>
        <p>${additionalData[team].gf - additionalData[team].ga}</p>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

export async function generateStada(data) {
  const res = await stoduTable(data);
  return `
    <div class="header">
      <h1>Staða</h1>
    </div>
    <div class="content">
      ${res}
    </div>
  `;
}


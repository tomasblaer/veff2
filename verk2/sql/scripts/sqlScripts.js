import { writeFile, readFile, readdir } from 'fs/promises';
import moment from 'moment';
import postgres from 'postgres';

/* eslint no-unused-vars: 0 */

const dataFolder = './data'

function teamsIsValid(validTeams, gameday) {
  validTeams = JSON.parse(validTeams);
  Object.keys(gameday.games).forEach((gameKey) => {
    if (!validTeams.includes(gameday.games[gameKey].home.name) ||
     !validTeams.includes(gameday.games[gameKey].away.name)) {
      delete gameday.games[gameKey];
    }
  });
  return gameday;
}

function isValidGame(game) {
  return Object.prototype.hasOwnProperty.call(game, 'home')
   &&Object.prototype.hasOwnProperty.call(game, 'away')
   && Object.prototype.hasOwnProperty.call(game.home, 'name')
   && Object.prototype.hasOwnProperty.call(game.home, 'score')
   && Object.prototype.hasOwnProperty.call(game.away, 'name')
   && Object.prototype.hasOwnProperty.call(game.away, 'score')
   && typeof game.home.name === 'string'
   && typeof game.home.score === 'number'
   && typeof game.away.name === 'string'
   && typeof game.away.score === 'number'
   && game.home.score >= 0 && game.away.score >= 0;
}

function isValid(data) {
  return data !== null && Object.prototype.hasOwnProperty.call(data, 'date') &&
   Object.prototype.hasOwnProperty.call(data, 'games') && Array.isArray(data.games) &&
   data.games.length > 0 && moment(data.date).isValid();
}

async function createInserts() {
  const files = await readdir(dataFolder);
  const validTeams = await readFile(`${dataFolder}/teams.json`, 'utf8');
  const gameInserts = [];
  const teamInserts = [];
  const promises = [];

  JSON.parse(validTeams).forEach(team => {
    teamInserts.push(`INSERT INTO teams (name) VALUES ('${team}');`);
  });
  files.forEach(file => {
    if (file !== 'teams.json') {
      promises.push(readFile(`${dataFolder}/${file}`, 'utf8'));
    }
  });

  const data = await Promise.all(promises);
  const count = [0,0];
  data.forEach(gameday => {
    const parsedGameday = JSON.parse(gameday);
    if (isValid(parsedGameday)) {
      const validGameday = teamsIsValid(validTeams, parsedGameday);
      Object.keys(validGameday.games).forEach(gameKey => {
        const game = validGameday.games[gameKey];
        count[0] += 1;
        if (isValidGame(game)) {
          count[1] += 1;
          gameInserts.push(`INSERT INTO games (date, home, away, home_score, away_score) VALUES ('${validGameday.date}', (SELECT id from teams WHERE name='${game.home.name}'), (SELECT id from teams WHERE name='${game.away.name}'), ${game.home.score}, ${game.away.score});`);
        } else {
          console.error(`Invalid game: ${JSON.stringify(game)}`);
        }
      });
    }
  });
  console.info(`Total games: ${count[0]}, valid games: ${count[1]}`);
  await writeFile('./sql/teams.sql', teamInserts.join('\n'));
  await writeFile('./sql/games.sql', gameInserts.join('\n'));
}

async function createTables(sqlConn) {
  const res = await sqlConn.file('./sql/tables.sql');
  return res;
}

async function insertTeams(sqlConn) {
  const res = await sqlConn.file('./sql/teams.sql');
  return res;
}

async function insertGames(sqlConn) {
  const res = await sqlConn.file('./sql/games.sql');
  return res;
}

async function main() {
  // Nota 2 postgres pakka þvi þessi getur keyrt .sql skrár :)
  // const sqlConn = postgres('postgres_url_here');
  // await createInserts();
  // await createTables(sqlConn);
  // await insertTeams(sqlConn);
  // await insertGames(sqlConn);
  // await sqlConn.end();
}

await main();

import pg from 'pg';
import _ from 'lodash';
import moment from 'moment';

const { DATABASE_URL: connectionString } = process.env;

const db = new pg.Pool({connectionString});

db.on('error', (err) => {
  console.error('Idle database error', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  const client = await db.connect();
  try {
    return await client.query(q, values);
  } catch (e) {
    console.error('Error when querying', e);
    return null;
  } finally {
    client.release();
  }
}

export async function getGames(groupByDate = false) {
  const sql = `SELECT
   games.id, date, home_score, away_score, t1.name as home, t2.name as away
  FROM
    games
  LEFT JOIN teams t1 ON t1.id = home
  LEFT JOIN teams t2 ON t2.id = away
  ORDER BY date ASC;`;

  const result = await query(sql);

  if (result) {
    return groupByDate ?
     _.groupBy(result.rows, ({ date }) => moment(date).format('DD MMMM YYYY')) :
      result.rows;
  }
  return null;
}

export async function getTeams() {
  const sql = `SELECT
    id, name
    FROM
      teams
    ORDER BY name ASC`;
  const result = await query(sql);

  return result ? result.rows : null
}

export async function getStanding() {
  const sql = `SELECT
    t.name,
    COUNT(g.id) AS games,
    SUM(CASE WHEN g.home_score > g.away_score THEN 3 ELSE 0 END) +
    SUM(CASE WHEN g.home_score = g.away_score THEN 1 ELSE 0 END) AS points,
    SUM(CASE WHEN g.home_score > g.away_score THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN g.home_score < g.away_score THEN 1 ELSE 0 END) AS losses,
    SUM(CASE WHEN g.home_score = g.away_score THEN 1 ELSE 0 END) AS draws,
    SUM(g.home_score) AS goals_for,
    SUM(g.away_score) AS goals_against,
    SUM(g.home_score) - SUM(g.away_score) AS goal_difference
  FROM
    teams t
  LEFT JOIN games g ON t.id = g.home OR t.id = g.away
  GROUP BY t.name
  ORDER BY points DESC, goal_difference DESC;
    `;

  const result = await query(sql);

  return result ? result.rows : null;
}

export async function insertGame(game) {
  const sql = `INSERT INTO
    games(date, home, away, home_score, away_score)
    VALUES ($1, $2, $3, $4, $5)`;
  const result = await query(sql, game);

  return result;
}

export async function deleteGame(id) {
  const sql = 'DELETE FROM games WHERE id = $1';
  const result = await query(sql, [id]);

  return result;
}



import pg from 'pg';

let savedPool: pg.Pool | undefined;

export function getPool(): pg.Pool {
  if (savedPool) {
    return savedPool;
  }

  const { DATABASE_URL: connectionString } = process.env;
  if (!connectionString) {
    console.error('vantar DATABASE_URL í .env');
    throw new Error('missing DATABASE_URL');
  }

  savedPool = new pg.Pool({ connectionString });

  savedPool.on('error', (err) => {
    console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
    throw new Error('error in db connection');
  });

  return savedPool;
}

export async function query(
  q: string,
  values: Array<unknown> = [],
  silent = false,
) {
  const pool = getPool();

  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    if (!silent) console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    if (!silent) console.error('unable to query', e);
    if (!silent) console.info(q, values);
    return null;
  } finally {
    client.release();
  }
}

export async function getTeams() {
    const result = await query('SELECT * FROM teams');
    return result?.rows;
}
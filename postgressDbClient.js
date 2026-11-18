const { Pool } = require('pg');
require('dotenv').config();

// A pool instead of one long-lived client: on Vercel a warm instance can sit idle long enough for
// the database (or its connection pooler) to drop the connection. A single client then stays broken
// until the instance is recycled, so requests fail at random. The pool replaces dead connections.
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    max: 3,
    // Close idle connections before the database side does
    idleTimeoutMillis: 10000,
    // Fail fast instead of hanging until the serverless function times out
    connectionTimeoutMillis: 5000,
    keepAlive: true,
});

// Without a listener, a dropped idle connection raises an unhandled 'error' event and crashes the process
pool.on('error', (error) => {
    console.error('Idle PostgreSQL connection error:', error.message);
});

const RETRY_DELAY_MS = 500;

// Same API as client.query. Retries once, so a connection that died between requests costs a short
// delay instead of a failed request.
async function query(text, params) {
    try {
        return await pool.query(text, params);
    } catch (error) {
        console.error('PostgreSQL query failed, retrying once:', error.message);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        return pool.query(text, params);
    }
}

module.exports = { query, pool };

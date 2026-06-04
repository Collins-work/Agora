const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

const pool = connectionString
    ? new Pool({
        connectionString,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
    : null

const initDb = async () => {
    if (!pool) {
        console.warn('⚠️ DATABASE_URL not configured — skipping Postgres initialization')
        return
    }

    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE,
      phone TEXT,
      first_name TEXT,
      last_name TEXT,
      password_hash TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS traders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      business_id TEXT UNIQUE NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      bvn_hash TEXT,
      market TEXT,
      trade_type TEXT,
      payment_link TEXT,
      credit_score INTEGER DEFAULT 500,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)

    console.log('✅ Postgres tables ready')
}

const query = async (...args) => {
    if (!pool) throw new Error('Postgres pool is not initialized')
    return pool.query(...args)
}

module.exports = { pool, initDb, query }

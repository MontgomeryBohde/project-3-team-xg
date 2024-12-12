// lib/db.js

/**
 * @fileOverview This file sets up a connection pool to a PostgreSQL database
 * using the 'pg' library and provides a function to execute SQL queries.
 * @requires pg
 */

import { Pool } from 'pg';

/**
 * Creates a new pool instance with the given connection string.
 * @type {Pool}
 */
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

/**
 * Executes a database query with the given text and parameters.
 * @param {string} text - The SQL query text.
 * @param {Array} [params=[]] - The parameters for the SQL query.
 * @returns {Promise<Array>} The rows returned by the query.
 * @throws Will throw an error if the query fails.
 */
export const query = async (text, params = []) => {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

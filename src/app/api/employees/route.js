// app/api/employees/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM employees;');
    await client.end();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

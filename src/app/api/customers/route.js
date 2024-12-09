// app/api/customers/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function PUT(request) {
  const connectionString = process.env.POSTGRES_URL;
  const client = new Client({ connectionString });

  try {
    await client.connect();

    // Parse the JSON body to get customer_id
    const { customer_id, pointsAdj } = await request.json();

    // Check and see if pointsAdj is valid
    const pointsToAdd = pointsAdj || 10;

    console.log("pointsToAdd to db: ", pointsToAdd);

    // Fetch the current rewards points for the customer
    const getPointsResult = await client.query(
      'SELECT rewards_points FROM customers WHERE id = $1',
      [customer_id]
    );

    if (getPointsResult.rowCount === 0) {
      await client.end();
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const currentPoints = getPointsResult.rows[0].rewards_points;

    // Update the rewards points to add pointsToAdd
    const newPoints = currentPoints + pointsToAdd;
    console.log("New points in db: ", newPoints);
    const updateResult = await client.query(
      'UPDATE customers SET rewards_points = $1 WHERE id = $2 RETURNING *',
      [newPoints, customer_id]
    );

    const updatedCustomer = updateResult.rows[0];

    await client.end();

    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (error) {
    console.error('Error updating rewards points:', error);
    return NextResponse.json({ error: 'Failed to update rewards points' }, { status: 500 });
  }
}

export async function GET() {
    const connectionString = process.env.POSTGRES_URL;
    const client = new Client({ connectionString });
  
    try {
      await client.connect();
  
      // Fetch the next available ID for the customers table
      const nextIdResult = await client.query(
        'SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM customers'
      );
  
      const nextId = nextIdResult.rows[0].next_id;
  
      await client.end();
  
      return NextResponse.json({ next_id: nextId }, { status: 200 });
    } catch (error) {
      console.error('Error fetching next customer ID:', error);
      return NextResponse.json({ error: 'Failed to fetch next customer ID' }, { status: 500 });
    }
  }

  export async function POST(request) {
    const connectionString = process.env.POSTGRES_URL;
    const client = new Client({ connectionString });
  
    try {
      await client.connect();
  
      // Parse the JSON body to get customer details
      const { firstName } = await request.json();
  
      // Insert the new guest customer into the database with initial rewards_points of 10 from current order
      const result = await client.query(
        `INSERT INTO customers (first_name, rewards_points, is_guest) 
         VALUES ($1, 10, true) 
         RETURNING id, first_name, rewards_points, is_guest`,
        [firstName]
      );
  
      const newCustomer = result.rows[0];
  
      await client.end();
  
      return NextResponse.json({ customerId: newCustomer.id }, { status: 201 });
    } catch (error) {
      console.error('Error creating guest customer:', error);
      return NextResponse.json({ error: 'Failed to create guest customer' }, { status: 500 });
    }
  }
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    phone_number VARCHAR(10),
    email TEXT,
    rewards_points INTEGER DEFAULT 0,
    is_guest BOOLEAN DEFAULT TRUE
);
CREATE TABLE meal_items (
    id SERIAL PRIMARY KEY, -- Using serial to auto-increment id
    meal_type VARCHAR(50),
    side_id INTEGER,
    entree_ids INTEGER[],
    price DECIMAL(10,2)
);
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    cashier_id INTEGER,
    order_total DECIMAL(10,2),
    item_size_ids INTEGER[],
    meal_item_ids INTEGER[],
    payment_method TEXT,
    placed_time TIMESTAMP,
    ready_time TIMESTAMP,
    order_status TEXT
);


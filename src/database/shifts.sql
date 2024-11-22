CREATE TABLE IF NOT EXISTS shifts (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    start_time TIMESTAMP,
    end_time TIMESTAMP
);
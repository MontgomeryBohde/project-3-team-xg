CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    title TEXT,
    is_manager BOOLEAN DEFAULT FALSE,
    hire_date DATE,
    hourly_rate DECIMAL(10, 2)
);

INSERT INTO employees (id, first_name, last_name, title, is_manager, hire_date, hourly_rate)
VALUES
    (1, 'Alisa', 'Lu', 'Manager', 'TRUE', '2020-05-10', 15.50),
    (2, 'Rebecca', 'Chen', 'Cashier', 'FALSE', '2022-08-15', 10.50),
    (3, 'Tianlan', 'Li', 'Cashier', 'FALSE', '2022-01-10', 10.50),
    (4, 'Risha', 'Thimmancherla', 'Server', 'FALSE', '2023-01-14', 10),
    (5, 'Monte', 'Bohde', 'Server', 'FALSE', '2024-01-10', 10);
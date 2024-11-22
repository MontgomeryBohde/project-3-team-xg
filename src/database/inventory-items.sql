CREATE TABLE IF NOT EXISTS inventory_items (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    category TEXT,
    current_stock INTEGER DEFAULT 0,
    restock_date DATE,
    unit_price NUMERIC(10, 2),
    is_allergen BOOLEAN DEFAULT FALSE,
    is_vegan BOOLEAN DEFAULT FALSE
);

INSERT INTO inventory_items (item_name, category, current_stock, restock_date, unit_price, is_vegan, is_allergen)
VALUES
    -- Appetizers
    ('Chicken Egg Roll', 'Appetizer', 84, '2024-9-21', 0.50, FALSE, FALSE), -- 1
    ('Veggie Spring Roll', 'Appetizer', 72, '2024-9-22', 0.50, TRUE, FALSE), -- 2
    ('Cream Cheese Rangoon', 'Appetizer', 55, '2024-9-18', 0.50, FALSE, TRUE), -- 3
    ('Apple Pie Roll', 'Appetizer', 102, '2024-9-17', 0.50, TRUE, FALSE), -- 4

    -- Protein
    ('Breaded Chicken', 'Meats', 242, '2024-9-24', 0.65, FALSE, FALSE), -- 5
    ('Chicken', 'Meats', 158, '2024-9-23', 0.58, FALSE, FALSE), -- 6
    ('Beyond Meat Chicken', 'Meats', 151, '2024-9-23', 0.81, TRUE, FALSE), -- 7
    ('Beef', 'Meats', 198, '2024-9-24', 0.96, FALSE, FALSE), -- 8
    ('Shrimp', 'Meats', 77, '2024-9-24', 0.91, FALSE, TRUE), -- 9

    -- Vegetables
    ('Broccoli', 'Vegetables', 104, '2024-9-21', 0.15, TRUE, FALSE), -- 10
    ('Cucumber', 'Vegetables', 166, '2024-9-20', 0.18, TRUE, FALSE), -- 11
    ('Peas', 'Vegetables', 233, '2024-9-2', 0.20, TRUE, FALSE), -- 12
    ('Tomato', 'Vegetables', 87, '2024-9-22', 0.19, TRUE, FALSE), -- 13
    ('Onion', 'Vegetables', 288, '2024-9-25', 0.11, TRUE, FALSE), -- 14
    ('Chili Pepper', 'Vegetables', 288, '2024-9-25', 0.11, TRUE, FALSE), -- 15
    ('Red Peppers', 'Vegetables', 98, '2024-9-21', 0.18, TRUE, FALSE), -- 16
    ('Green Peppers', 'Vegetables', 98, '2024-9-21', 0.18, TRUE, FALSE), -- 17
    ('Mushrooms', 'Vegetables', 147, '2024-9-21', 0.20, TRUE, FALSE), -- 18
    ('String Beans', 'Vegetables', 164, '2024-9-21', 0.16, TRUE, FALSE), -- 19
    ('Scallion', 'Vegetables', 67, '2024-9-25', 0.30, TRUE, FALSE), -- 20
    ('Kale', 'Vegetables', 67, '2024-9-25', 0.30, TRUE, FALSE), -- 21
    ('Celery', 'Vegetables', 67, '2024-9-25', 0.30, TRUE, FALSE), -- 22
    ('Pineapple', 'Vegetables', 67, '2024-9-25', 0.30, TRUE, FALSE), -- 23

    -- Assorted
    ('Oil', 'Assorted', 34, '2024-9-22', 0.03, TRUE, FALSE), -- 24
    ('Noodles', 'Assorted', 421, '2024-9-23', 0.08, TRUE, FALSE), -- 25
    ('Rice', 'Assorted', 312, '2024-9-24', 0.06, TRUE, FALSE), -- 26
    ('Egg', 'Assorted', 198, '2024-9-22', 0.05, FALSE, FALSE), -- 27
    ('Honey', 'Assorted', 9, '2024-9-3', 0.03, FALSE, FALSE), -- 28
    ('Walnuts', 'Assorted', 56, '2024-9-16', 0.12, TRUE, TRUE), -- 29
    ('Sesame Seeds', 'Assorted', 90, '2024-9-16', 0.07, TRUE, TRUE), -- 30
    ('Tofu', 'Assorted', 240, '2024-9-16', 0.07, TRUE, FALSE), -- 31
    ('Seasoning Sauce', 'Assorted', 4, '2024-9-2', 0.03, TRUE, FALSE), -- 32
    ('Black Pepper', 'Assorted', 8, '2024-9-3', 0.03, TRUE, FALSE), -- 33
    ('Peanuts', 'Assorted', 56, '2024-9-16', 0.12, TRUE, TRUE), -- 34

    -- Drinks
    ('Diet Pepsi', 'Drinks', 56, '2024-9-1', 0.05, TRUE, FALSE), -- 35
    ('Mountain Dew', 'Drinks', 45, '2024-9-1', 0.05, TRUE, FALSE), -- 36
    ('Liptop Brisk Rasberry Iced 45', 'Drinks', 198, '2024-9-1', 0.05, TRUE, FALSE), -- 37
    ('Sierra Mist', 'Drinks', 8, '2024-9-1', 0.05, TRUE, FALSE), -- 38
    ('Tropicana Lemonade', 'Drinks', 90, '2024-9-1', 0.05, TRUE, FALSE), -- 39
    ('Aquafina', 'Drinks', 23, '2024-9-1', 0.05, TRUE, FALSE), -- 40
    ('Gatorade Lemon Lime', 'Drinks', 23, '2024-9-1', 0.05, TRUE, FALSE), -- 41
    ('Dr Pepper', 'Drinks', 34, '2024-9-1', 0.05, TRUE, FALSE), -- 42
    ('Sweet Tea', 'Drinks', 23, '2024-9-1', 0.05, TRUE, FALSE), -- 43
    ('Pepsi', 'Drinks', 8, '2024-9-1', 0.05, TRUE, FALSE), -- 44

    -- Utensils
    ('Chopsticks', 'Utensils', 29, '2024-9-10', 0.05, TRUE, FALSE), -- 45
    ('Bowl Lids', 'Utensils', 78, '2024-9-18', 0.02, TRUE, FALSE), -- 46
    ('Drink Lids', 'Utensils', 78, '2024-9-18', 0.02, TRUE, FALSE), -- 47
    ('Cups', 'Utensils', 23, '2024-9-21', 0.02, TRUE, FALSE), -- 48
    ('Plates', 'Utensils', 89, '2024-9-3', 0.02, TRUE, FALSE), -- 49
    ('Napkins', 'Utensils', 40, '2024-9-27', 0.09, TRUE, FALSE), -- 50
    ('Bowls', 'Utensils', 67, '2024-9-6', 0.02, TRUE, FALSE), -- 51
    ('Spoons', 'Utensils', 57, '2024-8-29', 0.02, TRUE, FALSE), -- 52
    ('Forks', 'Utensils', 3, '2024-9-1', 0.02, TRUE, FALSE), -- 53
    ('Straws', 'Utensils', 3, '2024-9-1', 0.02, TRUE, FALSE); -- 54
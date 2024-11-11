
CREATE TABLE IF NOT EXISTS item_sizes (
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES menu_items(id),
    size VARCHAR(50),
    price DECIMAL(10, 2),
    calories INT,
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

INSERT INTO item_sizes (item_id, size, price, calories)
VALUES
-- Hot Ones Blazing Bourbon Chicken
    (1, 'Small', 5.20, 400),
    (1, 'Medium', 8.50, 450),
    (1, 'Large', 12.10, 600),
-- The Original Orange Chicken
    (2, 'Small', 5.20, 510),
    (2, 'Medium', 8.50, 560),
    (2, 'Large', 12.10, 700),
-- Black Pepper Sirloin Steak (Premium)
    (3, 'Small', 6.70, 180),
    (3, 'Medium', 11.50, 250),
    (3, 'Large', 15.70, 600),
-- Honey Walnut Shrimp (Premium)
    (4, 'Small', 6.70, 430),
    (4, 'Medium', 11.50, 580),
    (4, 'Large', 15.70, 750),
-- Grilled Teriyaki Chicken
    (5, 'Small', 5.20, 275),
    (5, 'Medium', 8.50, 350),
    (5, 'Large', 12.10, 500),
-- Broccoli Beef
    (6, 'Small', 5.20, 150),
    (6, 'Medium', 8.50, 300),
    (6, 'Large', 12.10, 500),
-- Kung Pao Chicken
    (7, 'Small', 5.20, 320),
    (7, 'Medium', 8.50, 400),
    (7, 'Large', 12.10, 600),
-- Honey Sesame Chicken Breast
    (8, 'Small', 5.20, 340),
    (8, 'Medium', 8.50, 400),
    (8, 'Large', 12.10, 550),
-- Beijing Beef
    (9, 'Small', 6.70, 480),
    (9, 'Medium', 11.50, 590),
    (9, 'Large', 15.70, 670),
-- Mushroom Chicken
    (10, 'Small', 5.20, 220),
    (10, 'Medium', 8.50, 350),
    (10, 'Large', 12.10, 420),
-- SweetFire Chicken Breast
    (11, 'Small', 5.20, 380),
    (11, 'Medium', 8.50, 450),
    (11, 'Large', 12.10, 570),
-- String Bean Chicken Breast
    (12, 'Small', 5.20, 210),
    (12, 'Medium', 8.50, 320),
    (12, 'Large', 12.10, 490),
-- Black Pepper Chicken
    (13, 'Small', 5.20, 280),
    (13, 'Medium', 8.50, 340),
    (13, 'Large', 12.10, 470),

-- Super Greens
    (14, 'Small', 2.50, 180),
    (14, 'Medium', 5.50, 250),
    (14, 'Large', 7.20, 340),
-- Chow Mein
    (15, 'Small', 2.50, 880),
    (15, 'Medium', 5.50, 950),
    (15, 'Large', 7.20, 1100),
-- Fried Rice
    (16, 'Small', 2.50, 932),
    (16, 'Medium', 5.50, 1100),
    (16, 'Large', 7.20, 1300),
-- White Steamed Rice
    (17, 'Small', 2.30, 780),
    (17, 'Medium', 3.50, 890),
    (17, 'Large', 5.20, 1100),

-- Chicken Egg Roll
    (18, 'Small (1 pc)', 2.00, 200),
    (18, 'Large (6 pcs)', 11.20, 1200),
-- Veggie Spring Roll
    (19, 'Small (2 pcs)', 2.00, 240),
    (19, 'Large (12 pcs)', 11.20, 1440),
-- Cream Cheese Rangoon
    (20, 'Small (3 pcs)', 2.00, 190),
    (20, 'Small (12 pcs)', 8.00, 760),
-- Apple Pie Roll
    (21, 'Small (1 pc)', 2.00, 150),
    (21, 'Medium (2 pcs)', 6.20, 300),
    (21, 'Large (6 pcs)', 8.00, 900),

-- Dr Pepper
    (22, 'Small', 2.10, 150),
    (22, 'Medium', 2.30, 220),
    (22, 'Large', 2.50, 350),
-- Sweet Tea
    (23, 'Small', 2.10, 130),
    (23, 'Medium', 2.30, 190),
    (23, 'Large', 2.50, 290),
-- Pepsi
    (24, 'Small', 2.10, 150),
    (24, 'Medium', 2.30, 230),
    (24, 'Large', 2.50, 360),
-- Diet Pepsi
    (25, 'Small', 2.10, 0),
    (25, 'Medium', 2.30, 0),
    (25, 'Large', 2.50, 0),
-- Mountain Dew
    (26, 'Small', 2.10, 160),
    (26, 'Medium', 2.30, 240),
    (26, 'Large', 2.50, 370),
-- Lipton Brisk Raspberry Iced Tea
    (27, 'Small', 2.10, 90),
    (27, 'Medium', 2.30, 130),
    (27, 'Large', 2.50, 190),
-- Sierra Mist
    (28, 'Small', 2.10, 150),
    (28, 'Medium', 2.30, 220),
    (28, 'Large', 2.50, 340),
-- Tropicana Lemonade
    (29, 'Small', 2.10, 100),
    (29, 'Medium', 2.30, 150),
    (29, 'Large', 2.50, 230),
-- Aquafina
    (30, 'Small', 2.10, 0),
    (30, 'Medium', 2.30, 0),
    (30, 'Large', 2.50, 0),
-- Gatorade Lemon Lime
    (31, 'Small', 2.10, 140),
    (31, 'Medium', 2.30, 200),
    (31, 'Large', 2.50, 310);
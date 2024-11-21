CREATE TABLE IF NOT EXISTS item_sizes (
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES menu_items(id),
    item_size VARCHAR(50),
    price DECIMAL(10, 2),
    calories INT,
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

INSERT INTO item_sizes (item_id, item_size, price, calories)
-- Hot Ones Blazing Bourbon Chicken
VALUES ((SELECT id FROM menu_items WHERE item_name='Hot Ones Blazing Bourbon Chicken'), 'Small', 5.20, 400),
       ((SELECT id FROM menu_items WHERE item_name='Hot Ones Blazing Bourbon Chicken'), 'Medium', 8.50, 450),
       ((SELECT id FROM menu_items WHERE item_name='Hot Ones Blazing Bourbon Chicken'), 'Large', 12.10, 600),
-- The Original Orange Chicken
       ((SELECT id FROM menu_items WHERE item_name='The Original Orange Chicken'), 'Small', 5.20, 510),
       ((SELECT id FROM menu_items WHERE item_name='The Original Orange Chicken'), 'Medium', 8.50, 560),
       ((SELECT id FROM menu_items WHERE item_name='The Original Orange Chicken'), 'Large', 12.10, 700),
-- Black Pepper Sirloin Steak (Premium)
       ((SELECT id FROM menu_items WHERE item_name='Black Pepper Sirloin Steak'), 'Small', 6.70, 180),
       ((SELECT id FROM menu_items WHERE item_name='Black Pepper Sirloin Steak'), 'Medium', 11.50, 250),
       ((SELECT id FROM menu_items WHERE item_name='Black Pepper Sirloin Steak'), 'Large', 15.70, 600),
-- Honey Walnut Shrimp (Premium)
       ((SELECT id FROM menu_items WHERE item_name='Honey Walnut Shrimp'), 'Small', 6.70, 430),
       ((SELECT id FROM menu_items WHERE item_name='Honey Walnut Shrimp'), 'Medium', 11.50, 580),
       ((SELECT id FROM menu_items WHERE item_name='Honey Walnut Shrimp'), 'Large', 15.70, 750),
-- Grilled Teriyaki Chicken
       ((SELECT id FROM menu_items WHERE item_name='Grilled Teriyaki Chicken'), 'Small', 5.20, 275),
       ((SELECT id FROM menu_items WHERE item_name='Grilled Teriyaki Chicken'), 'Medium', 8.50, 350),
       ((SELECT id FROM menu_items WHERE item_name='Grilled Teriyaki Chicken'), 'Large', 12.10, 500),
-- Broccoli Beef
       ((SELECT id FROM menu_items WHERE item_name='Broccoli Beef'), 'Small', 5.20, 150),
       ((SELECT id FROM menu_items WHERE item_name='Broccoli Beef'), 'Medium', 8.50, 300),
       ((SELECT id FROM menu_items WHERE item_name='Broccoli Beef'), 'Large', 12.10, 500),
-- Kung Pao Chicken
       ((SELECT id FROM menu_items WHERE item_name='Kung Pao Chicken'), 'Small', 5.20, 320),
       ((SELECT id FROM menu_items WHERE item_name='Kung Pao Chicken'), 'Medium', 8.50, 400),
       ((SELECT id FROM menu_items WHERE item_name='Kung Pao Chicken'), 'Large', 12.10, 600),
-- Honey Sesame Chicken Breast
       ((SELECT id FROM menu_items WHERE item_name='Honey Sesame Chicken Breast'), 'Small', 5.20, 340),
       ((SELECT id FROM menu_items WHERE item_name='Honey Sesame Chicken Breast'), 'Medium', 8.50, 400),
       ((SELECT id FROM menu_items WHERE item_name='Honey Sesame Chicken Breast'), 'Large', 12.10, 550),
-- Beijing Beef
       ((SELECT id FROM menu_items WHERE item_name='Beijing Beef'), 'Small', 6.70, 480),
       ((SELECT id FROM menu_items WHERE item_name='Beijing Beef'), 'Medium', 11.50, 590),
       ((SELECT id FROM menu_items WHERE item_name='Beijing Beef'), 'Large', 15.70, 670),
-- Mushroom Chicken
       ((SELECT id FROM menu_items WHERE item_name='Mushroom Chicken'), 'Small', 5.20, 220),
       ((SELECT id FROM menu_items WHERE item_name='Mushroom Chicken'), 'Medium', 8.50, 350),
       ((SELECT id FROM menu_items WHERE item_name='Mushroom Chicken'), 'Large', 12.10, 420),
-- SweetFire Chicken Breast
       ((SELECT id FROM menu_items WHERE item_name='SweetFire Chicken Breast'), 'Small', 5.20, 380),
       ((SELECT id FROM menu_items WHERE item_name='SweetFire Chicken Breast'), 'Medium', 8.50, 450),
       ((SELECT id FROM menu_items WHERE item_name='SweetFire Chicken Breast'), 'Large', 12.10, 570),
-- String Bean Chicken Breast
       ((SELECT id FROM menu_items WHERE item_name='String Bean Chicken Breast'), 'Small', 5.20, 210),
       ((SELECT id FROM menu_items WHERE item_name='String Bean Chicken Breast'), 'Medium', 8.50, 320),
       ((SELECT id FROM menu_items WHERE item_name='String Bean Chicken Breast'), 'Large', 12.10, 490),
-- Black Pepper Chicken
       ((SELECT id FROM menu_items WHERE item_name='Black Pepper Chicken'), 'Small', 5.20, 280),
       ((SELECT id FROM menu_items WHERE item_name='Black Pepper Chicken'), 'Medium', 8.50, 340),
       ((SELECT id FROM menu_items WHERE item_name='Black Pepper Chicken'), 'Large', 12.10, 470),
-- Super Greens
       ((SELECT id FROM menu_items WHERE item_name='Super Greens'), 'Small', 2.50, 180),
       ((SELECT id FROM menu_items WHERE item_name='Super Greens'), 'Medium', 5.50, 250),
       ((SELECT id FROM menu_items WHERE item_name='Super Greens'), 'Large', 7.20, 340),
-- Chow Mein
       ((SELECT id FROM menu_items WHERE item_name='Chow Mein'), 'Small', 2.50, 880),
       ((SELECT id FROM menu_items WHERE item_name='Chow Mein'), 'Medium', 5.50, 950),
       ((SELECT id FROM menu_items WHERE item_name='Chow Mein'), 'Large', 7.20, 1100),
-- Fried Rice
       ((SELECT id FROM menu_items WHERE item_name='Fried Rice'), 'Small', 2.50, 932),
       ((SELECT id FROM menu_items WHERE item_name='Fried Rice'), 'Medium', 5.50, 1100),
       ((SELECT id FROM menu_items WHERE item_name='Fried Rice'), 'Large', 7.20, 1300),
-- White Steamed Rice
       ((SELECT id FROM menu_items WHERE item_name='White Steamed Rice'), 'Small', 2.30, 780),
       ((SELECT id FROM menu_items WHERE item_name='White Steamed Rice'), 'Medium', 3.50, 890),
       ((SELECT id FROM menu_items WHERE item_name='White Steamed Rice'), 'Large', 5.20, 1100),
-- Chicken Egg Roll
       ((SELECT id FROM menu_items WHERE item_name='Chicken Egg Roll'), 'Small', 2.00, 200),
       ((SELECT id FROM menu_items WHERE item_name='Chicken Egg Roll'), 'Large', 11.20, 1200),
-- Veggie Spring Roll
       ((SELECT id FROM menu_items WHERE item_name='Veggie Spring Roll'), 'Small', 2.00, 240),
       ((SELECT id FROM menu_items WHERE item_name='Veggie Spring Roll'), 'Large', 11.20, 1440),
-- Cream Cheese Rangoon
       ((SELECT id FROM menu_items WHERE item_name='Cream Cheese Rangoon'), 'Small', 2.00, 190),
       ((SELECT id FROM menu_items WHERE item_name='Cream Cheese Rangoon'), 'Large', 8.00, 760),
-- Apple Pie Roll
       ((SELECT id FROM menu_items WHERE item_name='Apple Pie Roll'), 'Small', 2.00, 150),
       ((SELECT id FROM menu_items WHERE item_name='Apple Pie Roll'), 'Medium', 6.20, 300),
       ((SELECT id FROM menu_items WHERE item_name='Apple Pie Roll'), 'Large', 8.00, 900),
-- Dr Pepper
       ((SELECT id FROM menu_items WHERE item_name='Dr Pepper'), 'Small', 2.10, 150),
       ((SELECT id FROM menu_items WHERE item_name='Dr Pepper'), 'Medium', 2.30, 220),
       ((SELECT id FROM menu_items WHERE item_name='Dr Pepper'), 'Large', 2.50, 350),
-- Sweet Tea
       ((SELECT id FROM menu_items WHERE item_name='Sweet Tea'), 'Small', 2.10, 130),
       ((SELECT id FROM menu_items WHERE item_name='Sweet Tea'), 'Medium', 2.30, 190),
       ((SELECT id FROM menu_items WHERE item_name='Sweet Tea'), 'Large', 2.50, 290),
-- Pepsi
       ((SELECT id FROM menu_items WHERE item_name='Pepsi'), 'Small', 2.10, 150),
       ((SELECT id FROM menu_items WHERE item_name='Pepsi'), 'Medium', 2.30, 230),
       ((SELECT id FROM menu_items WHERE item_name='Pepsi'), 'Large', 2.50, 360),
-- Diet Pepsi
       ((SELECT id FROM menu_items WHERE item_name='Diet Pepsi'), 'Small', 2.10, 0),
       ((SELECT id FROM menu_items WHERE item_name='Diet Pepsi'), 'Medium', 2.30, 0),
       ((SELECT id FROM menu_items WHERE item_name='Diet Pepsi'), 'Large', 2.50, 0),
-- Mountain Dew
       ((SELECT id FROM menu_items WHERE item_name='Mountain Dew'), 'Small', 2.10, 160),
       ((SELECT id FROM menu_items WHERE item_name='Mountain Dew'), 'Medium', 2.30, 240),
       ((SELECT id FROM menu_items WHERE item_name='Mountain Dew'), 'Large', 2.50, 370),
-- Lipton Brisk Raspberry Iced Tea
       ((SELECT id FROM menu_items WHERE item_name='Lipton Brisk Raspberry Iced Tea'), 'Small', 2.10, 90),
       ((SELECT id FROM menu_items WHERE item_name='Lipton Brisk Raspberry Iced Tea'), 'Medium', 2.30, 130),
       ((SELECT id FROM menu_items WHERE item_name='Lipton Brisk Raspberry Iced Tea'), 'Large', 2.50, 190),
-- Sierra Mist
       ((SELECT id FROM menu_items WHERE item_name='Sierra Mist'), 'Small', 2.10, 150),
       ((SELECT id FROM menu_items WHERE item_name='Sierra Mist'), 'Medium', 2.30, 220),
       ((SELECT id FROM menu_items WHERE item_name='Sierra Mist'), 'Large', 2.50, 340),
-- Tropicana Lemonade
       ((SELECT id FROM menu_items WHERE item_name='Tropicana Lemonade'), 'Small', 2.10, 100),
       ((SELECT id FROM menu_items WHERE item_name='Tropicana Lemonade'), 'Medium', 2.30, 150),
       ((SELECT id FROM menu_items WHERE item_name='Tropicana Lemonade'), 'Large', 2.50, 230),
-- Aquafina
       ((SELECT id FROM menu_items WHERE item_name='Aquafina'), 'Small', 2.10, 0),
       ((SELECT id FROM menu_items WHERE item_name='Aquafina'), 'Medium', 2.30, 0),
       ((SELECT id FROM menu_items WHERE item_name='Aquafina'), 'Large', 2.50, 0),
-- Gatorade Lemon Lime
       ((SELECT id FROM menu_items WHERE item_name='Gatorade Lemon Lime'), 'Small', 2.10, 140),
       ((SELECT id FROM menu_items WHERE item_name='Gatorade Lemon Lime'), 'Medium', 2.30, 200),
       ((SELECT id FROM menu_items WHERE item_name='Gatorade Lemon Lime'), 'Large', 2.50, 310);
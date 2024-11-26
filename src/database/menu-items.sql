CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    category TEXT,
    inventory_item_ids INT[],
    descr TEXT,
    available BOOLEAN DEFAULT TRUE,
    is_seasonal BOOLEAN DEFAULT FALSE,
    image_url TEXT
);

INSERT INTO menu_items (item_name, category, inventory_item_ids, descr, image_url)
VALUES
    ('Hot Ones Blazing Bourbon Chicken', 'Entree', '{5, 32, 24}', 'Crispy boneless chicken bites and fresh veggies all wok-tossed in a spicy and sweet bourbon sauce', 'https://olo-images-live.imgix.net/50/503be498564c415eb59e4e37120117b0.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=91acd3adc699123bb269b094fb843769'),
    ('The Original Orange Chicken', 'Entree', '{5, 32, 24}', 'Tender chicken wok-tossed in a sweet and tangy sauce', 'https://olo-images-live.imgix.net/78/783b6c093c4c44428516139005a621f1.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=e8191ba402e81280158b4793829b83e0'),
    ('Black Pepper Sirloin Steak', 'Entree', '{8, 32, 16}', 'Sirloin steak, bell peppers, and onions wok-tossed in a savory black pepper sauce', 'https://olo-images-live.imgix.net/fd/fd7ab3840a8f476db096435bfef01322.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=db6bb16a3f93d09d28b09f7e3df02679'),
    ('Honey Walnut Shrimp', 'Entree', '{9, 29}', 'Crispy shrimp with honey sauce and glazed walnuts', 'https://olo-images-live.imgix.net/e0/e065708712fb4fa2b43d3b6a34e7993d.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=a195a7d0bfcdab2002821f262b3fb624'),
    ('Grilled Teriyaki Chicken', 'Entree', '{6, 15, 17, 34}', 'Grilled chicken with teriyaki sauce', 'https://olo-images-live.imgix.net/fc/fc752b893d2e4c669ff8bf62db2c3f92.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=28a9b1c35bfd1818bbf28b2370af3f59'),
    ('Broccoli Beef', 'Entree', '{8, 10, 32}', 'Tender beef with fresh broccoli in ginger soy sauce', 'https://olo-images-live.imgix.net/9f/9f78f560d6b84292834b292e7f860aa3.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=ada605f1c6124bf38a69997f880b1548'),
    ('Kung Pao Chicken', 'Entree', '{6, 15, 17, 34}', 'Spicy stir-fry of chicken, peanuts, and vegetables', 'https://olo-images-live.imgix.net/c6/c6bab5caab634b19ae91642a63fcec4e.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=023e0344c42bb51a61efa94b20b74d45'),
    ('Honey Sesame Chicken Breast', 'Entree', '{6, 16, 30}', 'Crispy chicken breast, string beans, bell peppers, and sesame seeds in a honey sauce', 'https://olo-images-live.imgix.net/c2/c23ffd19030e4ac69087df2184fbd23b.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=7e4ca8a9338dae1e52174487f3abb181'),
    ('Beijing Beef', 'Entree', '{8, 10, 32}', 'Crispy beef, bell peppers, and onions in a sweet-tangy sauce', 'https://olo-images-live.imgix.net/23/23bb4f38e2b541709bc50ac2c3eb3652.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=0fa142e417bfef7acf816051229363e8'), 
    ('Mushroom Chicken', 'Entree', '{6, 18, 14}', 'Chicken with mushrooms and zucchini in a light ginger soy sauce', 'https://olo-images-live.imgix.net/8b/8b254283b24a4643949f9dc649a5bbca.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=5c71dcc68a77256b11d3628316d777cd'),
    ('SweetFire Chicken Breast', 'Entree', '{6, 16, 23}', 'Crispy chicken breast with a sweet and spicy sauce, pineapple, and bell peppers', 'https://olo-images-live.imgix.net/0b/0b0ea08793c24116a44894d0f28a30a6.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=be101e1b67cff8266946721f95e1920f'),
    ('String Bean Chicken Breast', 'Entree', '{6, 19, 14}', 'Chicken breast with string beans and onions in a garlic sauce', 'https://olo-images-live.imgix.net/74/7451e5b6d3c14b6582c2cca8e01c1f71.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=7adf55b5ffba687a6e92f635682432c2'),
    ('Black Pepper Chicken', 'Entree', '{6, 14}', 'Chicken with black pepper, celery, and onions', 'https://olo-images-live.imgix.net/53/53efafba80ed4363b8a3a632a4806565.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=8807d429304c6d38fb8c40203de6e3cd'),
    
    ('Super Greens', 'Side', '{10, 21, 22}', 'A healthy blend of broccoli, kale, and cabbage', 'https://olo-images-live.imgix.net/4f/4f61599dba714395b526fad311f09ecf.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=929eccce4846f47c41170e7aefed0382'),
    ('Chow Mein', 'Side', '{25, 14}', 'Stir-fried wheat noodles with onions, celery, and cabbage', 'https://olo-images-live.imgix.net/77/77c49b6405af4f0cac296293e1d559ea.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=05ee72f3039f6e56d181aeb441f848ff'),
    ('Fried Rice', 'Side', '{26, 27, 12, 14}', 'Stir-fried rice with peas, carrots, and scrambled egg', 'https://olo-images-live.imgix.net/ff/ff1cd394782b46298ddfc8086896444b.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=f4bd9545f88c7cd671ec849d0c75a4ed'),
    ('White Steamed Rice', 'Side', '{26}', 'Steamed long-grain white rice', 'https://olo-images-live.imgix.net/1e/1eecd6a480134a45b88198ec2a57a83e.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=05d420b31613cf44fd57d09c352ad2e6'), 

    ('Chicken Egg Roll', 'Appetizer', '{1}', 'Chicken and vegetables in a crispy wonton wrapper', 'https://olo-images-live.imgix.net/52/524bbb9023e2409b8d3fceae944a808f.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4f4cc30df356786bbe3968181f8c5160'),
    ('Veggie Spring Roll', 'Appetizer', '{2}', 'Crispy rolls filled with fresh veggies', 'https://olo-images-live.imgix.net/18/183834b8a35a4737a73a28421f68b4f0.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=0d4be7c417ec1998251da41d5bfe13fb'),
    ('Cream Cheese Rangoon', 'Appetizer', '{3}', 'Wonton wrappers filled with cream cheese and served crispy', 'https://olo-images-live.imgix.net/fe/fef7db209d7d41e6ae065af16afa1577.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=f14d518edf4e7ee0fd22b4d3cddc59b8'),
    ('Apple Pie Roll', 'Appetizer', '{4}', 'Crispy wonton wrapper filled with apple pie filling', 'https://olo-images-live.imgix.net/ab/ab4e688dea2b4b56b79fa2ff42a31f24.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4b9d93576ba69591523a4c60034d54d3'),

    ('Dr Pepper', 'Drink', '{42}', 'Refreshing Dr Pepper', 'https://olo-images-live.imgix.net/30/30391bd46a144cedb219c0471be498fe.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=e821e1c6b612c6a431714fef0d0bb172'),
    ('Sweet Tea', 'Drink', '{43}', 'Sweetened iced tea', 'https://olo-images-live.imgix.net/5f/5f490aede80f4d1a99ae402bf4b76c33.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=0ae5ed7d2c52bedfbe887592b09ebc9c'),
    ('Pepsi', 'Drink', '{44}', 'Classic Pepsi', 'https://olo-images-live.imgix.net/2a/2a10ad1b282741839242b728d48fae1c.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=94a12b75b2e805caa712a84259aab899'),
    ('Diet Pepsi', 'Drink', '{35}', 'Diet Pepsi with zero calories', 'https://olo-images-live.imgix.net/07/07eec18462d34cd28a20e764a7c9a3f5.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4dabda64016c0558aa782d5ffacef48a'),
    ('Mountain Dew', 'Drink', '{36}', 'Citrus-flavored soft drink', 'https://olo-images-live.imgix.net/08/08fa5bd920b24cef821b992c39dc66d6.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=5fee84f8d0a73a623d4b1540f715dc44'),
    ('Lipton Brisk Raspberry Iced Tea', 'Drink', '{37}', 'Raspberry-flavored iced tea', 'https://olo-images-live.imgix.net/9f/9f95a6ded6ee426d99ce700b48f2bc14.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=dc4ec80e3034a7bd132dc2990149603a'),
    ('Sierra Mist', 'Drink', '{38}', 'Lemon-lime soda', 'https://olo-images-live.imgix.net/e5/e5aa259f1e0a41fc8fbbec970b523190.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=5a937bd6dbe226fbda87b3489827ec16'),
    ('Tropicana Lemonade', 'Drink', '{39}', 'Refreshing lemonade', 'https://olo-images-live.imgix.net/25/25422dfbe7b340f8884288c075692b2f.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=9cbb80d268521946e202b5a34dd791f9'),
    ('Aquafina', 'Drink', '{40}', 'Bottled water', 'https://olo-images-live.imgix.net/02/02c37c0783f44e95bb99e3df9d8a33dc.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=b45bf71487256a41c2b36b012a33cd4a'),
    ('Gatorade Lemon Lime', 'Drink', '{41}', 'Electrolyte drink with lemon-lime flavor', 'https://olo-images-live.imgix.net/57/5717db5694df4f66801ae23057a4f238.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=1596b46ff8a0c14560eb8b52345b58b6');
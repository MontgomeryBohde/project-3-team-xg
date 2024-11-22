import random
from datetime import datetime, timedelta
import numpy as np

import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

# Connect to the database
connection_string = os.getenv("POSTGRES_URL")

if not connection_string:
    raise ValueError("DATABASE_URL not found in .env file")

conn =  psycopg2.connect(connection_string)

cursor = conn.cursor()

query = "SELECT id, price FROM item_sizes;"
cursor.execute(query)
item_sizes = cursor.fetchall()

cursor.close()
conn.close()

item_sizes = [(item_size_id, float(price)) for item_size_id, price in item_sizes]

# Parameters
#generating sales data from one year ago to today, so 09/25/2023-09/25/2024
weeks = 52  # Number of weeks of sales history, was given by alpha for group of 5
totalSales = 1.0  # Total sales in millions. given by beta for group of 5
peakDays = ["2024-09-20", "2024-05-02", "2024-05-01", "2024-01-16"]  # Example peak days (for start of semester)

# Constants
HOURS_DIST = [0.03, 0.07, 0.14, 0.21, 0.14, 0.08, 0.07, 0.08, 0.09, 0.06, 0.03] # hours from 10 AM to 9 PM inclusive
PAYMENT_METHODS = ['Credit Card', 'Cash', 'Debit Card', 'Mobile Payment']
PAYMENT_METHODS_DIST = [0.55, 0.1, 0.2, 0.15]  # Credit Card, Cash, Debit Card, Mobile Payment

#set the start and end dates
start_date = datetime.now() - timedelta(days=365)
end_date = datetime.now() + timedelta(days=1)
numDays = (end_date - start_date).days

meal_items = []

with open('populate-orders.sql', 'w') as f:
    f.write("INSERT INTO orders (customer_id, cashier_id, order_total, item_size_ids, meal_item_ids, payment_method, placed_time, ready_time, order_status)\nVALUES")
    first = True
    for single_date in (start_date + timedelta(n) for n in range(numDays)):
        if single_date.strftime("%Y-%m-%d") in peakDays:
            ordersCount = random.randint(200, 400)  # Generating more orders on the peak days
        else:
            ordersCount = random.randint(100, 200)  # Generating the normal amoutn of orders per day

        for _ in range(ordersCount):
            if first:
                f.write("\n")
                first = False
            else:
                f.write(",\n")
            f.write("\t")
            customer_id = random.randint(1, 10000)  # Premade 10,000 customers
            cashier_id = random.choice([0, 2, 3])  # Only employee 2 and 3 are cashiers

            item_size_ids = []
            meal_item_ids = []
            order_total = 0.0

            for _ in range(random.randint(0, 3)): # number of meals
                # select a random meal
                side_id = np.random.choice([1, 3, 5, 7], p=[0.1, 0.2, 0.35, 0.35])
                main_ids = []
                for __ in range(random.randint(1, 3)):
                    main_ids.append(random.choice(range(9, 46, 3)))

                meal_item_price = 0.0
                if len(main_ids) == 1:
                    order_total += 8.30
                    meal_item_price = 8.30
                elif len(main_ids) == 2:
                    order_total += 9.80
                    meal_item_price = 9.80
                else:
                    order_total += 11.30
                    meal_item_price = 11.30


                if len(main_ids) == 1:
                    meal_type = "Bowl"
                elif len(main_ids) == 2:
                    meal_type = "Plate"
                else:
                    meal_type = "Bigger Plate"
                meal_items.append((meal_type, side_id, main_ids, meal_item_price))
                meal_item_ids.append(len(meal_items))

            for _ in range(random.randint(0, 3)): # number of items
                item_size_id, price = random.choice(item_sizes)
                item_size_ids.append(item_size_id)
                order_total += price

            order_total *= 1.0825

            payment_method = np.random.choice(PAYMENT_METHODS, p=PAYMENT_METHODS_DIST)

            order_hour = np.random.choice(range(10, 21), p=HOURS_DIST)
            order_minute = random.randint(0, 59)
            order_second = random.randint(0, 59)
            placed_time = single_date.replace(hour=order_hour, minute=order_minute, second=order_second).strftime("%Y-%m-%d %H:%M:%S")

            ready_hour = order_hour
            ready_minute = order_minute + np.random.poisson(3)
            if ready_minute >= 60:
                ready_hour += 1
                ready_minute -= 60
            ready_second = order_second + random.randint(0, 60)
            if ready_second >= 60:
                ready_minute += 1
                ready_second -= 60
                if ready_minute >= 60:
                    ready_hour += 1
                    ready_minute -= 60
            
            ready_time = single_date.replace(hour=ready_hour, minute=ready_minute, second=ready_second).strftime("%Y-%m-%d %H:%M:%S")


            # Insert into the database
            f.write(f"({customer_id}, {cashier_id}, {order_total}, '{{{', '.join(list(map(str, item_size_ids)))}}}', '{{{', '.join(list(map(str, meal_item_ids)))}}}','{payment_method}', '{placed_time}', '{ready_time}', 'Completed')")
    f.write(";\n")

with open('populate-meal-items.sql', 'w') as f:
    f.write("INSERT INTO meal_items (meal_type, side_id, entree_ids, price)\nVALUES")
    first = True
    for i, (meal_type, side_id, main_ids, price) in enumerate(meal_items):
        if first:
            f.write("\n")
            first = False
        else:
            f.write(",\n")
        f.write(f"\t('{meal_type}', {side_id}, '{{{', '.join(list(map(str, main_ids)))}}}', {price})")
    f.write(";\n")
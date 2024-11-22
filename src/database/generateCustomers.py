from faker import Faker

fake = Faker()

with open("populate-customers.sql", "w") as f:
    f.write("INSERT INTO customers (first_name, last_name, phone_number, email, rewards_points, is_guest)\nVALUES\n")
    for i in range(10000):
        if i != 0:
            f.write(",\n")
        f.write("\t")
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = fake.email()
        phone_number = "".join([c for c in fake.phone_number() if c.isnumeric()])[-10:]
        rewards_points = 10 * fake.random_int(min=0, max=25)

        f.write(f"('{first_name}', '{last_name}', '{phone_number}', '{email}', {rewards_points}, FALSE)")

    f.write(";\n")
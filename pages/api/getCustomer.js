// pages/api/getCustomer.js
import { query } from "@lib/db";

export default async function handler(req, res) {
    const { type } = req.query;

    if (req.method === "GET" || req.method === "POST") {
        try {
            let result;

            switch (type) {
                case "customers": {
                    result = await query("SELECT * FROM customers;");
                    return res.status(200).json(result || []);
                }

                case "addCustomer": {
                  const {
                      first_name,
                      last_name,
                      phone_number,
                      email,
                      rewards_points = 0,
                      is_guest = false,
                  } = req.body || {};
              
                  // Validate required fields only
                  if (!first_name) {
                      console.error("Invalid input:", req.body);
                      return res.status(400).json({ error: "Invalid input for adding customer" });
                  }
              
                  try {
                      const result = await query(
                          `
                          INSERT INTO customers 
                          (first_name, last_name, phone_number, email, rewards_points, is_guest)
                          VALUES ($1, $2, $3, $4, $5, $6)
                          RETURNING *;
                          `,
                          [
                              first_name,
                              last_name || "", // Fallback to empty string for null values
                              phone_number || "", // Fallback to empty string for null values
                              email || "", // Fallback to empty string for null values
                              rewards_points,
                              is_guest,
                          ]
                      );
              
                      if (!result || result.length === 0) {
                          console.error("Database insertion failed or returned no rows.");
                          throw new Error("Failed to insert the customer.");
                      }
              
                      return res.status(200).json(result[0]);
                  } catch (error) {
                      console.error("Database Error:", error.message);
                      res.status(500).json({ error: "Failed to insert customer" });
                  }
                  break;
              }              
                case "editCustomer": {
                    const {
                        id,
                        first_name,
                        last_name,
                        phone_number,
                        email,
                        rewards_points,
                        is_guest,
                    } = req.body || {};

                    // Input validation
                    if (!id || !first_name || !last_name || !phone_number || !email) {
                        console.error("Invalid input for editing customer:", req.body);
                        return res
                            .status(400)
                            .json({ error: "Invalid input for editing customer" });
                    }

                    try {
                        const result = await query(
                            `
                            UPDATE customers
                            SET first_name = $1, last_name = $2, phone_number = $3, email = $4, 
                                rewards_points = $5, is_guest = $6
                            WHERE id = $7
                            RETURNING *;
                            `,
                            [
                                first_name,
                                last_name,
                                phone_number,
                                email,
                                rewards_points,
                                is_guest,
                                id,
                            ]
                        );

                        if (!result || !result.length) {
                            console.error("No customer found with ID:", id);
                            return res
                                .status(404)
                                .json({ error: "Customer not found" });
                        }

                        return res.status(200).json(result[0]);
                    } catch (error) {
                        console.error("Database Error in editCustomer:", error);
                        return res
                            .status(500)
                            .json({ error: "Failed to edit customer" });
                    }
                }

                case "removeCustomer": {
                    const { id } = req.body || {};

                    if (!id) {
                        console.error("Validation Error: Missing customer ID", req.body);
                        return res
                            .status(400)
                            .json({ error: "Customer ID is required for removal" });
                    }

                    try {
                        const result = await query(
                            `
                            DELETE FROM customers
                            WHERE id = $1
                            RETURNING *;
                            `,
                            [id]
                        );

                        if (!result || !result.length) {
                            console.error("No customer found with ID:", id);
                            return res
                                .status(404)
                                .json({ error: "Customer not found" });
                        }

                        console.log("Customer removed successfully with ID:", id);
                        return res
                            .status(200)
                            .json({ message: "Customer removed successfully", customer: result[0] });
                    } catch (error) {
                        console.error("Database Error in removeCustomer:", error);
                        return res
                            .status(500)
                            .json({ error: "Failed to remove customer" });
                    }
                }

                case "getCustomerByNum": {
                  const { phoneNumber } = req.query;
              
                  if (!phoneNumber) {
                      console.error("Validation Error: Missing customer phoneNumber");
                      return res.status(400).json({ error: "Customer phoneNumber is required." });
                  }
              
                  try {
                      const customer = await query(
                          `
                          SELECT * 
                          FROM customers 
                          WHERE phone_number = $1;
                          `,
                          [phoneNumber]
                      );
              
                      if (!customer || customer.length === 0) {
                          console.error("No customer found with phoneNumber:", phoneNumber);
                          return res.status(404).json({ error: "Customer not found" });
                      }
              
                      return res.status(200).json(customer[0]); // Return the first customer record
                  } catch (error) {
                      console.error("Database Error in getCustomerByNum:", error);
                      return res.status(500).json({ error: "Failed to fetch customer data" });
                  }
              }              

                default:
                    return res.status(400).json({ error: "Invalid action" });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error("Error handling customer request:", error);
            res.status(500).json({ error: "Failed to process customer request" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
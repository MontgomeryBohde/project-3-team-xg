"use client";
import React, { useState, useEffect } from "react";
import CustomerHeader from "@/components/ui/customer/header/CustomerHeader";

export default function Home() {
  const [customer, setCustomer] = useState(null);
  const [points, setPoints] = useState(null);
  const [numOrders, setNumOrders] = useState(null);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch customer from localStorage
  useEffect(() => {
    const fetchCustomer = async () => {
      const storedCustomer = localStorage.getItem("loyaltyCustomer");
      console.log("stored customer:", storedCustomer);
      if (storedCustomer) {
        try {
          const parsedCustomer = JSON.parse(storedCustomer);
          setCustomer(parsedCustomer);
          console.log("parsed customer:", parsedCustomer);
        } catch (error) {
          console.error("Error parsing stored customer data:", error);
        }
      }
    };

    fetchCustomer();
  }, []);

  // Fetch points, orders, and other data when customer is set
  useEffect(() => {
    console.log(customer);

    if (!customer?.id) return; // Make sure we have customer data before fetching


    const fetchPoints = async () => {
      try {
        const response = await fetch(`/api/getRewards?type=points&customer_id=${customer.id}`);
        if (!response.ok) throw new Error("Failed to fetch points");
        const data = await response.json();
        setPoints(data[0]?.rewards_points || 0);
      } catch (err) {
        console.error("Error fetching points:", err);
        setError("Unable to fetch points.");
      }
    };

    const fetchOrdersThisMonth = async () => {
      try {
        const response = await fetch(`/api/getRewards?type=month&customer_id=${customer.id}`);
        if (!response.ok) throw new Error("Failed to fetch orders this month");
        const data = await response.json();
        setNumOrders(data[0]?.orders_this_month || 0);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to fetch orders this month.");
      }
    };

    const fetchOrders = async () => {
      try {
        setLoading(true);
        console.log("Fetching orders for customer ID:", customer.id);
        const response = await fetch(`/api/getRewards?type=orders&customer_id=${customer.id}`);
        
        // Log the response to ensure it's valid
        console.log("Response:", response);
        
        if (!response.ok) throw new Error("Failed to fetch orders");
    
        const data = await response.json();
        console.log("Fetched orders:", data); // Log the data to check its structure
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to fetch orders.");
      } finally {
        setLoading(false);
      }
    };    

    fetchPoints();
    console.log("points");
    fetchOrdersThisMonth();
    console.log("monthly orders");
    fetchOrders();
    console.log("reg orders");
  }, [customer]); // Depend on `customer`, so this runs when it's set

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner or message here
  }

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  if (!customer) {
    return <div>Loading customer data...</div>;
  }

  // Free Bowl calculations
  const pointsRemainingBowl = points !== null ? 100 - points : 0;
  const pointsPercentageBowl = points !== null ? (points / 100) * 100 : 0;

  // 10% Discount calculations
  const pointsRemainingDiscount = points !== null ? 120 - points : 0;
  const pointsPercentageDiscount = points !== null ? (points / 120) * 100 : 0;

  return (
    <div>
      <CustomerHeader />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Your Rewards</h1>

        {/* Account Information */}
        <div className="mb-4">
          <h2>Account Information</h2>
          <p>
            <strong>Name:</strong> {customer.first_name} {customer.last_name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
        </div>

        {/* Past Orders */}
        <div className="mb-4">
          <h2>Past Orders</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Items</th>
                <th>Total</th>
                <th>Points Earned</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.items}</td>
                  <td>${order.total}</td>
                  <td>{order.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rewards Progress */}
        <div>
          <h2>Rewards Progress</h2>

          {/* Free Bowl */}
          <div className="mb-4">
            <h4>Free Bowl</h4>
            <h6> You can earn a free bowl after 10 orders (100 points). </h6>
            <p>
              {points} points earned. {pointsRemainingBowl} points to reach goal.
            </p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${pointsPercentageBowl}%` }}
                aria-valuenow={points}
                aria-valuemin="0"
                aria-valuemax={100}
              >
                {pointsPercentageBowl.toFixed(0)}%
              </div>
            </div>
          </div>
            
          {/* 10% Discount */}
          <div className="mb-4">
            <h4>10% Discount</h4>
            <h6> You can earn a 10% discount on the rest of orders this month after 12 orders (120 points). </h6>
            <p>
              {points} points earned. {pointsRemainingDiscount} points to reach goal.
            </p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${pointsPercentageDiscount}%` }}
                aria-valuenow={points}
                aria-valuemin="0"
                aria-valuemax={120}
              >
                {pointsPercentageDiscount.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

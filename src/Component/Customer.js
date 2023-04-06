import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-router-dom"; 
import axios from "axios";

const CustomerProfile = ({ userId }) => {
  const [customer, setCustomer] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`/api/customers/${userId}`).then((response) => {
      setCustomer(response.data);
    });
    axios.get(`/api/orders?customerId=${userId}`).then((response) => {
      setOrders(response.data);
    });
  }, [userId]);

  return (
    <div>
      <h1>Welcome back, {customer.firstName}!</h1>
      <div>
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
                <td>
                  <Link to={`/orders/${order.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Account Settings</h2>
        <form>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={customer.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={customer.lastName}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfile;
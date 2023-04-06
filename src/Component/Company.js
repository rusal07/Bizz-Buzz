import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-router-dom";
import axios from "axios";

const CompanyProfile = ({ companyId }) => {
  const [company, setCompany] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/companies/${companyId}`).then((response) => {
      setCompany(response.data);
    });
    axios.get(`/api/products?companyId=${companyId}`).then((response) => {
      setProducts(response.data);
    });
  }, [companyId]);

  return (
    <div>
      <h1>Welcome back, {company.name}!</h1>
      <div>
        <h2>Product Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Edit Product</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <Link to={`/products/${product.id}/edit`}>Edit Product</Link>
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
            <label htmlFor="name">Company Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={company.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={company.email}
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

export default CompanyProfile;
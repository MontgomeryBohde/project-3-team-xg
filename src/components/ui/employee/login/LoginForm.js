"use client";

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginForm.css';

const LoginForm = () => {
  const [userId, setUserId] = useState('1');
  const [password, setPassword] = useState('12345');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`User ID: ${userId}`);
    console.log(`Password: ${password}`);
  };

  return (
    <div id="form-wrapper">
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="user-id">ID</label>
          <input
            type="text"
            className="form-control"
            id="user-id"
            aria-describedby="idHelp"
            placeholder="12345"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="user-password">Password</label>
          <input
            type="password"
            className="form-control"
            id="user-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary bg-danger w-100">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
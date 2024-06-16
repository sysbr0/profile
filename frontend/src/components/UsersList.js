// src/components/UsersList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        console.log('Fetched users:', response.data); // Log fetched data
        setUsers(response.data);
        setLoading(false); // Update loading state once data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Ensure loading state is updated in case of error
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run effect only once

  console.log('Users state:', users); // Log users state to check data

  if (loading) {
    return <p>Loading...</p>; // Render loading message while fetching data
  }

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name}, <strong>Age:</strong> {user.age}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

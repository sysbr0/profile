// src/components/UsersList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
          setError('Request timed out');
        }, 5000); // 5-second timeout

        const response = await axios.get('https://profile-r1ik.onrender.com/api/users', {
          cancelToken: source.token,
        });

        clearTimeout(timeout);
        console.log('Fetched users:', response.data);
        setUsers(response.data);

        // Cache the fetched data
        localStorage.setItem('users', JSON.stringify(response.data));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error('Request canceled:', error.message);
        } else {
          console.error('Error fetching users:', error);
          setError('Error fetching users');
        }
      }
    };

    // Check for cached data
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
    } else {
      fetchUsers();
    }
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Users List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <strong>Name:</strong> {user.name}, <strong>Age:</strong> {user.age}, <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;

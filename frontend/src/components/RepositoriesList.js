// src/components/RepositoriesList.js

import React, { useEffect, useState } from 'react';

const RepositoriesList = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/repositories');
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <div>
      <h1>Repositories List</h1>
      {repositories.map((repository) => (
        <div key={repository._id}>
          <h2>{repository.title}</h2>
          <p>{repository.description}</p>
          <p><strong>Language:</strong> {repository.language}</p>
          <img src={repository.img} alt={repository.title} style={{ width: '100px', height: '100px' }} />
        </div>
      ))}
    </div>
  );
};

export default RepositoriesList;

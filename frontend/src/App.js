// src/App.js

import React from 'react';
import UsersList from './components/UsersList';
import RepositoriesList from './components/RepositoriesList'; // Add this line

function App() {
  return (
    <div className="App">
      <UsersList />
      <RepositoriesList /> {/* Add this line */}
    </div>
  );
}

export default App;

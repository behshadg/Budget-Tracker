// src/components/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { useAuth } from '../context/AuthContext';
import { ExpensesProvider } from '../context/ExpensesContext'; // Ensure you import the ExpensesProvider

function App() {
  const { currentUser } = useAuth();

  return (
    <ExpensesProvider>
      {' '}
      {/* Wrap your routes with ExpensesProvider to make it available throughout */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={currentUser ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </ExpensesProvider>
  );
}

export default App;

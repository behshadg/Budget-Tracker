// src/components/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">
        Welcome to the Personal Budget Tracker
      </h1>
      {currentUser ? (
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-500 hover:text-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 mr-4">
            Sign Up
          </Link>
          <Link to="/signin" className="text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;

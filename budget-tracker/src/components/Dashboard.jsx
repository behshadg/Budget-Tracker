// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import BudgetOverview from './BudgetOverview';

function Dashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const goHome = () => {
    navigate('/'); // Directly navigating to the Home route
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
      <button
        onClick={goHome}
        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black rounded"
      >
        Go Back
      </button>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded ml-4"
      >
        Logout
      </button>
      <ExpenseForm />
      <ExpenseList />
      <BudgetOverview />
    </div>
  );
}

export default Dashboard;

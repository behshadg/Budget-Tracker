// src/components/ExpenseForm.jsx
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function ExpenseForm() {
  const [expense, setExpense] = useState({ name: '', amount: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.name || !expense.amount) return;
    try {
      await addDoc(collection(db, 'expenses'), {
        name: expense.name,
        amount: parseFloat(expense.amount),
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      setExpense({ name: '', amount: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="text"
        placeholder="Expense Name"
        value={expense.name}
        onChange={(e) => setExpense({ ...expense, name: e.target.value })}
        className="border p-2"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;

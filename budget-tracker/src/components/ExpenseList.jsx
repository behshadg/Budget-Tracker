// src/components/ExpenseList.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const q = query(
        collection(db, 'expenses'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExpenses(expensesData);
    };

    fetchExpenses();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Expenses</h2>
      <ul className="mt-2">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between p-2 border-b border-gray-200"
          >
            <span>{expense.name}</span>
            <span>${expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;

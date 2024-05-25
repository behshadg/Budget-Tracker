// src/components/ExpenseList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({ name: '', amount: '', id: '' });

  useEffect(() => {
    fetchExpenses();
  }, [currentUser]);

  const fetchExpenses = async () => {
    if (currentUser) {
      const q = query(
        collection(db, 'expenses'),
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setExpenses(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleEdit = (expense) => {
    setEdit(true);
    setEditData(expense);
  };

  const handleUpdate = async () => {
    const expenseDocRef = doc(db, 'expenses', editData.id);
    await updateDoc(expenseDocRef, {
      name: editData.name,
      amount: parseFloat(editData.amount),
    });
    await fetchExpenses(); // Refresh the list after update
    setEdit(false);
    setEditData({ name: '', amount: '', id: '' });
  };

  const handleAddExpense = async (name, amount) => {
    if (!name || amount <= 0) return;
    await addDoc(collection(db, 'expenses'), {
      name,
      amount,
      userId: currentUser.uid,
      createdAt: new Date(),
    });
    await fetchExpenses(); // Refresh the list after adding
  };

  return (
    <div className="mt-5 mx-auto max-w-4xl px-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Your Expenses
      </h2>
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          {edit && editData.id === expense.id ? (
            <div className="flex flex-col md:flex-row items-center w-full">
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="form-input mb-2 md:mb-0 md:mr-2 px-2 py-1 border rounded"
              />
              <input
                type="number"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({ ...editData, amount: e.target.value })
                }
                className="form-input mb-2 md:mb-0 md:mr-2 px-2 py-1 border rounded"
              />
              <button
                onClick={handleUpdate}
                className="btn bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              >
                Update
              </button>
              <button
                onClick={() => setEdit(false)}
                className="btn bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded shadow ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-between w-full">
              <span>
                {expense.name} - ${expense.amount}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(expense)}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;

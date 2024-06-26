// src/contexts/ExpensesContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './AuthContext';

const ExpensesContext = createContext();

export function useExpenses() {
  return useContext(ExpensesContext);
}

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      return undefined;
    }

    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newExpenses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(newExpenses);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addExpense = async (newExpense) => {
    await addDoc(collection(db, 'expenses'), {
      ...newExpense,
      userId: currentUser.uid,
      createdAt: new Date(), // Ensure createdAt is set here if needed
    });
  };

  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));
  };

  const updateExpense = async (id, updatedExpense) => {
    const expenseDocRef = doc(db, 'expenses', id);
    await updateDoc(expenseDocRef, updatedExpense);
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

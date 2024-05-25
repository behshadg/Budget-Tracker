// src/components/BudgetOverview.jsx
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function BudgetOverview() {
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'expenses'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const expensesData = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          value: parseFloat(doc.data().amount),
        }));
        setData(expensesData);
      }
    };

    fetchData();
  }, [currentUser]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Budget Overview</h2>
      {data.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            iconType="square"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}

export default BudgetOverview;

import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://pg-management-system-fvqd.onrender.com/api";

function Expenses() {

  const [expenses, setExpenses] = useState([]);

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/expenses`);
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const handleChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value
    });
  };

  const addExpense = async () => {

    if (!newExpense.title || !newExpense.amount) {
      alert("Please fill required fields");
      return;
    }

    try {

      await axios.post(`${API}/expenses`, {
        ...newExpense,
        amount: Number(newExpense.amount)
      });

      fetchExpenses();

      setNewExpense({
        title: "",
        amount: "",
        category: "",
        date: ""
      });

    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Expenses</h2>

      <h3>Add Expense</h3>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newExpense.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={newExpense.amount}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newExpense.category}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={newExpense.date}
        onChange={handleChange}
      />

      <button onClick={addExpense}>Add Expense</button>

      <br /><br />

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.id}</td>
              <td>{exp.title || "N/A"}</td>
              <td>{exp.amount || 0}</td>
              <td>{exp.category || "N/A"}</td>
              <td>{exp.date || "N/A"}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Expenses;
import React, { useEffect, useState } from 'react';
import API from './api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });

  
  const fetchExpenses = () => {
    API.get('/')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/', form)
      .then(() => {
        setForm({ description: '', amount: '', date: '', category: '' });
        fetchExpenses();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Expense List</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <button type="submit">Add Expense</button>
      </form>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {expenses.map((e) => (
            <li key={e.id}>
              {e.description} – ${e.amount} on {e.date} ({e.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import api from '../api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: '' });

  const fetchExpenses = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const { data } = await api.get(`/expenses?${queryParams}`);
      setExpenses(data);
    } catch (error) {
      console.error('Failed to fetch expenses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(filters);
  }, [filters]);

  const handleAddOrUpdate = async (expenseData) => {
    try {
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense._id}`, expenseData);
        setEditingExpense(null);
      } else {
        await api.post('/expenses', expenseData);
      }
      await fetchExpenses();
    } catch (error) {
      console.error('Failed to save expense', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        fetchExpenses();
      } catch (error) {
        console.error('Failed to delete expense', error);
      }
    }
  };

  const exportToCSV = () => {
    if (expenses.length === 0) {
      alert("No expenses to export!");
      return;
    }
    
    const headers = ["Title", "Amount", "Category", "Description", "Date"];
    const csvRows = [headers.join(',')];
    
    expenses.forEach(exp => {
      const row = [
        `"${exp.title.replace(/"/g, '""')}"`,
        exp.amount,
        `"${exp.category}"`,
        `"${(exp.description || '').replace(/"/g, '""')}"`,
        `"${new Date(exp.date).toISOString().split('T')[0]}"`
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'expenses.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading expenses...</div>;

  return (
    <div className="animate-fade-in">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Expenses</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your daily expenses</p>
        </div>
        <button className="btn btn-primary" onClick={exportToCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search expenses by title..." 
          className="form-input" 
          style={{ flex: 1, minWidth: '200px' }}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select 
          className="form-input" 
          style={{ width: 'auto', minWidth: '150px' }}
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        {(filters.search || filters.category) && (
          <button 
            className="btn btn-danger" 
            onClick={() => setFilters({ search: '', category: '' })}
          >
            Clear Filters
          </button>
        )}
      </div>

      <ExpenseForm 
        onSubmit={handleAddOrUpdate} 
        initialData={editingExpense} 
        onCancel={editingExpense ? () => setEditingExpense(null) : null}
      />

      <ExpenseList 
        expenses={expenses} 
        onEdit={(expense) => setEditingExpense(expense)} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default Expenses;

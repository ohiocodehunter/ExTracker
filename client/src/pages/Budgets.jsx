import { useState, useEffect } from 'react';
import api from '../api';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    category: 'Food',
    amount: ''
  });

  const fetchBudgets = async () => {
    try {
      const { data } = await api.get('/budgets');
      setBudgets(data);
    } catch (err) {
      console.error('Failed to fetch budgets', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.post('/budgets', {
        category: formData.category,
        amount: Number(formData.amount)
      });
      setFormData({ ...formData, amount: '' });
      fetchBudgets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save budget');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage Budgets</h2>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
        <div>
          <form onSubmit={handleSubmit} className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Set Category Budget</h3>
            {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-input" required>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Monthly Limit ($)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="form-input"
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Budget'}
            </button>
          </form>
        </div>

        <div>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Current Budgets</h3>
            {budgets.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No budgets set yet. Create one to start tracking!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {budgets.map(b => (
                  <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-color)', borderRadius: '8px' }}>
                    <span style={{ fontWeight: '500' }}>{b.category}</span>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${b.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgets;

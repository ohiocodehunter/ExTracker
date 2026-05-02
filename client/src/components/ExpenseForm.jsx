import { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];

const ExpenseForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount,
        description: initialData.description || '',
        category: initialData.category,
        date: new Date(initialData.date).toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      await onSubmit({
        ...formData,
        amount: Number(formData.amount)
      });
      
      setSuccess(initialData ? 'Expense updated successfully!' : 'Expense added successfully!');
      
      if (!initialData) {
        setFormData({
          title: '',
          amount: '',
          description: '',
          category: 'Food',
          date: new Date().toISOString().split('T')[0]
        });
      }
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while saving the expense.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card animate-fade-in" style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>{initialData ? 'Edit Expense' : 'Add New Expense'}</h3>
      
      {error && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', borderRadius: '8px', marginBottom: '1rem' }}>{success}</div>}
      
      <div className="grid grid-cols-2">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="e.g. Groceries"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-input"
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            required
            disabled={isSubmitting}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label className="form-label">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            rows="2"
            placeholder="Add some notes about this expense..."
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (initialData ? 'Update Expense' : 'Add Expense')}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-danger" disabled={isSubmitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;

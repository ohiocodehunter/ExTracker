import { Pencil, Trash2 } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No expenses found. Add some to get started!</p>
      </div>
    );
  }

  return (
    <div className="card table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id} className="animate-fade-in">
              <td style={{ fontWeight: 500 }}>{expense.title}</td>
              <td>
                <span className="badge">{expense.category}</span>
              </td>
              <td style={{ fontWeight: 600 }}>${expense.amount.toFixed(2)}</td>
              <td style={{ color: 'var(--text-secondary)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {expense.description || '-'}
              </td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => onEdit(expense)}
                    className="btn-icon"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(expense._id)}
                    className="btn-icon"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;

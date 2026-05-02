import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Target, Plus, Check } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  
  const [totalThisMonth, setTotalThisMonth] = useState(0);
  const [momChange, setMomChange] = useState(null); // Percentage change Month over Month
  const [loading, setLoading] = useState(true);

  // Goal Form State
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', targetAmount: '', currentAmount: '' });
  const [addingGoal, setAddingGoal] = useState(false);

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

  const fetchData = async () => {
    try {
      const [summaryRes, catRes, budgetRes, expenseRes, goalsRes] = await Promise.all([
        api.get('/expenses/monthly-summary'),
        api.get('/expenses/category-summary'),
        api.get('/budgets'),
        api.get('/expenses?limit=5'),
        api.get('/goals')
      ]);

      // 1. Process Monthly Summary & MoM
      const data = summaryRes.data;
      const formattedData = data.map(item => {
        const date = new Date(item._id.year, item._id.month - 1);
        return {
          name: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
          total: item.total
        };
      });
      setSummary(formattedData);

      const currentDate = new Date();
      const thisMonth = data.find(item => item._id.year === currentDate.getFullYear() && item._id.month === currentDate.getMonth() + 1);
      
      let lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const lastMonth = data.find(item => item._id.year === lastMonthDate.getFullYear() && item._id.month === lastMonthDate.getMonth() + 1);

      const currentTotal = thisMonth ? thisMonth.total : 0;
      const lastTotal = lastMonth ? lastMonth.total : 0;
      setTotalThisMonth(currentTotal);

      if (lastTotal > 0) {
        const diff = ((currentTotal - lastTotal) / lastTotal) * 100;
        setMomChange(diff);
      } else {
        setMomChange(null);
      }

      // 2. Other Data
      setCategorySummary(catRes.data);
      setBudgets(budgetRes.data);
      setRecentExpenses(expenseRes.data);
      setGoals(goalsRes.data);

    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setAddingGoal(true);
    try {
      await api.post('/goals', {
        title: newGoal.title,
        targetAmount: Number(newGoal.targetAmount),
        currentAmount: Number(newGoal.currentAmount) || 0
      });
      setShowGoalForm(false);
      setNewGoal({ title: '', targetAmount: '', currentAmount: '' });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Failed to add goal', error);
    } finally {
      setAddingGoal(false);
    }
  };

  const handleAddFundsToGoal = async (goal) => {
    const amountStr = prompt(`How much do you want to add to ${goal.title}?`);
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) return alert("Invalid amount");

    try {
      await api.put(`/goals/${goal._id}`, {
        ...goal,
        currentAmount: goal.currentAmount + amount
      });
      fetchData();
    } catch (error) {
      console.error('Failed to update goal', error);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="header">
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's your financial overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2rem', gap: '2rem' }}>
        {/* Total This Month with MoM Badge */}
        <div className="card stat-card" style={{ position: 'relative' }}>
          <span className="stat-title">Total This Month</span>
          <span className="stat-value">${totalThisMonth.toFixed(2)}</span>
          
          {momChange !== null && (
            <div style={{ 
              position: 'absolute', top: '1.5rem', right: '1.5rem', 
              display: 'flex', alignItems: 'center', gap: '0.25rem',
              color: momChange > 0 ? 'var(--danger-color)' : 'var(--success-color)',
              background: momChange > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              padding: '0.25rem 0.5rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: '600'
            }}>
              {momChange > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(momChange).toFixed(1)}% vs last month
            </div>
          )}
        </div>

        {/* Goals Summary Card */}
        <div className="card stat-card">
          <span className="stat-title">Active Goals</span>
          <span className="stat-value">{goals.length}</span>
        </div>

        {/* Recent Expenses Summary */}
        <div className="card stat-card">
          <span className="stat-title">Budgets Tracked</span>
          <span className="stat-value">{budgets.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Monthly Expenses Overview</h3>
          {summary.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--primary-color)' }}
                />
                <Bar dataKey="total" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No expense data available yet.</div>
          )}
        </div>

        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Expenses by Category</h3>
          {categorySummary.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categorySummary} dataKey="total" nameKey="_id" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}>
                  {categorySummary.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No category data available yet.</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
        {/* Savings Goals Section */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Target size={20} color="var(--primary-color)" /> Savings Goals
            </h3>
            <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' }} onClick={() => setShowGoalForm(!showGoalForm)}>
              {showGoalForm ? 'Cancel' : '+ New Goal'}
            </button>
          </div>

          {showGoalForm && (
            <form onSubmit={handleAddGoal} style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <input type="text" placeholder="Goal Name (e.g. Vacation)" className="form-input" value={newGoal.title} onChange={e => setNewGoal({...newGoal, title: e.target.value})} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <input type="number" placeholder="Target ($)" className="form-input" value={newGoal.targetAmount} onChange={e => setNewGoal({...newGoal, targetAmount: e.target.value})} required min="1" />
                </div>
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <input type="number" placeholder="Already Saved ($)" className="form-input" value={newGoal.currentAmount} onChange={e => setNewGoal({...newGoal, currentAmount: e.target.value})} min="0" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={addingGoal}>Save Goal</button>
            </form>
          )}

          {goals.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflowY: 'auto' }}>
              {goals.map(goal => {
                const percent = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
                const isComplete = percent >= 100;
                return (
                  <div key={goal._id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {goal.title}
                        {isComplete && <span style={{ color: 'var(--success-color)' }}><Check size={16} /></span>}
                      </span>
                      <span style={{ color: isComplete ? 'var(--success-color)' : 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        ${goal.currentAmount.toFixed(0)} / ${goal.targetAmount.toFixed(0)}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <div style={{ height: '100%', width: `${percent}%`, backgroundColor: isComplete ? 'var(--success-color)' : goal.color || 'var(--primary-color)', transition: 'width 0.3s ease' }}></div>
                    </div>
                    {!isComplete && (
                      <button className="btn" style={{ width: '100%', padding: '0.5rem', fontSize: '0.875rem', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => handleAddFundsToGoal(goal)}>
                        Add Funds
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            !showGoalForm && <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No goals set yet. Start saving!</div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Budget Progress (Moved to make room) */}
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Budget Progress</h3>
            {budgets.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {budgets.map(budget => {
                  const spent = categorySummary.find(c => c._id === budget.category)?.total || 0;
                  const percent = Math.min(100, (spent / budget.amount) * 100);
                  const isOver = spent > budget.amount;
                  return (
                    <div key={budget._id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '500' }}>{budget.category}</span>
                        <span style={{ color: isOver ? 'var(--danger-color)' : 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          ${spent.toFixed(0)} / ${budget.amount.toFixed(0)}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${percent}%`, backgroundColor: isOver ? 'var(--danger-color)' : 'var(--primary-color)', transition: 'width 0.3s ease' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No budgets set.</p>
            )}
          </div>

          {/* Recent Transactions Widget */}
          <div className="card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Recent Transactions</h3>
            </div>
            
            {recentExpenses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentExpenses.map(expense => (
                  <div key={expense._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{expense.title}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{new Date(expense.date).toLocaleDateString()} &bull; {expense.category}</span>
                    </div>
                    <span style={{ fontWeight: '600', color: 'var(--danger-color)' }}>-${expense.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No recent transactions.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, WalletCards, LogOut, Target } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ padding: '1rem', marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)' }}>
          <WalletCards size={24} />
          ExTracker
        </h2>
      </div>
      
      <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink 
          to="/expenses" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <WalletCards size={20} />
          Expenses
        </NavLink>
        <NavLink 
          to="/budgets" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <Target size={20} />
          Budgets
        </NavLink>
      </nav>
      
      <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <button 
          onClick={handleLogout}
          className="nav-link" 
          style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 'inherit' }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;

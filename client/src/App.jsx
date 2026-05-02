import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budgets from './pages/Budgets';
import GenericPage from './pages/GenericPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './index.css';

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className={`app-container ${user ? 'has-navbar' : ''}`}>
      {user && <Navbar />}
      <main className="main-content" style={{ padding: user ? '2rem' : '0' }}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/expenses" 
              element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/budgets" 
              element={
                <ProtectedRoute>
                  <Budgets />
                </ProtectedRoute>
              } 
            />
            {/* Generic Routes for Landing Page Nav */}
            <Route path="/features" element={<GenericPage />} />
            <Route path="/pricing" element={<GenericPage />} />
            <Route path="/security" element={<GenericPage />} />
            <Route path="/company" element={<GenericPage />} />
            <Route path="/about" element={<GenericPage />} />
            <Route path="/blog" element={<GenericPage />} />
            <Route path="/contact" element={<GenericPage />} />
            <Route path="/privacy" element={<GenericPage />} />
            <Route path="/terms" element={<GenericPage />} />
            <Route path="/product" element={<GenericPage />} />
            <Route path="/legal" element={<GenericPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

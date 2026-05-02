import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, FileText, Lock, LayoutDashboard } from 'lucide-react';

const PAGE_CONTENT = {
  features: {
    title: "Powerful Features for Your Finances",
    icon: <Zap size={64} color="var(--primary-color)" style={{ marginBottom: '2rem' }} />,
    content: [
      { h: "Smart Dashboard", p: "Get a bird's-eye view of your finances with interactive Recharts, showing monthly trends and category breakdowns." },
      { h: "Expense Tracking", p: "Log your daily expenses instantly. Categorize them, add detailed descriptions, and filter through them with ease." },
      { h: "Category Budgets", p: "Set monthly spending limits for categories like Food, Travel, and Bills. Visually track your progress to avoid overspending." },
    ]
  },
  security: {
    title: "Bank-Grade Security",
    icon: <Shield size={64} color="var(--success-color)" style={{ marginBottom: '2rem' }} />,
    content: [
      { h: "Data Encryption", p: "Your passwords are cryptographically hashed using bcrypt before ever touching our database." },
      { h: "Authentication", p: "We use secure JSON Web Tokens (JWT) to ensure only you can access and modify your financial records." },
      { h: "Privacy First", p: "We never sell your transaction history to third parties or advertisers. Your data belongs to you." }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    icon: <Lock size={64} color="var(--text-secondary)" style={{ marginBottom: '2rem' }} />,
    content: [
      { h: "Data Collection", p: "We only collect the data strictly necessary to provide the ExTracker service: your email, and the expenses/budgets you manually input." },
      { h: "Session Management", p: "We use local storage mechanisms to securely maintain your active login session without tracking you across the web." },
      { h: "Data Deletion", p: "You have full ownership of your data. If you delete an expense, it is permanently removed from our servers." }
    ]
  },
  terms: {
    title: "Terms of Service",
    icon: <FileText size={64} color="var(--text-secondary)" style={{ marginBottom: '2rem' }} />,
    content: [
      { h: "Acceptable Use", p: "ExTracker is intended for personal financial tracking. Automated scraping, spamming, or abuse of the API is strictly prohibited." },
      { h: "Account Responsibility", p: "You are solely responsible for maintaining the confidentiality of your login credentials and the accuracy of the data you enter." },
      { h: "Service Availability", p: "While we strive for 100% uptime, the service is provided 'as-is' and we are not liable for temporary service interruptions." }
    ]
  },
  product: {
    title: "The ExTracker Product Suite",
    icon: <LayoutDashboard size={64} color="var(--primary-color)" style={{ marginBottom: '2rem' }} />,
    content: [
      { h: "Built for Speed", p: "ExTracker is built on the lightning-fast MERN stack, ensuring that your dashboard loads instantly." },
      { h: "Mobile Responsive", p: "Manage your money on the go. The entire application is fully responsive and optimized for mobile devices." }
    ]
  },
  legal: {
    title: "Legal Information",
    icon: <FileText size={64} color="var(--text-secondary)" style={{ marginBottom: '2rem' }} />,
    content: [
      { h: "Compliance", p: "ExTracker complies with standard data protection regulations to ensure your rights are respected." },
      { h: "Contact Legal", p: "For any legal inquiries or data requests, please reach out to our legal team via the contact form." }
    ]
  }
};

const GenericPage = () => {
  const location = useLocation();
  const path = location.pathname.substring(1).toLowerCase();
  const pageData = PAGE_CONTENT[path];

  // Fallback for paths that aren't defined in PAGE_CONTENT
  if (!pageData) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{path.charAt(0).toUpperCase() + path.slice(1)}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>This page is currently under construction. Check back soon!</p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '3rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='var(--text-primary)'} onMouseLeave={e => e.target.style.color='var(--text-secondary)'}>
        <ArrowLeft size={20} />
        Back to Home
      </Link>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        {pageData.icon}
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800' }}>{pageData.title}</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', flex: 1 }}>
        {pageData.content.map((section, idx) => (
          <div key={idx} style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{section.h}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>{section.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericPage;

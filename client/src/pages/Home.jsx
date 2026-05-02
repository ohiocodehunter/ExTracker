import { Link } from 'react-router-dom';
import { PieChart, LineChart, ShieldCheck, Zap, BarChart3, Smartphone, WalletCards } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Top Navigation */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, #a855f7 100%)', padding: '0.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <WalletCards size={24} color="white" />
          </div>
          <span style={{ background: 'linear-gradient(to right, #fff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ExTracker</span>
        </div>
        
        <nav className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Features', 'Security'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
              {item}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link className="desktop-only" to="/login" style={{ color: 'var(--text-primary)', fontWeight: '500', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>Log in</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '99px', fontWeight: '600', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)' }}>Start Free</Link>
        </div>
      </header>

      <main style={{ flex: 1, paddingBottom: '4rem' }}>
        {/* Hero Section with Dashboard Mockup */}
        <section style={{ 
          padding: '6rem 2rem', 
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0) 60%)'
        }}>
          {/* Background glowing orb */}
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.05)', color: '#e2e8f0', borderRadius: '99px', fontSize: '0.875rem', fontWeight: '500', marginBottom: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-color)', boxShadow: '0 0 10px var(--success-color)' }}></span>
              Version 2.0 is now live
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 5rem)', 
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '1.5rem', 
              background: 'linear-gradient(180deg, #fff 0%, #94a3b8 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em'
            }}>
              Master your money.<br/>Zero friction.
            </h1>
            
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
              ExTracker connects your spending habits to powerful analytics, giving you complete clarity and control over your financial future.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '99px', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' }}>
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Dashboard UI Mockup */}
          <div className="animate-fade-in" style={{ 
            marginTop: '5rem', 
            width: '100%', 
            maxWidth: '1000px', 
            background: 'rgba(30, 41, 59, 0.7)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '16px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)', 
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Window controls */}
            <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            </div>
            
            <div style={{ display: 'flex', padding: '2rem', gap: '2rem' }}>
              {/* Fake Sidebar */}
              <div style={{ width: '200px', display: 'none', '@media(min-width: 768px)': { display: 'flex' }, flexDirection: 'column', gap: '1rem' }}>
                <div style={{ height: '24px', width: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                <div style={{ height: '24px', width: '150px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '4px', marginTop: '1rem' }}></div>
                <div style={{ height: '24px', width: '130px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                <div style={{ height: '24px', width: '140px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
              </div>
              
              {/* Fake Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ flex: 1, height: '100px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ height: '12px', width: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
                    <div style={{ height: '28px', width: '120px', background: 'var(--primary-color)', borderRadius: '4px', opacity: 0.8 }}></div>
                  </div>
                  <div style={{ flex: 1, height: '100px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ height: '12px', width: '90px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                    <div style={{ height: '28px', width: '100px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 2, height: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', padding: '1rem', gap: '1rem' }}>
                    {/* Fake Bar Chart */}
                    {[40, 70, 45, 90, 65, 30].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--primary-color)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
                    ))}
                  </div>
                  <div style={{ flex: 1, height: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Fake Pie Chart */}
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(var(--primary-color) 0% 40%, #a855f7 40% 75%, #ec4899 75% 100%)' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Logos (Social Proof) */}
        <section style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Trusted by over 50,000 users worldwide</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
            {/* Simulated brand logos with text */}
            {['TechCrunch', 'Forbes', 'Wired', 'TheVerge', 'Bloomberg'].map(brand => (
              <h3 key={brand} style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>{brand}</h3>
            ))}
          </div>
        </section>

        {/* Premium Features Grid */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '700px', margin: '0 auto 5rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', lineHeight: '1.2' }}>Everything you need,<br/>beautifully designed.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>We obsessed over every detail to give you an expense tracker that feels like magic. No clutter, just raw performance.</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {[
              { icon: <Zap size={24} color="white" />, color: '#6366f1', title: "Lightning Fast", desc: "Built with React and Node.js for instant loading and zero lag." },
              { icon: <BarChart3 size={24} color="white" />, color: '#a855f7', title: "Deep Analytics", desc: "Interactive charts that give you crystal clear insights into your habits." },
              { icon: <ShieldCheck size={24} color="white" />, color: '#ec4899', title: "Bank-grade Security", desc: "Your data is encrypted and securely tied to your personal account." },
              { icon: <Smartphone size={24} color="white" />, color: '#10b981', title: "Responsive Design", desc: "Looks stunning and works perfectly on your phone, tablet, or desktop." },
              { icon: <PieChart size={24} color="white" />, color: '#f59e0b', title: "Smart Budgets", desc: "Set limits per category and track your progress in real-time." },
              { icon: <LineChart size={24} color="white" />, color: '#3b82f6', title: "Monthly Tracking", desc: "Compare your spending month over month to see your progress." }
            ].map((feature, idx) => (
              <div key={idx} style={{ 
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(30,41,59,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = 'rgba(30,41,59,0.8)'; 
                e.currentTarget.style.transform = 'translateY(-5px)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = 'rgba(30,41,59,0.3)'; 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              }}
              >
                <div style={{ 
                  width: '48px', height: '48px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, ${feature.color} 0%, rgba(0,0,0,0.5) 150%)`, 
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  boxShadow: `0 8px 16px -4px ${feature.color}40`
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 4rem 2rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)',
            borderRadius: '24px',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background design elements inside CTA */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', color: 'white', fontWeight: '800' }}>Ready to transform your finances?</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
                Join thousands of users who have already taken control of their money with ExTracker.
              </p>
              <Link to="/register" className="btn" style={{ background: 'white', color: '#4f46e5', fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '99px', fontWeight: '700', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)' }}>
                Start Tracking Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        background: 'rgba(15, 23, 42, 0.9)', 
        padding: '4rem 2rem 2rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', marginBottom: '4rem' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>
                <WalletCards size={24} color="var(--primary-color)" />
                <span>ExTracker</span>
              </div>
              <p style={{ lineHeight: '1.6', maxWidth: '300px', fontSize: '0.95rem' }}>
                A premium personal finance tool designed to bring clarity, control, and peace of mind to your financial life.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: '600' }}>Product</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li><Link to="/features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Features</Link></li>
                  <li><Link to="/security" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Security</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: '600' }}>Legal</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li><Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Privacy</Link></li>
                  <li><Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(255,255,255,0.05)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{ fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} ExTracker Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Twitter</a>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>GitHub</a>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

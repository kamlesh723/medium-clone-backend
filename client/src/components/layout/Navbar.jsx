import { Link } from 'react-router-dom';
import { Edit, User, LogOut } from 'lucide-react';

const Navbar = () => {
  // Temporary mock auth state for preview
  const isAuthenticated = false;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--surface)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>
            MediumClone
          </Link>
          <div style={{ position: 'relative', marginLeft: '1rem' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              style={{
                background: 'var(--bg-secondary)',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                outline: 'none',
                width: '200px'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/write" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Edit size={20} />
            <span style={{ display: 'none', '@media(minWidth: 768px)': { display: 'block' } }}>Write</span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <button style={{ color: 'var(--text-secondary)' }}>
                <LogOut size={20} />
              </button>
              <Link to="/profile/me">
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={20} />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--text-secondary)' }}>Sign In</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

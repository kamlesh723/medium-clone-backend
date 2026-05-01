import { useState } from 'react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('published');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" 
          alt="User Profile" 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Kamlesh</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Software Engineer & Writer. Passionate about web development.</p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <span><strong style={{ color: 'var(--text-primary)' }}>142</strong> Followers</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>28</strong> Following</span>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '2rem', display: 'flex', gap: '2rem' }}>
        <button 
          onClick={() => setActiveTab('published')}
          style={{ 
            padding: '1rem 0', 
            fontWeight: activeTab === 'published' ? 600 : 400,
            color: activeTab === 'published' ? 'var(--text-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'published' ? '2px solid var(--text-primary)' : '2px solid transparent'
          }}
        >
          Published (3)
        </button>
        <button 
          onClick={() => setActiveTab('drafts')}
          style={{ 
            padding: '1rem 0', 
            fontWeight: activeTab === 'drafts' ? 600 : 400,
            color: activeTab === 'drafts' ? 'var(--text-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'drafts' ? '2px solid var(--text-primary)' : '2px solid transparent'
          }}
        >
          Drafts (1)
        </button>
      </div>

      <div>
        {activeTab === 'published' ? (
          <div>
            <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>How to center a div in 2026</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>We still use flexbox, but the AI writes it for us.</p>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Published Jan 2, 2026</div>
            </div>
            {/* More posts... */}
          </div>
        ) : (
          <div>
            <div style={{ padding: '1.5rem', border: '1px dashed var(--border)', borderRadius: '8px', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Untitled Draft</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Just some thoughts about the new database paradigm...</p>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Last edited 2 hours ago</div>
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default ProfilePage;

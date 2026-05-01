import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ 
        background: 'var(--bg-secondary)', 
        padding: '4rem 2rem', 
        borderRadius: '16px',
        marginBottom: '3rem',
        border: '1px solid var(--border)'
      }}>
        <h1 className="serif" style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1 }}>
          Stay curious.
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <button className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.25rem' }}>
          Start reading
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
        <div>
          <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            Latest Posts
          </h2>
          {/* Placeholder for posts */}
          {[1, 2, 3].map((item) => (
            <div key={item} style={{ marginBottom: '2.5rem', display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--border)' }}></div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Author Name</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>• Jan 5, 2026</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                  The Future of Web Development in 2026
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  A deep dive into how AI, new frameworks, and web assembly are shaping the next generation of web applications. Exploring the tools that will dominate the landscape.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ background: 'var(--bg-secondary)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>Technology</span>
                  <span>5 min read</span>
                </div>
              </div>
              <div style={{ width: '150px', height: '150px', background: 'var(--bg-secondary)', borderRadius: '8px' }}></div>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'none', '@media(minWidth: 1024px)': { display: 'block' } }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Discover more of what matters to you</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Programming', 'Data Science', 'Technology', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning'].map((tag) => (
              <span key={tag} style={{ 
                background: 'var(--bg-secondary)', 
                padding: '0.5rem 1rem', 
                borderRadius: '9999px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

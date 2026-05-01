import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        <button 
          onClick={() => {
            document.getElementById('feed').scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-primary" 
          style={{ padding: '0.75rem 2rem', fontSize: '1.25rem' }}
        >
          Start reading
        </button>
      </div>

      <div id="feed" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', paddingTop: '1rem' }}>
        <div>
          <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            Latest Posts
          </h2>
          {[
            {
              id: 1,
              title: "The Future of Web Development in 2026",
              author: "Jane Doe",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
              image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
              tag: "Technology"
            },
            {
              id: 2,
              title: "How I Built a Million Dollar SaaS in 6 Months",
              author: "John Smith",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
              tag: "Business"
            },
            {
              id: 3,
              title: "Understanding the New React Compiler",
              author: "Sarah Johnson",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
              image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
              tag: "Programming"
            }
          ].map((item) => (
            <div key={item.id} style={{ marginBottom: '3rem', display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <img src={item.avatar} alt={item.author} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.author}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>• Jan 5, 2026</span>
                </div>
                <Link to={`/post/${item.id}`}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    A deep dive into how AI, new frameworks, and web assembly are shaping the next generation of web applications. Exploring the tools that will dominate the landscape.
                  </p>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ background: 'var(--bg-secondary)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>{item.tag}</span>
                  <span>5 min read</span>
                </div>
              </div>
              <Link to={`/post/${item.id}`}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
                />
              </Link>
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

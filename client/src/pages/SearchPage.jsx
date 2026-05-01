import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('stories');

  // Mock results
  const results = [
    {
      id: 1,
      title: `Understanding ${query ? query : 'the topic'} in 2026`,
      author: "Jane Doe",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
      date: "Jan 5, 2026",
      readTime: "5 min read",
      snippet: `A deep dive into how ${query ? query : 'this technology'} is shaping the next generation of web applications.`
    }
  ];

  const people = [
    { name: "John Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150", bio: "Tech enthusiast and writer" },
    { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150", bio: "Software Engineer @ TechCorp" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}
    >
      <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Results for <span style={{ color: 'var(--text-primary)' }}>{query}</span>
        </h1>

        <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '2rem', display: 'flex', gap: '2rem' }}>
          <button 
            onClick={() => setActiveTab('stories')}
            style={{ 
              padding: '1rem 0', 
              fontWeight: activeTab === 'stories' ? 600 : 400,
              color: activeTab === 'stories' ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'stories' ? '2px solid var(--text-primary)' : '2px solid transparent'
            }}
          >
            Stories
          </button>
          <button 
            onClick={() => setActiveTab('people')}
            style={{ 
              padding: '1rem 0', 
              fontWeight: activeTab === 'people' ? 600 : 400,
              color: activeTab === 'people' ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'people' ? '2px solid var(--text-primary)' : '2px solid transparent'
            }}
          >
            People
          </button>
        </div>

        {activeTab === 'stories' ? (
          <div>
            {results.map((item) => (
              <div key={item.id} style={{ marginBottom: '3rem', display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <img src={item.avatar} alt={item.author} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.author}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>• {item.date}</span>
                  </div>
                  <Link to={`/post/${item.id}`}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.snippet}
                    </p>
                  </Link>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span>{item.readTime}</span>
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
        ) : (
          <div>
            {people.map((person, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img src={person.avatar} alt={person.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{person.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{person.bio}</p>
                </div>
                <button className="btn-secondary">Follow</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ display: 'none', '@media(minWidth: 1024px)': { display: 'block' } }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Related Topics</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['Programming', 'Technology', 'Web Development', 'Design'].map((tag) => (
            <span key={tag} style={{ 
              background: 'var(--bg-secondary)', 
              padding: '0.5rem 1rem', 
              borderRadius: '9999px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPage;

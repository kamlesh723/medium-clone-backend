import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading posts...</div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No posts yet. Be the first to write one!</div>
          ) : (
            posts.map((post) => (
              <div key={post._id} style={{ marginBottom: '3rem', display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <img 
                      src={`https://ui-avatars.com/api/?name=${post.author?.name || 'User'}&background=random`} 
                      alt={post.author?.name} 
                      style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{post.author?.name || 'Unknown'}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      • {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <Link to={`/post/${post._id}`}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                      {post.title}
                    </h3>
                    <div 
                      style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {post.tags && post.tags.length > 0 && (
                      <span style={{ background: 'var(--bg-secondary)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                        {post.tags[0].name || post.tags[0]}
                      </span>
                    )}
                    <span>{Math.max(1, Math.ceil((post.content?.length || 0) / 1000))} min read</span>
                  </div>
                </div>
                {/* Optional thumbnail image if we add images to posts later, using a random unsplash for now based on title length as a seed */}
                <Link to={`/post/${post._id}`}>
                  <img 
                    src={`https://images.unsplash.com/photo-${(post.title.length % 2 === 0) ? '1555066931-4365d14bab8c' : '1460925895917-afdab827c52f'}?auto=format&fit=crop&q=80&w=400`}
                    alt={post.title}
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                </Link>
              </div>
            ))
          )}
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
                color: 'var(--text-secondary)',
                cursor: 'pointer'
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

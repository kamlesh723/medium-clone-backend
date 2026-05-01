import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('published');
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const [pubRes, draftRes] = await Promise.all([
          api.get('/posts/my-posts'),
          api.get('/posts/my-drafts')
        ]);
        setPublishedPosts(pubRes.data.data.posts);
        setDrafts(draftRes.data.data.posts);
      } catch (error) {
        console.error('Failed to fetch profile posts', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchMyPosts();
  }, [user]);

  if (!user) return <div style={{ textAlign: 'center', padding: '4rem' }}>Please log in to view profile.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <img 
          src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=150`} 
          alt="User Profile" 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{user.name}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{user.role === 'admin' ? 'Administrator' : 'Writer'}</p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <span><strong style={{ color: 'var(--text-primary)' }}>{publishedPosts.length}</strong> Published</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>{drafts.length}</strong> Drafts</span>
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
          Published ({publishedPosts.length})
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
          Drafts ({drafts.length})
        </button>
      </div>

      <div>
        {isLoading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>Loading posts...</div>
        ) : activeTab === 'published' ? (
          <div>
            {publishedPosts.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No published posts yet.</p>
            ) : (
              publishedPosts.map(post => (
                <div key={post._id} style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '1rem' }}>
                  <Link to={`/post/${post._id}`}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{post.title}</h3>
                  </Link>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: post.content }} />
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Published {new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            {drafts.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No drafts yet.</p>
            ) : (
              drafts.map(draft => (
                <div key={draft._id} style={{ padding: '1.5rem', border: '1px dashed var(--border)', borderRadius: '8px', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{draft.title || 'Untitled Draft'}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: draft.content }} />
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Last edited {new Date(draft.updatedAt).toLocaleDateString()}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default ProfilePage;

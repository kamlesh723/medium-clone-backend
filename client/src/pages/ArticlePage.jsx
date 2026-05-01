import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, Share2, BookmarkPlus, MoreHorizontal } from 'lucide-react';
import ClapButton from '../components/interaction/ClapButton';
import CommentSection from '../components/interaction/CommentSection';
import { motion } from 'framer-motion';
import api from '../services/api';

const ArticlePage = () => {
  const { id } = useParams();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data.data.post);
      } catch (error) {
        console.error('Failed to fetch post', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (isLoading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>;
  if (!post) return <div style={{ textAlign: 'center', padding: '4rem' }}>Post not found.</div>;

  return (
    <>
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '6rem' }}
      >
        <h1 className="serif" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
          {post.title}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <img src={`https://ui-avatars.com/api/?name=${post.author?.name || 'User'}&background=random`} alt={post.author?.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500, fontSize: '1rem' }}>{post.author?.name}</span>
              <button style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '0.875rem' }}>Follow</button>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>{Math.max(1, Math.ceil((post.content?.length || 0) / 1000))} min read</span>
              <span>·</span>
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Top Interaction Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 0', 
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* TODO: Pass actual claps when API supports it */}
            <ClapButton initialCount={0} />
            <button onClick={() => setIsCommentsOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <MessageCircle size={24} strokeWidth={1.5} />
              <span style={{ fontSize: '1.125rem' }}>0</span>
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)' }}>
            <button><Share2 size={24} strokeWidth={1.5} /></button>
            <button><BookmarkPlus size={24} strokeWidth={1.5} /></button>
            <button><MoreHorizontal size={24} strokeWidth={1.5} /></button>
          </div>
        </div>

        {/* Optional Hero Image - just using random unsplash for visual placeholder */}
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" 
          alt="Article cover" 
          style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '3rem' }} 
        />

        <div className="serif" style={{ fontSize: '1.25rem', lineHeight: 2, color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: post.content }} />

      </motion.article>
      <CommentSection isOpen={isCommentsOpen} onClose={() => setIsCommentsOpen(false)} postId={post._id} />
    </>
  );
};

export default ArticlePage;

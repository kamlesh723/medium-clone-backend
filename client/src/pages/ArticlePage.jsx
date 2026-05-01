import { useState } from 'react';
import { MessageCircle, Share2, BookmarkPlus, MoreHorizontal } from 'lucide-react';
import ClapButton from '../components/interaction/ClapButton';
import CommentSection from '../components/interaction/CommentSection';
import { motion } from 'framer-motion';

const ArticlePage = () => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  return (
    <>
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '6rem' }}
      >
        <h1 className="serif" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
          The Future of Web Development in 2026: Why Everything is Changing Again
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Jane Doe" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500, fontSize: '1rem' }}>Jane Doe</span>
              <button style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '0.875rem' }}>Follow</button>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>5 min read</span>
              <span>·</span>
              <span>Jan 5, 2026</span>
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
            <ClapButton initialCount={142} />
            <button onClick={() => setIsCommentsOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <MessageCircle size={24} strokeWidth={1.5} />
              <span style={{ fontSize: '1.125rem' }}>12</span>
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)' }}>
            <button><Share2 size={24} strokeWidth={1.5} /></button>
            <button><BookmarkPlus size={24} strokeWidth={1.5} /></button>
            <button><MoreHorizontal size={24} strokeWidth={1.5} /></button>
          </div>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" 
          alt="Code on a screen" 
          style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '3rem' }} 
        />

        <div className="serif" style={{ fontSize: '1.25rem', lineHeight: 2, color: 'var(--text-primary)' }}>
        <p style={{ marginBottom: '2rem' }}>
          When we thought the web had finally settled into a predictable rhythm, a new wave of technologies crashed into our collective consciousness. The year is 2026, and the way we build interfaces has fundamentally shifted once again.
        </p>
        <p style={{ marginBottom: '2rem' }}>
          React is still here, but it looks vastly different from the hooks-only era of the early 2020s. We've moved beyond state management wars and endless re-renders. The compiler revolution that started quietly has now become the standard.
        </p>
        <h2 className="sans" style={{ fontSize: '1.75rem', fontWeight: 700, margin: '3rem 0 1.5rem 0' }}>The Compiler Revolution</h2>
        <p style={{ marginBottom: '2rem' }}>
          We no longer write `useMemo` or `useCallback`. The machine writes it for us. We just write plain JavaScript variables, and the compiler figures out the dependencies. It's a return to simplicity, powered by incredibly complex tooling behind the scenes.
        </p>
        <blockquote style={{ 
          borderLeft: '4px solid var(--text-primary)', 
          paddingLeft: '1.5rem', 
          fontStyle: 'italic',
          margin: '2rem 0',
          fontSize: '1.5rem'
        }}>
          "The best tool is the one you don't even know is there."
        </blockquote>
        <p style={{ marginBottom: '2rem' }}>
          As we look towards the rest of the decade, one thing is certain: our job as developers isn't about configuring webpack or arguing about Tailwind versus CSS-in-JS. It's about building experiences that feel alive.
        </p>
      </div>

    </motion.article>
    <CommentSection isOpen={isCommentsOpen} onClose={() => setIsCommentsOpen(false)} />
    </>
  );
};

export default ArticlePage;

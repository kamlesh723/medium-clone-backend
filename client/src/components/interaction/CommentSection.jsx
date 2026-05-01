import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CommentItem from './CommentItem';

const CommentSection = ({ isOpen, onClose }) => {
  const [newComment, setNewComment] = useState('');
  
  // Mock comments
  const [comments, setComments] = useState([
    {
      id: 1,
      author: { name: 'Alice Smith' },
      content: 'This completely changed how I think about compilers! Great write-up.',
      date: '2 hours ago',
      isOwner: false
    },
    {
      id: 2,
      author: { name: 'Bob Jones' },
      content: 'I disagree that we won\'t need to understand the underlying hooks. Abstractions leak.',
      date: '5 hours ago',
      isOwner: false
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: { name: 'You' },
      content: newComment,
      date: 'Just now',
      isOwner: true
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleDelete = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
              zIndex: 100,
              backdropFilter: 'blur(2px)'
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '400px',
              background: 'var(--bg-primary)',
              zIndex: 101,
              boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid var(--border)'
            }}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Responses ({comments.length})</h3>
              <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="What are your thoughts?"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    minHeight: '100px',
                    resize: 'vertical',
                    marginBottom: '1rem',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary" disabled={!newComment.trim()} style={{ opacity: newComment.trim() ? 1 : 0.5 }}>
                    Respond
                  </button>
                </div>
              </form>

              <div>
                {comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentSection;

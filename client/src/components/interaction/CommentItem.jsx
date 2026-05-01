import { Trash2 } from 'lucide-react';

const CommentItem = ({ comment, onDelete }) => {
  return (
    <div style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <img 
            src={`https://ui-avatars.com/api/?name=${comment.author.name}&background=random`} 
            alt={comment.author.name} 
            style={{ width: '32px', height: '32px', borderRadius: '50%' }} 
          />
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{comment.author.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{comment.date}</div>
          </div>
        </div>
        {comment.isOwner && (
          <button 
            onClick={() => onDelete(comment.id)}
            style={{ color: 'var(--text-secondary)', padding: '0.25rem' }}
            title="Delete comment"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{comment.content}</p>
    </div>
  );
};

export default CommentItem;

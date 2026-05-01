import { useState } from 'react';
import { X } from 'lucide-react';

const TagInput = ({ tags, onChange }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (val && !tags.includes(val) && tags.length < 5) {
        onChange([...tags, val]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      padding: '0.5rem',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      background: 'var(--bg-primary)'
    }}>
      {tags.map((tag, index) => (
        <span key={index} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: 'var(--bg-secondary)',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          {tag}
          <button type="button" onClick={() => removeTag(index)} style={{ color: 'var(--text-secondary)' }}>
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length < 5 ? "Add a tag (max 5)..." : ""}
        disabled={tags.length >= 5}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          minWidth: '120px',
          padding: '0.25rem'
        }}
      />
    </div>
  );
};

export default TagInput;

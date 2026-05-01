import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import { motion } from 'framer-motion';
import TagInput from '../components/editor/TagInput';
import api from '../services/api';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Title and content are required');
    
    setIsPublishing(true);
    try {
      const { data } = await api.post('/posts', {
        title,
        content,
        tags,
        status: 'published'
      });
      navigate(`/post/${data.data.post._id}`);
    } catch (error) {
      console.error('Failed to publish', error);
      alert(error.response?.data?.message || 'Failed to publish post');
      setIsPublishing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Draft in {title || 'Untitled'}</p>
        <button onClick={handlePublish} disabled={isPublishing} className="btn-primary" style={{ opacity: isPublishing ? 0.7 : 1 }}>
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="serif"
        style={{
          width: '100%',
          fontSize: '3rem',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          fontWeight: 800
        }}
      />

      <div style={{ marginBottom: '2rem' }}>
        <ReactQuill 
          theme="bubble" 
          value={content} 
          onChange={setContent} 
          placeholder="Tell your story..."
          className="serif editor-container"
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.8
          }}
        />
      </div>

      <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Post Topics</h3>
        <TagInput tags={tags} onChange={setTags} />
      </div>

      {/* Editor specific CSS overrides */}
      <style>{`
        .editor-container .ql-editor {
          padding: 0;
          font-size: 1.25rem;
          min-height: 300px;
        }
        .editor-container .ql-editor.ql-blank::before {
          left: 0;
          font-style: normal;
          color: var(--text-secondary);
        }
      `}</style>
    </motion.div>
  );
};

export default WritePage;

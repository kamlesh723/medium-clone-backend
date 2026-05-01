import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClapButton = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const [isClapping, setIsClapping] = useState(false);
  const [clapsToAdd, setClapsToAdd] = useState(0);
  const timerRef = useRef(null);

  const handleClap = () => {
    setIsClapping(true);
    setCount(prev => prev + 1);
    setClapsToAdd(prev => prev + 1);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsClapping(false);
      setClapsToAdd(0);
      // Here we would actually trigger the API call to update the backend
      console.log('Sending claps to API:', clapsToAdd + 1);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
      <AnimatePresence>
        {isClapping && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -40, scale: 1.2 }}
            exit={{ opacity: 0, y: -60, scale: 0.8 }}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--accent)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              pointerEvents: 'none'
            }}
          >
            +{clapsToAdd}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClap}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill={count > initialCount ? 'var(--accent)' : 'none'} stroke={count > initialCount ? 'var(--accent)' : 'currentColor'} strokeWidth="1.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.button>
      <span style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
        {count}
      </span>
    </div>
  );
};

export default ClapButton;

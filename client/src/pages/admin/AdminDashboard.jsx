import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'user', isActive: true },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'moderator', isActive: true },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', isActive: false },
  ]);

  const toggleRole = (id, currentRole) => {
    const newRole = currentRole === 'user' ? 'moderator' : 'user';
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const deleteUser = (id) => {
    if(confirm('Are you sure you want to soft delete this user?')) {
      setUsers(users.map(u => u.id === id ? { ...u, isActive: false } : u));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 0' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Shield size={32} color="var(--accent)" />
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Admin Dashboard</h1>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Role</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>{user.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    background: user.role === 'moderator' ? 'rgba(26, 137, 23, 0.1)' : 'var(--bg-secondary)', 
                    color: user.role === 'moderator' ? 'var(--accent)' : 'inherit',
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ color: user.isActive ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {user.isActive ? 'Active' : 'Deleted'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {user.isActive && (
                      <>
                        <button 
                          onClick={() => toggleRole(user.id, user.role)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}
                          title="Toggle Moderator Status"
                        >
                          <ShieldAlert size={18} />
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ef4444' }}
                          title="Soft Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

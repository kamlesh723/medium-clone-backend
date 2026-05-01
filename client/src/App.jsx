import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticlePage from './pages/ArticlePage';
import WritePage from './pages/WritePage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="post/:id" element={<ArticlePage />} />
          <Route path="write" element={<WritePage />} />
          <Route path="profile/me" element={<ProfilePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="admin/users" element={<AdminDashboard />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

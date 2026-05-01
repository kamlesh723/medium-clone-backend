import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (data) => {
    const success = await login({ email: data.email, password: data.password });
    if (success) {
      navigate('/');
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} error={error} isLoading={isLoading} />;
};

export default LoginPage;

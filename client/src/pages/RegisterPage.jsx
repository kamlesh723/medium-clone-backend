import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import useAuthStore from '../store/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error, isLoading } = useAuthStore();

  const handleRegister = async (data) => {
    const success = await register(data);
    if (success) {
      navigate('/');
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} error={error} isLoading={isLoading} />;
};

export default RegisterPage;

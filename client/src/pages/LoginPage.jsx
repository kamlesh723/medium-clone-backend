import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log('Login attempt:', data);
    // TODO: wire up API later
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginPage;

import AuthForm from '../components/auth/AuthForm';

const RegisterPage = () => {
  const handleRegister = (data) => {
    console.log('Register attempt:', data);
    // TODO: wire up API later
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;

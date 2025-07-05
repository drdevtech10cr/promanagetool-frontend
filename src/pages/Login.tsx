import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authslice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Message from '../components/ui/Message';
import axiosInstance from '../ApiService/ApiService';

interface LoginFormData {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required('Email or mobile number is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axiosInstance.post('/auth/signin', {
        username: data.username,
        password: data.password,
      });
      console.log('error message ', res)

      const { userToken, user } = res.data.data;

      //Show success message
      setMessage({ type: 'success' , text: res.data?.message });
      
      //  Save token and user in Redux
      dispatch(loginSuccess({ token: userToken, user }));

      // Navigate to dashboard
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err?.message || 'Login failed',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      {message && <Message type={message.type}>{message.text}</Message>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email or Mobile"
          {...register('username')}
          error={errors.username?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" className="w-full mt-2">
          Login
        </Button>
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

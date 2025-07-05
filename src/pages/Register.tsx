import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '../ApiService/ApiService';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Message from '../components/ui/Message';
import { registerSchema } from '../validations/auth.schema';

type RegisterFormData = {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const [message, setMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await axiosInstance.post('/auth/register', data);
      setMessage({ type: 'success', text: res.data.message });
      reset();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Registration failed' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Register</h2>

        {message && <Message type={message.type}>{message.text}</Message>}

        <Input label="First Name" {...register('first_name')} error={errors.first_name?.message} />
        <Input label="Last Name" {...register('last_name')} error={errors.last_name?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Mobile Number" {...register('mobile_number')} error={errors.mobile_number?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

        <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>

        <p className="text-sm mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500 font-medium">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

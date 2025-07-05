import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../ApiService/ApiService';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().oneOf(['active', 'completed']).required('Status is required'),
});

type StatusType = 'active' | 'completed';

interface FormValues {
  title: string;
  description: string;
  status: StatusType;
}


const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosInstance.get(`/project/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const project = res.data.data;
        reset({
          title: project.title,
          description: project.description,
          status: project.status,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, token, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      await axiosInstance.patch(`/project/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Project updated successfully!');
      setTimeout(() => navigate(`/project/${id}`), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update project');
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message type="error">{error}</Message>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Edit Project</h1>

      {message && <Message type="success">{message}</Message>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register('title')}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Enter project title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register('description')}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Enter project description"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            {...register('status')}
            className="w-full mt-1 border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;

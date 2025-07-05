import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../ApiService/ApiService';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  tasks: Task[];
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosInstance.get(`/project/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Message type="error">{error}</Message>;
  if (!project) return <Message type="error">Project not found.</Message>;

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      {/* Header & Edit Project */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
        <Link
          to={`/project/${project.id}/edit`}
          className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          ✏️ Edit Project
        </Link>
      </div>

      {/* Project Description & Status */}
      <p className="mb-2 text-gray-700">{project.description}</p>
      <div className="mb-6">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'completed'
              ? 'bg-green-200 text-green-800'
              : 'bg-blue-200 text-blue-800'
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Task Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
        <Link
          to={`/projects/${project.id}/tasks/create`}
          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          ➕ Add Task
        </Link>
      </div>

      {/* Task List */}
      {project.tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found. Add one above.</p>
      ) : (
        <ul className="space-y-4">
          {project.tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Status: <strong>{task.status}</strong> | Due: {task.dueDate}
                  </div>
                </div>
                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="text-sm text-blue-600 hover:underline ml-4 mt-1"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectDetails;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../ApiService/ApiService';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { Link } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    status: string;
    dueDate: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'completed';
    tasks: Task[];
}

const Dashboard: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [totalData, setTotalData] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fetchProjects = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axiosInstance.get('/project', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { data, totalData, totalPages, currentPage } = res.data.data;

            setProjects(data);
            setTotalData(totalData);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Your Projects</h1>

            {loading && <Loader />}
            {error && <Message type="error">{error}</Message>}

            {!loading && !error && projects.length === 0 && (
                <p className="text-gray-500">No projects found. Start by creating one.</p>
            )}

            {!loading && projects.length > 0 && (
                <div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition"
                            >
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-sm text-gray-600">{project.description}</p>
                                <p className="text-xs mt-2 text-gray-500">
                                    Tasks: {project.tasks?.length || 0}
                                </p>
                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${project.status === 'active'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {project.status}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Optional: Pagination Info */}
                    <div className="text-sm text-gray-500 text-center">
                        Page {currentPage} of {totalPages} — Total Projects: {totalData}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

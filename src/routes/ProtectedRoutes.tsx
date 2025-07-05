import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/store';

const ProtectedRoute: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

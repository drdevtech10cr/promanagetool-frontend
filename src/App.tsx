import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import ProjectDetails from './pages/ProjectDetails'
import CreateOrEditProject from './pages/CreateOrEditProject'

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            element={<ProtectedRoute />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/project/:id/edit" element={<CreateOrEditProject />} />
            
          </Route>


          {/* Redirect unmatched routes */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router >
    </>
  )
}

export default App

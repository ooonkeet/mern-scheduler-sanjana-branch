import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/layouts/Navbar';
import Sidebar from '@/layouts/Sidebar';

// Import your pages
import LoginPage from './pages/LoginPage';
import Universities from './pages/Universities';
import Programs from './pages/programPage';
import Streams from './pages/Streams';
import Sections from './pages/Sections';
import Subjects from './pages/Subjects';
import ClassSettings from './pages/ClassSettings';

// A simple auth check hook
const useAuth = () => {
  const token = localStorage.getItem('token');
  // In a real app, you might also want to validate the token
  return token != null;
};

// Wrapper for routes that require authentication
const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <DashboardLayout /> : <Navigate to="/login" replace />;
};

// Layout for all dashboard pages
const DashboardLayout = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground bg-cover bg-fixed">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar backdrop-blur-lg">
          <Sidebar />
        </aside>

        {/* Right side: Main content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto">
            <Outlet /> {/* Child routes will render here */}
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '12px 16px',
            position: 'relative',
            overflow: 'hidden',
          },
          className: 'custom-toast',
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                <div className="rounded-2xl bg-card text-card-foreground shadow p-6">
                  <h2 className="text-lg font-semibold">Welcome 👋</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    to the admin dashboard. Use the sidebar to navigate through
                    different sections.
                  </p>
                </div>
              </div>
            }
          />
          <Route path="/universities" element={<Universities />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/streams" element={<Streams />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/class-settings" element={<ClassSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>;
}

export default App;

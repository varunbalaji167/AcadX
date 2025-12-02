// App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/contexts/AuthContext";
import { SocketProvider } from "./components/contexts/SocketContext";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import ItemList from "./components/Items/ItemList";
import ItemForm from "./components/Items/ItemForm";
import ItemDetail from "./components/Items/ItemDetail";
import Inbox from "./components/Chats/Inbox";
import HomePage from "./components/HomePage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminItems from "./components/Admin/AdminItems";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#3F51B5]">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-lg font-medium text-[#212121]">
          Checking authentication...
        </span>
      </div>
    );
  }

  return user && user.token ? children : <Navigate to="/" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Checking auth...</p>;

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  if (user.user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: { fontSize: "14px" },
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/items"
              element={
                <AdminRoute>
                  <AdminItems />
                </AdminRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/inbox"
              element={
                <PrivateRoute>
                  <Inbox />
                </PrivateRoute>
              }
            />

            {/* Items */}
            <Route
              path="/browse"
              element={
                <PrivateRoute>
                  <ItemList />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <ItemForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/items/:id"
              element={
                <PrivateRoute>
                  <ItemDetail />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/browse" replace />} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

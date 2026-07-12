import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute() {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  if (!auth.accessToken) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

import verifyJWT from '@/utils/verifyJWT';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken || !verifyJWT(accessToken)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;

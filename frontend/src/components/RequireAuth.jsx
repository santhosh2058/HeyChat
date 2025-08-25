import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth)
  const location = useLocation()
  if (loading){
    console.log("Loading authentication status...");
  }
  if (!user) {
    alert("You must be logged in to view this page");
    console.log("User not authenticated, redirecting to login.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth


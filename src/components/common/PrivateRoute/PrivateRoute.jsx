import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'store/auth.selectors';

function PrivateRoute({ children, redirectTo }) {
  const location = useLocation();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
}

export default PrivateRoute;

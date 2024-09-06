import { useFrappeAuth } from 'frappe-react-sdk';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ element }) => {

    // ? LOGIN HOOK
    const {
        currentUser,
        isValidating,
        isLoading,
        login,
        logout,
        error,
        updateCurrentUser,
        getUserCookie,
    } = useFrappeAuth();

    // ? LOCATION HOOK 
    const location = useLocation();

    return !isLoading && !isValidating && (currentUser ? element : <Navigate to="/auth/login" state={{ from: location }} />);
}

export default PrivateRoutes
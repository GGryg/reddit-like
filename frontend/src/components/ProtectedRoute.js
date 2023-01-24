import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../reducers/authSlice";

const ProtectedRoute = ({children}) => {
    const auth = useSelector(selectCurrentUser);
    
    if(!auth.isAuthenticated){
        return <Navigate to='/login' replace />
    }
    
    return children ? children : <Outlet />
};

export default ProtectedRoute;
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({auth ,children}) => {
    const { isAuthenticated } = auth;
    console.log(isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to='/login' replace />
    }
    
    return children ? children : <Outlet />
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
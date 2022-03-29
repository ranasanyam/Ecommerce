import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, Component }) => {
    
    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    /*
    return (
        <Fragment>
            {!loading && (
                <Fragment>
                    <Route 
                    {...rest}
                    render={(props) => {
                        if(!isAuthenticated) {
                            return <Navigate to="/login" replace={true} />
                        }
                        return <Component {...props} />;
                    }}
                    />
                </Fragment>
                
            )}

        </Fragment>
    );
    */
    if((loading === false) && (isAuthenticated === false)) {
        return <Navigate to="/login" />
    }
    if(isAdmin === true && user.role !== "admin") {
       return <Navigate to="/login" />
    }
    return loading === false ? <Component /> : null
   
    
};

export default ProtectedRoute;

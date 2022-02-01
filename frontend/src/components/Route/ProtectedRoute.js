import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Routes } from 'react-router-dom';

const ProtectedRoute = ({ Component }) => {
    
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
    return isAuthenticated && !loading ? <Component /> : <Navigate to="/login" replace={true} />
    
};

export default ProtectedRoute;

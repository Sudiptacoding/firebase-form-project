import React from 'react';
import { Navigate } from 'react-router-dom';

const Privaterouts = ({isSignIN , children}) => {
    if(!isSignIN){
        return <Navigate to='/login'></Navigate>
    }
    return children;
};

export default Privaterouts;
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useLoginUser from '../hooks/useLoginUser';

const ProtectedRoute = () => {

    const navigate = useNavigate();
    const {name,email} = useLoginUser();

    return (name && email) ? <Outlet/> :<Navigate to='/login' replace/> ;
}

export default ProtectedRoute;

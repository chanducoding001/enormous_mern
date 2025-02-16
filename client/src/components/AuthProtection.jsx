import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useLoginUser from '../hooks/useLoginUser';

const AuthProtection = () => {

    const navigate = useNavigate();
    const {name,email} = useLoginUser();

    return (name && email) ?<Navigate to='/' replace/> : <Outlet/> ;
}

export default AuthProtection;

import React from 'react'
import useLoginUser from '../hooks/useLoginUser';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminRoutes = (props) => {

    const {adminRole} = props;
    const {role} = useLoginUser();
    const navigate = useNavigate();

    const adminRouteClear = ()=>{
        localStorage.removeItem('loginUser');
        navigate('/login');
    }
    return adminRole === role ? <Outlet/> : adminRouteClear();
  
}

export default AdminRoutes;

import React, { useEffect, useState } from 'react'

const useLoginUser = () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const [isLogin,setIsLogin] = useState(!!loginUser);
    
    useEffect(()=>{
        setIsLogin(!!loginUser);
    },[loginUser]);
    // const isLogin = !!loginUser;
    return loginUser ? {...loginUser,isLogin} : {name:'',email:'',role:'',isLogin};
}

export default useLoginUser;
